
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Role } from '@/components/RoleCard';
import { ArrowLeft, Calendar, Building, MapPin, Coins, Clock, CheckCircle, BookOpen } from 'lucide-react';

// Mock data to simulate fetching role by ID
const mockRoles: Record<string, Role & { description?: string }> = {
  '1': {
    id: '1',
    company: 'ZS Associates',
    title: 'Backend Developer',
    type: 'MNC',
    location: 'Pune',
    salary: '15-20 LPA',
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'SQL'],
    matchPercentage: 75,
    isLive: true,
    description: 'ZS Associates is seeking an experienced Backend Developer to design and build robust, scalable backend systems for our healthcare analytics platform. You will be working with a team of talented engineers to create high-performance APIs and services.'
  },
  '2': {
    id: '2',
    company: 'CodeNation',
    title: 'Frontend Engineer',
    type: 'Startup',
    location: 'Pune',
    salary: '12-18 LPA',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    matchPercentage: 85,
    description: 'CodeNation is looking for a Frontend Engineer to join our rapidly growing team. You will be responsible for building the user interface for our flagship product, working closely with designers and backend engineers.'
  }
};

// Mock user skills data
const mockUserSkills = {
  'JavaScript': 4,
  'React': 3,
  'Node.js': 2,
  'Python': 3,
  'SQL': 3,
  'Java': 1,
};

// Mock roadmap data (this would come from Gemini API in production)
const mockRoadmap = {
  '1': [
    {
      phase: 'Strengthen Java Fundamentals',
      duration: '2 weeks',
      items: [
        'Review Java 8+ features (streams, lambdas)',
        'Practice data structures implementation in Java',
        'Learn Java concurrency patterns'
      ]
    },
    {
      phase: 'Master Spring Boot',
      duration: '3 weeks',
      items: [
        'Build RESTful APIs with Spring Boot',
        'Implement authentication and authorization',
        'Spring Data JPA and database interactions'
      ]
    },
    {
      phase: 'AWS Services Deep Dive',
      duration: '2 weeks',
      items: [
        'EC2 and container services',
        'S3 and storage solutions',
        'CloudWatch and monitoring'
      ]
    },
    {
      phase: 'Microservices Architecture',
      duration: '3 weeks',
      items: [
        'Design patterns for microservices',
        'Service discovery and API gateway',
        'Messaging and event-driven architecture'
      ]
    }
  ],
  '2': [
    {
      phase: 'Advanced TypeScript',
      duration: '2 weeks',
      items: [
        'TypeScript generics and utility types',
        'Advanced type inference and conditional types',
        'Performance optimization patterns'
      ]
    },
    {
      phase: 'Next.js Mastery',
      duration: '3 weeks',
      items: [
        'Server components and server actions',
        'Static and dynamic rendering strategies',
        'API routes and middleware'
      ]
    },
    {
      phase: 'GraphQL Implementation',
      duration: '2 weeks',
      items: [
        'GraphQL schema design',
        'Apollo Client state management',
        'Performance optimization techniques'
      ]
    }
  ]
};

const RoleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [role, setRole] = useState<(Role & { description?: string }) | null>(null);
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      if (id && mockRoles[id]) {
        setRole(mockRoles[id]);
        setRoadmap(mockRoadmap[id] || []);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar isAuthenticated={true} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-muted rounded mb-4"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar isAuthenticated={true} />
        <div className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Role Not Found</h1>
          <p className="text-muted-foreground mb-8">The role you're looking for doesn't exist or has been removed.</p>
          <Link to="/roles">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roles
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isAuthenticated={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/roles" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all roles
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Role details */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full mb-4 ${role.matchPercentage && role.matchPercentage >= 80 ? 'bg-green-500 text-white' : role.matchPercentage && role.matchPercentage >= 50 ? 'bg-amber-500 text-white' : 'bg-red-400 text-white'}`}>
                  <span className="font-semibold">{role.matchPercentage}% Match</span>
                </div>
                
                <h1 className="text-2xl font-bold mb-1">{role.title}</h1>
                <h2 className="text-xl font-medium text-muted-foreground mb-4">{role.company}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{role.type}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{role.salary}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill, index) => {
                      const userSkillLevel = mockUserSkills[skill as keyof typeof mockUserSkills];
                      return (
                        <Badge 
                          key={index}
                          variant={userSkillLevel ? "default" : "outline"}
                          className={userSkillLevel ? "bg-primary/20 text-primary border-primary/30" : ""}
                        >
                          {skill} {userSkillLevel ? `(${userSkillLevel}/5)` : ''}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                {role.description && (
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <Button className="w-full mb-2">Apply Now</Button>
                  <Button variant="outline" className="w-full">Save Role</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column: Personalized Roadmap */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Personalized Roadmap</h2>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
              
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Based on your current skills, here's a personalized learning path to help you land this role.
                </p>
              </div>
              
              <div className="space-y-6">
                {roadmap.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center mb-2">
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{phase.phase}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connect phases with a vertical line */}
                    {index < roadmap.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 bg-border h-12 -ml-0.5"></div>
                    )}
                    
                    <div className="ml-11 mb-6">
                      <Card className="bg-accent bg-opacity-30 border-none">
                        <CardContent className="p-4">
                          <ul className="space-y-2">
                            {phase.items.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 mr-2 text-primary mt-0.5" />
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Additional resources available</span>
                </div>
                <Button variant="outline" size="sm">
                  Export PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoleDetailPage;
