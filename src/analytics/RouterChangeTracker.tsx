import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

const RouteChangeTracker = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }, [location]);

    return null;
};

export default RouteChangeTracker;