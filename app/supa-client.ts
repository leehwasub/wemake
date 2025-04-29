import { createClient } from "@supabase/supabase-js";
import type { MergeDeep, SetNonNullable ,SetFieldType } from "type-fest";
import type { Database as SupabaseDatabase } from "database.types";

type Database = MergeDeep<SupabaseDatabase, {
    public: {  
        Views: {
            community_post_list_view: {
                Row: SetFieldType<SetNonNullable<SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]>, "author_avatar", string | null>
            }
        }
    }
}>

const client = createClient<Database>(
    "https://mdflhytbhojhpwcfkwoa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZmxoeXRiaG9qaHB3Y2Zrd29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NzI2ODcsImV4cCI6MjA2MTM0ODY4N30.cxp3jvZPuuyAwjgy70t7B6vgqMhcHN7DHwM16f3Rae8"
)

export default client;