import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignupPage from './pages/LoginSignupPage';
import CategoryPage from './pages/CategoryPage';
import Footer from './components/Footer';
import WelcomeBanner from './components/WelcomeBanner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HeroPage';

const App = () => {
  const location = useLocation();

  // Check if current path is the login page
  const isLoginPage = location.pathname === '/auth';

  return (
    <>
      {/* Only show Navbar if NOT on login page */}
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginSignupPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
      </Routes>

      {/* Only show Footer, WelcomeBanner, ScrollToTop if NOT on login page */}
      {!isLoginPage && (
        <>
          <Footer />
          <WelcomeBanner />
          <ScrollToTop />
        </>
      )}
    </>
  );
};

export default App;