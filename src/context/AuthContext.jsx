import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function syncProfile() {
      if (!session?.user) {
        setProfile(null);
        return;
      }

      const user = session.user;
      const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'ClickCareer Student';

      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            email: user.email,
            full_name: fullName,
          },
          { onConflict: 'id' },
        )
        .select()
        .single();

      if (!error) {
        setProfile(data);
      }
    }

    syncProfile();
  }, [session]);

  const value = useMemo(() => {
    const user = session?.user || null;

    return {
      loading,
      session,
      user,
      profile,
      isSignedIn: !!user,
      signIn: ({ email, password }) => supabase.auth.signInWithPassword({ email, password }),
      signUp: ({ email, password, fullName }) =>
        supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        }),
      signOut: () => supabase.auth.signOut(),
    };
  }, [loading, session, profile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
