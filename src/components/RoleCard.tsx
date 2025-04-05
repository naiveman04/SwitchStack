
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export interface Role {
  id: string;
  company: string;
  title: string;
  type: string; // MNC, Startup, etc.
  location: string;
  salary: string;
  skills: string[];
  matchPercentage?: number;
  isLive?: boolean;
}

interface RoleCardProps {
  role: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  const { id, company, title, type, location, salary, skills, matchPercentage, isLive } = role;

  const getMatchBadgeColor = () => {
    if (!matchPercentage) return "bg-secondary";
    if (matchPercentage >= 80) return "bg-green-500 text-white";
    if (matchPercentage >= 50) return "bg-amber-500 text-white";
    return "bg-red-400 text-white";
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
      <CardHeader className="pb-2 relative">
        {isLive && (
          <div className="absolute top-2 left-2">
            <Badge 
              variant="outline"
              className="bg-green-500/10 text-green-400 border border-green-500/30 flex items-center gap-1 animate-pulse-glow"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              LIVE
            </Badge>
          </div>
        )}
        
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          {matchPercentage && (
            <div className={`text-xs font-semibold px-2 py-1 rounded ${getMatchBadgeColor()}`}>
              {matchPercentage}% Match
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary">{type}</Badge>
          <Badge variant="outline">{location}</Badge>
          <Badge variant="outline" className="text-primary border-primary/30">
            {salary}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow pt-2 pb-4">
        <div className="flex flex-wrap gap-1 mt-1">
          {skills.slice(0, 5).map((skill, index) => (
            <span 
              key={index}
              className="role-tag bg-accent text-accent-foreground text-xs"
            >
              {skill}
            </span>
          ))}
          {skills.length > 5 && (
            <span className="role-tag bg-secondary text-secondary-foreground">
              +{skills.length - 5}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Link to={`/role/${id}`} className="w-full">
          <Button variant="default" className="w-full">
            Explore Role
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoleCard;
