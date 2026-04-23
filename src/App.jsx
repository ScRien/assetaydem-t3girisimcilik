import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Technical from './pages/Technical';

// Ambient background blobs
function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top-left primary glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px', height: '600px',
          top: '-200px', left: '-200px',
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Bottom-right secondary glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: '700px', height: '700px',
          bottom: '-250px', right: '-250px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Center accent */}
      <div
        className="absolute rounded-full"
        style={{
          width: '400px', height: '400px',
          top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 hero-grid-bg opacity-60" />
    </div>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <AmbientBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/technical" element={<Technical />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}