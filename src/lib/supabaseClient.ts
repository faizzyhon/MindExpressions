import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Create a single supabase client for interacting with your database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create the client if both URL and key are available
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;

// Check if Supabase is properly initialized
if (!supabase) {
  console.warn(
    "Supabase client not initialized. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are set.",
  );
}

// Helper function to get the current user
export const getCurrentUser = async () => {
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
};

// Helper function to update user profile
export const updateUserProfile = async (userId: string, username: string) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, username })
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return null;
  }

  return data;
};

// Helper function to save game score
export const saveGameScore = async (
  userId: string,
  score: number,
  gameMode: string,
) => {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("game_scores")
    .insert({
      user_id: userId,
      score,
      game_mode: gameMode,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving game score:", error);
    return null;
  }

  return data;
};

// Helper function to get leaderboard
export const getLeaderboard = async (limit = 10, gameMode?: string) => {
  if (!supabase) return [];

  let query = supabase
    .from("game_scores")
    .select(
      `
      id,
      score,
      game_mode,
      created_at,
      profiles(id, username)
    `,
    )
    .order("score", { ascending: false })
    .limit(limit);

  if (gameMode) {
    query = query.eq("game_mode", gameMode);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }

  return data.map((entry) => ({
    id: entry.id,
    score: entry.score,
    gameMode: entry.game_mode,
    createdAt: entry.created_at,
    userId: entry.profiles?.id,
    username: entry.profiles?.username || "Anonymous",
  }));
};
