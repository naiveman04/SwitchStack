
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useUserProfile, useUpdateProfile } from '@/hooks/use-profile-data';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const AccountTab: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  
  const [name, setName] = useState(profile?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle name change
    if (name !== profile?.name) {
      updateProfile.mutate({ name }, {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your profile information has been updated.",
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
    }

    // Handle password change
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "The new password and confirmation do not match.",
          variant: "destructive",
        });
        return;
      }

      setIsUpdating(true);
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        
        if (error) {
          throw error;
        }
        
        toast({
          title: "Password updated",
          description: "Your password has been successfully changed.",
        });

        // Clear password fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error: any) {
        toast({
          title: "Password update failed",
          description: error.message || "An error occurred changing your password.",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteAccount = async () => {
    // This would typically require additional confirmation
    toast({
      title: "This feature is not implemented",
      description: "For security reasons, please contact support to delete your account.",
      variant: "destructive",
    });
  };

  if (isLoading) {
    return <div>Loading account information...</div>;
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Manage your account details and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="flex items-center"
              disabled={isUpdating || updateProfile.isPending}
            >
              <Check className="mr-2 h-4 w-4" />
              {isUpdating || updateProfile.isPending ? 'Updating...' : 'Update Account'}
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
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountTab;
