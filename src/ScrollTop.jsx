// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   const location = useLocation();
//   useEffect(() => {
//     if (!location.hash) {
//       window.scrollTo(0, 0);
//     }
//   }, [location]);


//   return null;
// };

// export default ScrollToTop;


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;