
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

interface Skill {
  id: string;
  name: string;
  level: number;
  years: number;
}

interface UserProfile {
  name: string;
  user_role: string;
  experience: string;
  location: string;
  preference_salary: string;
  preference_type: string;
}

// Fetch user skills
export const useUserSkills = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['skills', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) throw error;
      return data as Skill[];
    },
    enabled: !!user,
  });
};

// Add a new skill
export const useAddSkill = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (newSkill: Omit<Skill, 'id'>) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('skills')
        .insert({ ...newSkill, user_id: user.id })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', user?.id] });
    },
  });
};

// Remove a skill
export const useRemoveSkill = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (skillId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', user?.id] });
    },
  });
};

// Update a skill
export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ id, ...skill }: { id: string, level?: number, years?: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('skills')
        .update(skill)
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills', user?.id] });
    },
  });
};

// Fetch user profile
export const useUserProfile = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "row not found"
      
      return data as UserProfile || null;
    },
    enabled: !!user,
  });
};

// Update user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (profile: Partial<UserProfile>) => {
      if (!user) throw new Error('User not authenticated');
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();
      
      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('users')
          .update(profile)
          .eq('id', user.id);
          
        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from('users')
          .insert({ id: user.id, ...profile });
          
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
};
