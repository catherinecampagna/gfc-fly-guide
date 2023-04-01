import React from 'react';
import Landing from './components/Landing';
import Questionnaire from './components/Questionnaire';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="homepage">
      <Landing />
      <Questionnaire />
      <Footer />
    </div>
  );
};

export default Homepage;