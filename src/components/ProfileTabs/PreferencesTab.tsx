
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useUserProfile, useUpdateProfile } from '@/hooks/use-profile-data';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const preferencesSchema = z.object({
  user_role: z.string().min(1, "Current role is required"),
  experience: z.string().min(1, "Years of experience is required"),
  location: z.string().min(1, "Location is required"),
  preference_salary: z.string().min(1, "Salary range is required"),
  preference_type: z.string().min(1, "Company type preference is required"),
});

type PreferencesFormValues = z.infer<typeof preferencesSchema>;

const PreferencesTab: React.FC = () => {
  const { toast } = useToast();
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      user_role: profile?.user_role || '',
      experience: profile?.experience || '',
      location: profile?.location || 'Pune',
      preference_salary: profile?.preference_salary || '',
      preference_type: profile?.preference_type || 'both',
    },
  });

  // Update form values when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      form.reset({
        user_role: profile.user_role || '',
        experience: profile.experience || '',
        location: profile.location || 'Pune',
        preference_salary: profile.preference_salary || '',
        preference_type: profile.preference_type || 'both',
      });
    }
  }, [profile, form]);

  const onSubmit = (data: PreferencesFormValues) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Profile updated",
          description: "Your preferences have been saved.",
        });
      },
      onError: (error) => {
        toast({
          title: "Error updating profile",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  if (isLoading) {
    return <div>Loading preferences...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
        <CardDescription>
          Set your preferences to get more relevant job matches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="user_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Role</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Frontend Developer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preference_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary Range (LPA)</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="preference_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Company Type</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="flex items-center"
              disabled={updateProfile.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {updateProfile.isPending ? 'Saving...' : 'Save Preferences'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
