
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useUserSkills, useAddSkill, useRemoveSkill, useUpdateSkill } from '@/hooks/use-profile-data';

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 
  'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 
  'Go', 'Rust', 'PHP', 'Laravel', 'SQL', 'MongoDB', 'PostgreSQL', 
  'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 
  'Git', 'GitHub Actions', 'Jenkins', 'Terraform', 'GraphQL', 
  'REST API', 'Microservices'
];

const SkillsTab: React.FC = () => {
  const { toast } = useToast();
  const { data: userSkills = [], isLoading: isLoadingSkills } = useUserSkills();
  const addSkill = useAddSkill();
  const removeSkill = useRemoveSkill();
  const updateSkill = useUpdateSkill();

  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState<number[]>([3]);
  const [skillYears, setSkillYears] = useState('1');

  const handleAddSkill = () => {
    if (!selectedSkill) return;
    
    if (userSkills.some(skill => skill.name === selectedSkill)) {
      toast({
        title: "Skill already added",
        description: "You've already added this skill to your profile.",
        variant: "destructive",
      });
      return;
    }
    
    addSkill.mutate({
      name: selectedSkill,
      level: skillLevel[0],
      years: parseFloat(skillYears)
    }, {
      onSuccess: () => {
        setSelectedSkill('');
        setSkillLevel([3]);
        setSkillYears('1');
        
        toast({
          title: "Skill added",
          description: `${selectedSkill} has been added to your skills.`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error adding skill",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleRemoveSkill = (skillId: string, skillName: string) => {
    removeSkill.mutate(skillId, {
      onSuccess: () => {
        toast({
          title: "Skill removed",
          description: `${skillName} has been removed from your skills.`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error removing skill",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleSkillLevelChange = (skillId: string, newLevel: number) => {
    updateSkill.mutate({ id: skillId, level: newLevel });
  };

  const filteredSkillOptions = skillOptions.filter(
    skill => !userSkills.some(userSkill => userSkill.name === skill)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Skills</CardTitle>
        <CardDescription>
          Manage your skills and expertise to get better job matches and roadmaps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="skill-select" className="mb-2 block">Add a New Skill</Label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSkillOptions.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="mb-2 block">Proficiency Level (1-5)</Label>
              <div className="pt-4">
                <Slider
                  value={skillLevel}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={setSkillLevel}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
                <div className="text-center mt-2 font-medium">
                  Level: {skillLevel[0]}
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="years-experience" className="mb-2 block">Years of Experience</Label>
              <Select value={skillYears} onValueChange={setSkillYears}>
                <SelectTrigger>
                  <SelectValue placeholder="Select years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">6 months</SelectItem>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="4">4 years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAddSkill} 
            className="w-full sm:w-auto"
            disabled={!selectedSkill || addSkill.isPending}
          >
            <Plus className="mr-2 h-4 w-4" />
            {addSkill.isPending ? 'Adding...' : 'Add Skill'}
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Your Current Skills</h3>
          
          {isLoadingSkills ? (
            <p className="text-muted-foreground">Loading skills...</p>
          ) : userSkills.length === 0 ? (
            <p className="text-muted-foreground">You haven't added any skills yet.</p>
          ) : (
            <div className="space-y-4">
              {userSkills.map((skill) => (
                <div key={skill.id} className="bg-accent bg-opacity-10 p-4 rounded-md">
                  <div className="flex flex-wrap justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge className="ml-2 bg-primary/20 text-primary">
                        {skill.years} {skill.years === 1 ? 'year' : 'years'}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(skill.id, skill.name)}
                      className="h-8 w-8 p-0"
                      disabled={removeSkill.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove {skill.name}</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex-grow">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => handleSkillLevelChange(skill.id, level)}
                            className={`h-2 flex-1 rounded-full ${
                              level <= skill.level 
                                ? 'bg-primary' 
                                : 'bg-muted'
                            }`}
                            aria-label={`Set ${skill.name} level to ${level}`}
                            disabled={updateSkill.isPending}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Beginner</span>
                        <span>Expert</span>
                      </div>
                    </div>
                    <div className="font-medium">
                      Level {skill.level}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsTab;
