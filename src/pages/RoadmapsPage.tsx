
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';

// Sample roadmap data (in production, this would come from the Gemini API)
const sampleRoadmaps = {
  frontend: {
    title: "Frontend Engineer Roadmap",
    description: "A comprehensive path to becoming a skilled frontend developer",
    steps: [
      {
        phase: "Fundamentals",
        timeframe: "2-3 months",
        skills: ["HTML5", "CSS3", "JavaScript ES6+"],
        resources: [
          {name: "MDN Web Docs", url: "https://developer.mozilla.org/"},
          {name: "freeCodeCamp", url: "https://www.freecodecamp.org/"}
        ]
      },
      {
        phase: "Framework Mastery",
        timeframe: "3-4 months",
        skills: ["React.js", "State Management", "Styled Components"],
        resources: [
          {name: "React Documentation", url: "https://reactjs.org/"},
          {name: "React for Beginners", url: "https://reactforbeginners.com/"}
        ]
      },
      {
        phase: "Advanced Concepts",
        timeframe: "2-3 months",
        skills: ["TypeScript", "Testing (Jest, RTL)", "Performance Optimization"],
        resources: [
          {name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/"},
          {name: "Testing Library", url: "https://testing-library.com/"}
        ]
      }
    ]
  },
  backend: {
    title: "Backend Engineer Roadmap",
    description: "A structured path to becoming a backend developer",
    steps: [
      {
        phase: "Programming Fundamentals",
        timeframe: "2-3 months",
        skills: ["Node.js", "Express", "RESTful API Design"],
        resources: [
          {name: "Node.js Documentation", url: "https://nodejs.org/en/docs/"},
          {name: "Express Guide", url: "https://expressjs.com/en/guide/routing.html"}
        ]
      },
      {
        phase: "Database Systems",
        timeframe: "2-3 months",
        skills: ["SQL", "NoSQL (MongoDB)", "ORM/ODM Tools"],
        resources: [
          {name: "SQL Tutorial", url: "https://www.sqlitetutorial.net/"},
          {name: "MongoDB University", url: "https://university.mongodb.com/"}
        ]
      },
      {
        phase: "Advanced Backend",
        timeframe: "3-4 months",
        skills: ["Authentication", "Caching", "Microservices"],
        resources: [
          {name: "JWT.io", url: "https://jwt.io/"},
          {name: "Microservices.io", url: "https://microservices.io/"}
        ]
      }
    ]
  },
  devops: {
    title: "DevOps Engineer Roadmap",
    description: "Learn to bridge development and operations",
    steps: [
      {
        phase: "Cloud Platforms",
        timeframe: "2-3 months",
        skills: ["AWS/Azure/GCP Basics", "Virtual Machines", "Serverless"],
        resources: [
          {name: "AWS Training", url: "https://aws.amazon.com/training/"},
          {name: "Google Cloud Skills", url: "https://cloud.google.com/training"}
        ]
      },
      {
        phase: "Containerization",
        timeframe: "1-2 months",
        skills: ["Docker", "Kubernetes", "Container Orchestration"],
        resources: [
          {name: "Docker Docs", url: "https://docs.docker.com/"},
          {name: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/"}
        ]
      },
      {
        phase: "CI/CD & IaC",
        timeframe: "2-3 months",
        skills: ["Jenkins/GitHub Actions", "Terraform", "Monitoring"],
        resources: [
          {name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions"},
          {name: "Terraform Tutorials", url: "https://learn.hashicorp.com/terraform"}
        ]
      }
    ]
  }
};

type RoleKey = keyof typeof sampleRoadmaps;

const RoleCard = ({ 
  roleKey, 
  title, 
  description, 
  expanded, 
  onToggle 
}: { 
  roleKey: RoleKey, 
  title: string, 
  description: string, 
  expanded: boolean, 
  onToggle: () => void 
}) => {
  return (
    <Card className="mb-6 overflow-hidden transition-all duration-300">
      <CardHeader className="cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </div>
      </CardHeader>
      <CollapsibleContent open={expanded}>
        <CardContent className="pt-4">
          {sampleRoadmaps[roleKey].steps.map((step, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="text-xl font-semibold mb-2">{step.phase} <span className="text-sm font-normal text-muted-foreground">({step.timeframe})</span></h3>
              <div className="mb-3">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Skills to Learn:</h4>
                <div className="flex flex-wrap gap-2">
                  {step.skills.map((skill, i) => (
                    <span key={i} className="bg-accent/30 text-accent-foreground px-2 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Recommended Resources:</h4>
                <ul className="list-disc list-inside text-sm">
                  {step.resources.map((resource, i) => (
                    <li key={i} className="mb-1">
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        {resource.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </CollapsibleContent>
    </Card>
  );
};

const RoadmapsPage = () => {
  const [expandedRole, setExpandedRole] = useState<RoleKey | null>(null);
  const { user } = useAuth();

  const handleToggle = (roleKey: RoleKey) => {
    setExpandedRole(expandedRole === roleKey ? null : roleKey);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isAuthenticated={!!user} />
      
      <main className="flex-grow">
        <HeroSection
          title="Tech Role Roadmaps"
          subtitle="Explore career paths and learning journeys for various tech roles"
          fadeOptions={{ startFade: 0.1, endFade: 0.5 }}
        >
          <p className="max-w-2xl mx-auto mb-6 text-muted-foreground">
            Select a role below to reveal a detailed learning roadmap that can help guide your career transition
          </p>
        </HeroSection>

        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Roadmaps</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {Object.entries(sampleRoadmaps).map(([key, roadmap]) => (
                <RoleCard
                  key={key}
                  roleKey={key as RoleKey}
                  title={roadmap.title}
                  description={roadmap.description}
                  expanded={expandedRole === key}
                  onToggle={() => handleToggle(key as RoleKey)}
                />
              ))}
            </div>

            <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Roadmap?</h3>
              <p className="mb-6 text-muted-foreground">
                Get a personalized learning path based on your current skills and target role
              </p>
              <Link to="/roles">
                <Button size="lg" className="text-lg px-8">
                  Find Matching Roles <ArrowRight className="ml-2 h-5 w-5" />
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

export default RoadmapsPage;
