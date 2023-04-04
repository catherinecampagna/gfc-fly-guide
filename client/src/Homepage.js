import React, { useState } from 'react';
import Landing from './components/Landing';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  return (
    <div className="homepage">
      <Landing onLogin={handleLogin} />
      {loggedIn && <Questionnaire />}
      {loggedIn && <Footer />}
    </div>
  );
};

export default Homepage;