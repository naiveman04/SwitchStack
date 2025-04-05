
import React from 'react';
import { Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const Index = () => {
  // This is a simple redirect to the landing page
  // In a real app, we might check for authentication here 
  // and redirect accordingly
  return <LandingPage />;
};

export default Index;
