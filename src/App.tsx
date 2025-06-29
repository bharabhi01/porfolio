import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileLayout, DesktopLayout } from './components/layouts';
import { DetailPage } from './pages/DetailPage';
import { useTime } from './hooks';
import { pageTransitionVariants } from './utils/animations';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentTime, formattedTime, timezone } = useTime();

  const navigateToPage = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 p-4 md:p-6 lg:p-8 flex items-center justify-center"
      initial="initial"
      animate="animate"
      variants={pageTransitionVariants}
    >
      <div className="max-w-6xl w-full">
        <AnimatePresence mode="wait">
          {currentPage !== 'home' ? (
            <motion.div
              key="detail-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <DetailPage currentPage={currentPage} navigateToHome={navigateToHome} />
            </motion.div>
          ) : (
            <motion.div
              key="home-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransitionVariants}
            >
              <MobileLayout
                currentTime={currentTime}
                formattedTime={formattedTime}
                timezone={timezone}
                navigateToPage={navigateToPage}
              />

              <DesktopLayout
                currentTime={currentTime}
                formattedTime={formattedTime}
                timezone={timezone}
                navigateToPage={navigateToPage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default App;