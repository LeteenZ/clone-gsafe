import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { QRCode } from 'antd';
import { QRPay, BanksObject } from 'vietnam-qr-pay';

export interface GenerateQRProps {
  amount: number;
}

export interface GenerateQRHandle {
  downloadQRCode: () => void;
}

const GenerateQR = forwardRef<GenerateQRHandle, GenerateQRProps>(({ amount }, ref) => {
  const [qrData, setQrData] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null); // 🔧 Dùng div wrapper

  useEffect(() => {
    if (!amount || amount <= 0) return;

    const qrPay = QRPay.initVietQR({
      bankBin: BanksObject.mbbank.bin,
      bankNumber: '0869670115',
      amount: amount.toString(),
      purpose: 'Thanh toan don hang',
    });

    const qrContent = qrPay.build();
    setQrData(qrContent);
  }, [amount]);

  useImperativeHandle(ref, () => ({
    downloadQRCode() {
      if (!wrapperRef.current) return;

      const svg = wrapperRef.current.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      img.src = url;
    },
  }));

  return qrData ? (
    <div ref={wrapperRef}>
      <QRCode value={qrData} size={256} />
    </div>
  ) : null;
});


export default GenerateQR;
