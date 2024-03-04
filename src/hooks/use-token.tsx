import { sessionProps } from '@/components/dashboard/catalogs-container';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function useToken(value?: keyof sessionProps) {
  const [token, setToken] = useState<sessionProps>();

  useEffect(() => {
    const token = Cookies.get('session');
    if (!token) return;

    const decoded = jwtDecode<sessionProps>(token);
    setToken(decoded);
  }, []);
  if (!token) return null;
  if (value) return token[value];
  return token;
}
