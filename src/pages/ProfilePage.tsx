
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScrollFade } from '@/hooks/use-scroll-fade';
import { useAuth } from '@/contexts/AuthContext';
import SkillsTab from '@/components/ProfileTabs/SkillsTab';
import PreferencesTab from '@/components/ProfileTabs/PreferencesTab';
import AccountTab from '@/components/ProfileTabs/AccountTab';
import HeroSection from '@/components/HeroSection';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('skills');
  const heroRef = useRef<HTMLDivElement>(null);
  const opacity = useScrollFade(heroRef, { startFade: 0.5, endFade: 1 });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If still loading or redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection 
          title="Your Profile"
          subtitle="Manage your skills and preferences"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mt-8">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
          </Tabs>
        </HeroSection>

        <div className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsContent value="skills">
              <SkillsTab />
            </TabsContent>
            
            <TabsContent value="preferences">
              <PreferencesTab />
            </TabsContent>
            
            <TabsContent value="account">
              <AccountTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
