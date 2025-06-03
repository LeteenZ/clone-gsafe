import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GenerateQR from './CreateQR';
import type { GenerateQRHandle } from './CreateQR';
import logoGtel from '../../../public/assets/logo-gtel.png';
import logoNapas from '../../../public/assets/logo-napas.png';

const CountdownTimer: React.FC<{total: number, ok: boolean}> = ({total, ok}) => {
    const navigate = useNavigate();
    const { t } = useTranslation('purchase');
    const [complete, setComplete] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const [open, setOpen] = useState(ok);
    const qrRef = useRef<GenerateQRHandle>(null);

    useEffect(() => {
        if (timeLeft <= 0) {
            setOpen(false);
            setComplete(true);
        }
        if(complete) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }

        const timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, complete, navigate]);

    const formatTime = (seconds: number): React.ReactNode => {
        const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return (
            <div className='flex justify-center gap-2 font-semibold'>
                <div>{m} <span>m</span></div>
                <div>{s} <span>s</span></div>
            </div>
        );
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        qrRef.current?.downloadQRCode();
    }

    return (
        <>
            <button 
                className={`
                    h-12 flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 border-2 bg-[#0266ad] border-[#0266ad] hover:bg-white hover:text-[#0266ad] hover:border-[#0266ad] text-white cursor-pointer
                    ${complete ? 'hidden' : ''}
                `}
                onClick={showModal}
            >
                {t("controls.cn8")}
                {timeLeft > 0 ? formatTime(timeLeft) : ''}
            </button>
            <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                footer={[
                    <div key="footer-buttons" className='mt-3 flex justify-around'>
                        <button 
                            key="save-button"
                            className='h-12 border flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 bg-[#0267ab] border-[#0267ab] hover:bg-white hover:text-[#0267ab] text-white cursor-pointer mx-auto'
                            onClick={handleOk}
                        >
                            <span className='font-semibold text-lg'>{t("controls.cn9")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                                <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
                            </svg>
                        </button>

                        <button 
                            key="cancel-button"
                            className='h-12 border flex w-fit min-w-28 items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-6 border-base-200 bg-white text-slate-600 hover:text-white hover:bg-[#0267ab] cursor-pointer mx-auto'
                            onClick={handleCancel}
                        >
                            <span className='font-semibold text-lg'>{t("controls.cn10")}</span>
                        </button>
                    </div>
                ]}
            >
                <div className='text-center'>
                    <div className='flex justify-around'>
                        <img 
                            src={logoGtel} 
                            alt="logo" 
                            className='w-24 object-contain'
                            loading="lazy"
                            decoding="async"
                            width={100}
                            height={50}
                        />

                        <img 
                            src={logoNapas} 
                            alt="logo" 
                            className='w-24 object-contain'
                            loading="lazy"
                            decoding="async"
                            width={100}
                            height={50}
                        />
                    </div>
                    <p className='my-2 text-xl font-semibold'>
                        {t("form.form5.transfer.tittle")}
                    </p>
                    <p className='my-2'> 
                        {t("form.form5.transfer.tittle1")}
                    </p>
                    <div className='my-3 flex justify-center'>
                        <GenerateQR ref={qrRef} amount={total} />
                    </div>
                    <p className='my-3 text-lg font-semibold text-green-500'>
                        {total.toLocaleString('vi-VN')}
                        &nbsp;{t("form.form5.panel1.des31")}
                    </p>
                    {formatTime(timeLeft)}
                </div>
            </Modal>
        </>
    );
};

export default CountdownTimer;
