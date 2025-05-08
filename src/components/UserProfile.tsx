import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { User, UserCheck, UserCog } from "lucide-react";
import {
  supabase,
  getUserProfile,
  updateUserProfile,
} from "@/lib/supabaseClient";

interface UserProfileProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

const UserProfile = ({ onComplete, onCancel }: UserProfileProps) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check if user exists in session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // User is logged in
          setUserId(session.user.id);

          // Get user profile
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            setUsername(profile.username || "");
          }
        } else {
          // Create anonymous user
          const { data, error } = await supabase.auth.signUp({
            email: `${crypto.randomUUID()}@anonymous.com`,
            password: crypto.randomUUID(),
          });

          if (error) throw error;

          if (data.user) {
            setUserId(data.user.id);
          }
        }
      } catch (err) {
        console.error("Error initializing user:", err);
        setError("Failed to initialize user. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!userId) return;

    setIsSaving(true);
    setError(null);

    try {
      // Validate username
      if (!username.trim()) {
        setError("Please enter a username");
        return;
      }

      // Update profile
      const result = await updateUserProfile(userId, username);

      if (result) {
        // Call onComplete callback
        if (onComplete) onComplete();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Player Profile
          </CardTitle>
          <CardDescription>
            Choose a username to appear on the leaderboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-4">
              <UserCog className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isSaving}
                />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || isSaving}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handleSaveProfile}
            disabled={isLoading || isSaving}
            className="ml-auto flex items-center gap-2"
          >
            {isSaving ? (
              <UserCog className="h-4 w-4 animate-spin" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserProfile;
