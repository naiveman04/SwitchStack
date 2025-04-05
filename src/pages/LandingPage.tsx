
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BarChart3, Target } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Check if user is logged in (in a real app, this would use your auth system)
  useEffect(() => {
    // For demo purposes, we'll use localStorage
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(scrollY / (heroHeight * 0.8), 1);
      setScrollProgress(progress);
      
      setScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    setIsLoading(true);
    
    // Simulate a short loading period for demo purposes
    setTimeout(() => {
      if (isLoggedIn) {
        navigate('/roles');
      } else {
        navigate('/login');
      }
      setIsLoading(false);
    }, 500);
  };

  // Calculate styles based on scroll progress
  const heroTextStyles = {
    transform: `scale(${1 - scrollProgress * 0.5})`,
    opacity: 1 - scrollProgress * 1.5,
  };

  const previewImageStyles = {
    transform: `translateY(${-scrollProgress * 40}%)`,
    zIndex: scrollProgress > 0.3 ? 10 : 1,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 relative" ref={heroRef}>
        <div className="container mx-auto text-center relative z-10">
          <div style={heroTextStyles} className="transition-all duration-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Switch Roles Smarter with SwitchStack
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
              Input your skills, find roles in Pune, and get a tailored learning roadmap to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 relative"
                onClick={handleGetStarted}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                ) : null}
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Preview Image of Roles Page */}
          <div 
            className="max-w-4xl mx-auto mt-6 transition-all duration-300 relative"
            style={previewImageStyles}
          >
            <div className="section-container shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1280&q=80" 
                alt="SwitchStack Roles Page Preview" 
                className="w-full h-auto" 
              />
              <div className="absolute top-4 left-4 bg-card/90 px-3 py-1.5 border border-border text-sm font-medium backdrop-blur-sm">
                Preview: Roles Page
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Removed rounded-lg from section-container class */}
      <section className="py-16 bg-accent bg-opacity-10 section-container mx-4 md:mx-8 lg:mx-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Match</h3>
              <p className="text-muted-foreground">
                Browse job roles in Pune and see which ones match your current skill set.
              </p>
            </div>
            
            <div className="bg-card p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Roadmap</h3>
              <p className="text-muted-foreground">
                Receive a personalized learning path to bridge the gap between your skills and job requirements.
              </p>
            </div>
            
            <div className="bg-card p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-muted-foreground">
                Follow your learning journey and watch as your match percentage increases.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-card border border-border p-8 md:p-12 max-w-4xl mx-auto shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Switch?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join SwitchStack today and start your journey to your dream tech role in Pune.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={handleGetStarted}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
              ) : null}
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
