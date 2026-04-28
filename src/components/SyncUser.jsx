import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../supabase';

export default function SyncUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncToSupabase = async () => {
      if (isSignedIn && user) {
        const { id, primaryEmailAddress, fullName } = user;
        const email = primaryEmailAddress?.emailAddress || '';
        
        // Upsert user to Supabase
        const { error } = await supabase
          .from('users')
          .upsert({
            id: id,
            email: email,
            full_name: fullName,
          }, { onConflict: 'id' });

        if (error) {
          console.error("Error syncing user to Supabase:", error);
        }
      }
    };

    syncToSupabase();
  }, [isSignedIn, user]);

  return null; // This is a utility component, renders nothing
}
