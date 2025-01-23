import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const Analytics = () => {
  useEffect(() => {
    ReactGA.initialize('G-Z0S3PZ9Y2X');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return null;
};

export default Analytics; 