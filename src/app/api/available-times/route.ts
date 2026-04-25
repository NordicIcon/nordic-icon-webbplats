import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

async function getTimesForDate(date: string): Promise<string[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  const { data } = await supabase.from('settings').select('value').eq('key', 'available_times').single();
  if (!data?.value) return [];
  // New format: { "2026-04-28": ["10:00", "14:00"] }
  if (!Array.isArray(data.value)) {
    return (data.value as Record<string, string[]>)[date] ?? [];
  }
  // Legacy global array — return as-is for weekdays
  return data.value as string[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  if (!date) return Response.json({ error: 'date parameter required' }, { status: 400 });

  const day = new Date(date).getDay();
  if (day === 0 || day === 6) return Response.json({ times: [], date });

  const times = await getTimesForDate(date);
  return Response.json({ times, date });
}
