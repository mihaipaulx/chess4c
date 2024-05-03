export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_requests: {
        Row: {
          email: string | null
          id: string
          message_body: string | null
          updated_at: Date | null
        }
        Insert: {
          email?: string | null
          id?: string
          message_body?: string | null
          updated_at?: Date | null
        }
        Update: {
          email?: string | null
          id?: string
          message_body?: string | null
          updated_at?: Date | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          username: string | null
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          rating: number | 1500
          rating_deviation: number | 350.000
        }
        Insert: {
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: Date | null
          rating?: number | 1500
          rating_deviation?: number | 350.000
        }
        Update: {
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          rating?: number | 1500
          rating_deviation?: number | 350.000
        }
        Relationships: []
      }
      puzzles: {
        Row: {
          id: string
          fen: string | null
          moves: string | null
          rating: number | null
          rating_deviation: number | null
          popularity: number | null
          nb_plays: number | null
          themes: string | null
          opening_tags: string | null
        }
        Insert: {
          id: string
          fen: string | null
          moves: string | null
          rating: number | null
          rating_deviation: number | null
          popularity: number | null
          nb_plays: number | null
          themes: string | null
          opening_tags: string | null
        }
        Update: {
          id?: string
          fen?: string | null
          moves?: string | null
          rating?: number | null
          rating_deviation?: number | null
          popularity?: number | null
          nb_plays?: number | null
          themes?: string | null
          opening_tags?: string | null
        }
        Relationships: []
      }
      user_puzzles: {
        Row: {
          id: string
          user_id: string | null
          puzzle_id: string | null
          solved_at: Date | null
          success: boolean | null
          old_rating: number | null
          new_rating: number | null
          old_rating_deviation: number | null
          new_rating_deviation: number | null
        }
        Insert: {
          id: string
          user_id: string | null
          puzzle_id: string | null
          solved_at?: Date | null
          success?: boolean | null
          old_rating?: number | null
          new_rating?: number | null
          old_rating_deviation?: number | null
          new_rating_deviation?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          puzzle_id?: string
          solved_at?: Date | null
          success?: boolean | null
          old_rating?: number | null
          new_rating?: number | null
          old_rating_deviation?: number | null
          new_rating_deviation?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_puzzles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
            onDelete: "CASCADE"
            onUpdate: "CASCADE"
          },
          {
            foreignKeyName: "user_puzzles_puzzle_id_fkey"
            columns: ["puzzle_id"]
            referencedRelation: "puzzles"
            referencedColumns: ["id"]
            onDelete: "CASCADE"
            onUpdate: "CASCADE"
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
