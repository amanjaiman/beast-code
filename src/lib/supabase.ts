import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofqbhpcbyoksqmcytawl.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcWJocGNieW9rc3FtY3l0YXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDQ1NTEsImV4cCI6MjA4ODQ4MDU1MX0.iLU9JhsUTjQsGiRK-IJvBmlaDnk3aonOQrKeaflldhU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
