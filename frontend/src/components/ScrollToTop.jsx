import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to top on route change
    window.scrollTo(0, 0);

    // Also scroll any overflow container to top (e.g., Dashboard/Admin main content)
    const mainContainers = document.querySelectorAll('main');
    mainContainers.forEach((container) => {
      container.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
