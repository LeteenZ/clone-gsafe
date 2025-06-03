import { useEffect, useState } from 'react';

export interface Ward {
  code: string;
  name: string;
}

export interface District {
  code: string;
  name: string;
  wards?: Ward[];
}

export interface Province {
  code: string;
  name: string;
  districts?: District[];
}

export const useVietnamLocation = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://provinces.open-api.vn/api/?depth=3');
        const data = await res.json();
        setProvinces(data);
      } catch (error) {
        setError('Lỗi khi tải dữ liệu địa lý ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  return { provinces, loading, error };
};
