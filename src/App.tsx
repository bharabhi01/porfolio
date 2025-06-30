import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileLayout, DesktopLayout } from './components/layouts';
import { DetailPage } from './pages/DetailPage';
import { useTime } from './hooks';
import { pageTransitionVariants } from './utils/animations';
import { trackPageView, trackNavigation } from './lib/posthog';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentTime, formattedTime, timezone } = useTime();

  // Initialize PostHog on app mount
  useEffect(() => {
    // Track initial page load
    trackPageView('home', {
      initial_load: true,
      timestamp: new Date().toISOString(),
      timezone: timezone
    });
  }, [timezone]);

  // Track page changes
  useEffect(() => {
    if (currentPage !== 'home') {
      trackPageView(currentPage, {
        page_type: 'detail_page',
        timestamp: new Date().toISOString()
      });
    }
  }, [currentPage]);

  const navigateToPage = useCallback((page: string) => {
    const previousPage = currentPage;
    setCurrentPage(page);

    // Track navigation
    trackNavigation(previousPage, page);
  }, [currentPage]);

  const navigateToHome = useCallback(() => {
    const previousPage = currentPage;
    setCurrentPage('home');

    // Track navigation back to home
    trackNavigation(previousPage, 'home');
  }, [currentPage]);

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