import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '../lib/analytics/ga';

export default function useGAPageview() {
  const location = useLocation();
  useEffect(() => {
    pageview({ path: location.pathname + location.search });
  }, [location]);
}
