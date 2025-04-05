
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Code, FileText, Star, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About SwitchStack
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                Helping tech professionals in Pune find their perfect career path
              </p>
              <Badge variant="outline" className="text-primary border-primary mb-8">
                Made in Pune, for Pune
              </Badge>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-accent bg-opacity-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-center mb-8">
                SwitchStack is on a mission to empower tech professionals in Pune to navigate career transitions with confidence. We believe that the right roadmap and guidance can transform career switching from a daunting challenge into an exciting opportunity for growth.
              </p>
              
              <Card className="mb-8">
                <CardContent className="p-6">
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "The tech landscape changes rapidly. SwitchStack helps professionals evolve with it, making career transitions smoother and more strategic."
                  </blockquote>
                  <p className="text-right mt-4 font-medium">— SwitchStack Founder</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How SwitchStack Works</h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-primary/10 rounded-full p-4 flex items-center justify-center h-16 w-16 flex-shrink-0 md:mt-0">
                    <FileText className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1. Create Your Skill Profile</h3>
                    <p className="text-muted-foreground">
                      Complete a brief questionnaire about your skills, experience levels, and career goals. This helps us understand your current tech profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-primary/10 rounded-full p-4 flex items-center justify-center h-16 w-16 flex-shrink-0 md:mt-0">
                    <Code className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2. Browse Matched Roles</h3>
                    <p className="text-muted-foreground">
                      Our algorithm matches your profile with in-demand tech roles in Pune, showing you opportunities that align with your current skills and growth potential.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-primary/10 rounded-full p-4 flex items-center justify-center h-16 w-16 flex-shrink-0 md:mt-0">
                    <Star className="text-primary h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3. Get Personalized Roadmaps</h3>
                    <p className="text-muted-foreground">
                      For any role you're interested in, our AI generates a customized learning roadmap to bridge the gap between your current skills and the role requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials (placeholder) */}
        <section className="py-16 bg-accent bg-opacity-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Tech Professional {i}</h3>
                        <p className="text-sm text-muted-foreground">Switched from Frontend to DevOps</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">
                      "SwitchStack gave me a clear roadmap to transition from Frontend Development to DevOps. The personalized skill-building plan helped me land a new role in just 3 months."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Badge variant="outline">More stories coming soon!</Badge>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "Is SwitchStack only for Pune-based professionals?",
                  a: "Yes, currently we're focused on the Pune tech market to provide the most accurate and relevant job matches and roadmaps. We plan to expand to other cities soon."
                },
                {
                  q: "How accurate are the skill match percentages?",
                  a: "Our matching algorithm analyzes your skills against real job requirements from current openings in Pune. The percentages represent how closely your current skillset matches what employers are looking for."
                },
                {
                  q: "Do I need to pay to use SwitchStack?",
                  a: "No, SwitchStack is currently free to use. We may introduce premium features in the future, but our core matching and roadmap services will remain accessible to all."
                },
                {
                  q: "How are the roadmaps created?",
                  a: "We use AI to analyze the gap between your current skills and the requirements of your target role. The roadmap is tailored to your specific situation, providing an efficient learning path."
                }
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                  {index < 3 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Switch Roles?</h2>
              <p className="text-xl mb-8 text-muted-foreground">
                Join SwitchStack today and take the first step toward your next tech role in Pune.
              </p>
              <Link to="/roles">
                <Button size="lg" className="text-lg px-8">
                  Explore Roles <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
