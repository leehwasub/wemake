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
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default client;