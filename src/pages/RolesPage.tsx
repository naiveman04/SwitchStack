import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RoleCard, { Role } from '@/components/RoleCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data
const mockRoles: Role[] = [
  {
    id: '1',
    company: 'ZS Associates',
    title: 'Backend Developer',
    type: 'MNC',
    location: 'Pune',
    salary: '15-20 LPA',
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'SQL'],
    matchPercentage: 75,
    isLive: true
  },
  {
    id: '2',
    company: 'CodeNation',
    title: 'Frontend Engineer',
    type: 'Startup',
    location: 'Pune',
    salary: '12-18 LPA',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL'],
    matchPercentage: 85,
  },
  {
    id: '3',
    company: 'Infosys',
    title: 'DevOps Engineer',
    type: 'MNC',
    location: 'Pune',
    salary: '18-25 LPA',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Git'],
    matchPercentage: 60,
    isLive: true
  },
  {
    id: '4',
    company: 'TechVista',
    title: 'Full Stack Developer',
    type: 'Startup',
    location: 'Pune',
    salary: '14-22 LPA',
    skills: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express'],
    matchPercentage: 92,
  },
  {
    id: '5',
    company: 'Persistent Systems',
    title: 'Data Engineer',
    type: 'MNC',
    location: 'Pune',
    salary: '16-24 LPA',
    skills: ['Python', 'Spark', 'Hadoop', 'SQL', 'ETL', 'Data Modeling'],
    matchPercentage: 65,
    isLive: true
  },
  {
    id: '6',
    company: 'CloudNative',
    title: 'Cloud Architect',
    type: 'Startup',
    location: 'Pune',
    salary: '25-35 LPA',
    skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Microservices', 'Docker'],
    matchPercentage: 70,
  },
];

const RolesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleType, setRoleType] = useState('all');
  const [salaryRange, setSalaryRange] = useState([10, 40]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('match');

  const filteredRoles = mockRoles
    .filter(role => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          role.title.toLowerCase().includes(query) ||
          role.company.toLowerCase().includes(query) ||
          role.skills.some(skill => skill.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(role => {
      // Role type filter
      if (roleType !== 'all') {
        return role.type.toLowerCase() === roleType.toLowerCase();
      }
      return true;
    })
    .filter(role => {
      // Salary filter (simplified for demo purposes)
      const minSalary = parseInt(role.salary.split('-')[0]);
      const maxSalary = parseInt(role.salary.split('-')[1]);
      const avgSalary = (minSalary + maxSalary) / 2;
      
      return avgSalary >= salaryRange[0] && avgSalary <= salaryRange[1];
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === 'match') {
        return (b.matchPercentage || 0) - (a.matchPercentage || 0);
      } else if (sortBy === 'salary') {
        const avgSalaryA = (parseInt(a.salary.split('-')[0]) + parseInt(a.salary.split('-')[1])) / 2;
        const avgSalaryB = (parseInt(b.salary.split('-')[0]) + parseInt(b.salary.split('-')[1])) / 2;
        return avgSalaryB - avgSalaryA;
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tech Roles in Pune</h1>
          <p className="text-muted-foreground">
            Find your next career opportunity with personalized matches and skill roadmaps.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search roles, companies, or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-accent bg-opacity-20" : ""}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Filters</span>
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 bg-card p-4 rounded-md border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Company Type</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={roleType === 'all' ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setRoleType('all')}
                    >
                      All
                    </Badge>
                    <Badge 
                      variant={roleType === 'MNC' ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setRoleType('MNC')}
                    >
                      MNC
                    </Badge>
                    <Badge 
                      variant={roleType === 'Startup' ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setRoleType('Startup')}
                    >
                      Startup
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Salary Range (LPA)</h3>
                    <span className="text-sm text-muted-foreground">
                      {salaryRange[0]} - {salaryRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={salaryRange}
                    min={5}
                    max={50}
                    step={1}
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Last Updated: <span className="font-medium">15 mins ago</span> • Showing {filteredRoles.length} roles
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map(role => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RolesPage;
