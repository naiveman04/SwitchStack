
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BarChart3, Target } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Switch Roles Smarter with SwitchStack
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Input your skills, find roles in Pune, and get a tailored learning roadmap to land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/roles">
              <Button size="lg" className="text-lg px-8">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-accent bg-opacity-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Your Match</h3>
              <p className="text-muted-foreground">
                Browse job roles in Pune and see which ones match your current skill set.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Roadmap</h3>
              <p className="text-muted-foreground">
                Receive a personalized learning path to bridge the gap between your skills and job requirements.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
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
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Switch?</h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join SwitchStack today and start your journey to your dream tech role in Pune.
            </p>
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
