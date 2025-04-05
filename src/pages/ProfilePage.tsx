
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 
  'Express', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 
  'Go', 'Rust', 'PHP', 'Laravel', 'SQL', 'MongoDB', 'PostgreSQL', 
  'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 
  'Git', 'GitHub Actions', 'Jenkins', 'Terraform', 'GraphQL', 
  'REST API', 'Microservices'
];

const ProfilePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('skills');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [userSkills, setUserSkills] = useState<Array<{ name: string; level: number; years: number }>>([
    { name: 'JavaScript', level: 4, years: 3 },
    { name: 'React', level: 3, years: 2 },
    { name: 'Node.js', level: 2, years: 1 },
    { name: 'Python', level: 3, years: 2 },
    { name: 'SQL', level: 3, years: 4 },
  ]);
  const [skillLevel, setSkillLevel] = useState<number[]>([3]);
  const [skillYears, setSkillYears] = useState('1');

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    currentRole: 'Frontend Developer',
    experience: '3',
    location: 'Pune',
    preferenceSalary: '15-20',
    preferenceType: 'both',
  });

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
    
    setUserSkills([
      ...userSkills,
      { 
        name: selectedSkill,
        level: skillLevel[0],
        years: parseInt(skillYears, 10)
      }
    ]);
    
    setSelectedSkill('');
    setSkillLevel([3]);
    setSkillYears('1');
    
    toast({
      title: "Skill added",
      description: `${selectedSkill} has been added to your skills.`,
    });
  };

  const handleRemoveSkill = (skillName: string) => {
    setUserSkills(userSkills.filter(skill => skill.name !== skillName));
    toast({
      title: "Skill removed",
      description: `${skillName} has been removed from your skills.`,
    });
  };

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleSkillLevelChange = (skillName: string, newLevel: number) => {
    setUserSkills(userSkills.map(skill => 
      skill.name === skillName ? { ...skill, level: newLevel } : skill
    ));
  };

  const filteredSkillOptions = skillOptions.filter(
    skill => !userSkills.some(userSkill => userSkill.name === skill)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isAuthenticated={true} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="space-y-4">
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
                    disabled={!selectedSkill}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Current Skills</h3>
                  
                  {userSkills.length === 0 ? (
                    <p className="text-muted-foreground">You haven't added any skills yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {userSkills.map((skill) => (
                        <div key={skill.name} className="bg-accent bg-opacity-10 p-4 rounded-md">
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
                              onClick={() => handleRemoveSkill(skill.name)}
                              className="h-8 w-8 p-0"
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
                                    onClick={() => handleSkillLevelChange(skill.name, level)}
                                    className={`h-2 flex-1 rounded-full ${
                                      level <= skill.level 
                                        ? 'bg-primary' 
                                        : 'bg-muted'
                                    }`}
                                    aria-label={`Set ${skill.name} level to ${level}`}
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
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
                <CardDescription>
                  Set your preferences to get more relevant job matches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleUpdateInfo}>
                  <div className="space-y-2">
                    <Label htmlFor="current-role">Current Role</Label>
                    <Input 
                      id="current-role"
                      value={userInfo.currentRole}
                      onChange={(e) => setUserInfo({...userInfo, currentRole: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select 
                      value={userInfo.experience} 
                      onValueChange={(value) => setUserInfo({...userInfo, experience: value})}
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select years of experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-7">5-7 years</SelectItem>
                        <SelectItem value="7+">7+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input 
                      id="location" 
                      value={userInfo.location}
                      onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salary">Expected Salary Range (LPA)</Label>
                    <Select 
                      value={userInfo.preferenceSalary} 
                      onValueChange={(value) => setUserInfo({...userInfo, preferenceSalary: value})}
                    >
                      <SelectTrigger id="salary">
                        <SelectValue placeholder="Select salary range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5-10">5-10 LPA</SelectItem>
                        <SelectItem value="10-15">10-15 LPA</SelectItem>
                        <SelectItem value="15-20">15-20 LPA</SelectItem>
                        <SelectItem value="20-30">20-30 LPA</SelectItem>
                        <SelectItem value="30+">30+ LPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preferred Company Type</Label>
                    <RadioGroup 
                      value={userInfo.preferenceType}
                      onValueChange={(value) => setUserInfo({...userInfo, preferenceType: value})}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mnc" id="mnc" />
                        <Label htmlFor="mnc">Multinational Corporations (MNCs)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="startup" id="startup" />
                        <Label htmlFor="startup">Startups</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button type="submit" className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your account details and password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleUpdateInfo}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    Update Account
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Manage your account deletion and data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
