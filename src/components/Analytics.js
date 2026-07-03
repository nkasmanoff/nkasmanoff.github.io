import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const Analytics = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      ReactGA.initialize('G-Z0S3PZ9Y2X');
      initialized.current = true;
    }

    const page = location.pathname + location.search + location.hash;
    ReactGA.send({ hitType: 'pageview', page });
  }, [location]);

  return null;
};

export default Analytics;
