import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

async function getAvailableTimes(): Promise<string[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return ['10:00', '11:00', '13:00', '14:00', '15:00'];
  }
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const { data } = await supabase.from('settings').select('value').eq('key', 'available_times').single();
  return Array.isArray(data?.value) ? data.value : ['10:00', '11:00', '13:00', '14:00', '15:00'];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return Response.json({ error: 'date parameter required' }, { status: 400 });
  }

  const day = new Date(date).getDay();
  if (day === 0 || day === 6) {
    return Response.json({ times: [], date });
  }

  const times = await getAvailableTimes();
  return Response.json({ times, date });
}
