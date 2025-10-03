import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const PORT = process.env.PORT || 8787;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  // eslint-disable-next-line no-console
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in environment');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Force JSON responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Signup: creates auth user and (optionally) an empty profile row
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) return res.status(400).json({ error: error.message });

    const user = data?.user;

    // Optional: create a skeleton profile tied to auth user_id
    if (user?.id) {
      const { error: pErr } = await supabase
        .from('profiles')
        .insert([{ user_id: user.id, username: null, location: null, preferred_arts: [], skill_level: null }]);
      if (pErr) {
        // eslint-disable-next-line no-console
        console.error('Profile insert failed:', pErr.message);
        return res.status(200).json({ user, warning: 'user created but profile insert failed', profile_error: pErr.message });
      }
    }

    return res.json({ user });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Login: use anon client (do NOT use service role for user sign-in)
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    if (!SUPABASE_ANON_KEY) return res.status(500).json({ error: 'missing anon key' });

    const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data, error } = await anon.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    return res.json({ session: data.session, user: data.user });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// Upsert user profile (expects id to be UNIQUE in profiles)
app.post('/profiles/upsert', async (req, res) => {
  const { user_id, username, location, preferred_arts, skill_level } = req.body || {};
  if (!user_id || !username) return res.status(400).json({ error: 'user_id and username required' });

  // Debug: log what we received
  // eslint-disable-next-line no-console
  console.log('Profile upsert request:', { user_id, username, location, preferred_arts, skill_level });

  // Ensure preferred_arts is an array of strings
  const arts = Array.isArray(preferred_arts) ? preferred_arts.filter(x => typeof x === 'string') : [];

  // Keep skill_level as string (not number) to match the schema
  const skill = (skill_level === null || skill_level === undefined || skill_level === '')
    ? null
    : String(skill_level);

  const profileData = {
    user_id: user_id,                  // Keep as user_id since you updated Supabase schema
    username,
    location: location || null,
    preferred_arts: arts,              // Array for text[]
    skill_level: skill,                // String for text
    updated_at: new Date().toISOString(),
  };

  // eslint-disable-next-line no-console
  console.log('Upserting profile data:', profileData);

  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'user_id' })
      .select();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Supabase upsert error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    // eslint-disable-next-line no-console
    console.log('Profile upserted successfully:', data);
    return res.json({ ok: true, profile: data?.[0] ?? null });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Profile upsert exception:', e);
    return res.status(500).json({ error: 'internal_error' });
  }
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'not_found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'internal_error' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});
