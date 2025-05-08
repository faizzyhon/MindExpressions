export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          created_at?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      game_scores: {
        Row: {
          id: number;
          user_id: string;
          score: number;
          game_mode: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          score: number;
          game_mode: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          score?: number;
          game_mode?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "game_scores_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
