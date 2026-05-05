import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

async function getTimesForDate(date: string): Promise<string[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const { data } = await supabase.from('settings').select('value').eq('key', 'available_times').single();
  if (!data?.value) return [];
  if (!Array.isArray(data.value)) {
    return (data.value as Record<string, string[]>)[date] ?? [];
  }
  return data.value as string[];
}

async function getBookedTimes(date: string): Promise<Set<string>> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new Set();
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const { data } = await supabase
    .from('calendar_bookings')
    .select('meeting_time')
    .eq('meeting_date', date)
    .neq('status', 'avbokad');
  const times = new Set<string>();
  (data ?? []).forEach(r => { if (r.meeting_time) times.add(r.meeting_time); });
  return times;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  if (!date) return Response.json({ error: 'date parameter required' }, { status: 400 });

  const day = new Date(date).getDay();
  if (day === 0 || day === 6) return Response.json({ times: [], date });

  const [allTimes, bookedTimes] = await Promise.all([
    getTimesForDate(date),
    getBookedTimes(date),
  ]);

  const available = allTimes.filter(t => !bookedTimes.has(t));
  return Response.json({ times: available, date });
}
