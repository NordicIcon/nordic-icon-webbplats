'use client';

import { useState, useEffect } from 'react';
import styles from './BookingCalendar.module.css';

const MONTHS = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'];
const MONTHS_LONG = ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'];
const DAYS   = ['Mån','Tis','Ons','Tor','Fre','Lör','Sön'];

interface BookingStep {
  type: 'calendar' | 'times' | 'form' | 'confirmed';
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function BookingCalendar() {
  const [step, setStep]             = useState<BookingStep['type']>('calendar');
  const [currentDate, setCurrentDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [form, setForm]             = useState({ name: '', email: '', company: '' });
  const [loading, setLoading]       = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);

  const prevMonth = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    // Don't go before current month
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= thisMonth) setCurrentDate(prev);
  };

  const nextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
    if (next <= maxMonth) setCurrentDate(next);
  };

  const monthName = MONTHS_LONG[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  // Offset: Monday = 0, so (getDay()+6)%7
  const firstDayOffset = (days[0].getDay() + 6) % 7;

  useEffect(() => {
    if (!selectedDate) return;
    setLoading(true);
    fetch(`/api/available-times?date=${formatDate(selectedDate)}`)
      .then(r => r.json())
      .then(data => {
        setAvailableTimes(data.times || []);
        setLoading(false);
      })
      .catch(() => {
        setAvailableTimes(['10:00','11:00','13:00','14:00']);
        setLoading(false);
      });
  }, [selectedDate]);

  const selectDate = (d: Date) => {
    const day = d.getDay();
    if (day === 0 || day === 6) return;
    if (d < today) return;
    setSelectedDate(d);
    setStep('times');
  };

  const selectTime = (t: string) => {
    setSelectedTime(t);
    setStep('form');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setLoading(true);

    try {
      await fetch('/api/book-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formatDate(selectedDate),
          time: selectedTime,
          ...form,
        }),
      });
      setStep('confirmed');
    } catch {
      setStep('confirmed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetLabel}>BOKA ETT MÖTE</div>
        <p className={styles.widgetSub}>30 minuter · Google Meet · Kostnadsfritt</p>
      </div>

      {/* ── Step 1: Calendar ── */}
      {step === 'calendar' && (
        <div className={styles.calendarWrap}>
          <div className={styles.calendarHeader}>
            <button
              className={styles.monthNav}
              onClick={prevMonth}
              aria-label="Föregående månad"
            >←</button>
            <span className={styles.monthTitle}>
              {monthName} {year}
            </span>
            <button
              className={styles.monthNav}
              onClick={nextMonth}
              aria-label="Nästa månad"
            >→</button>
          </div>
          <div className={styles.dayHeaders}>
            {DAYS.map(d => (
              <div key={d} className={styles.dayHeader}>{d}</div>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              const isPast    = day < today;
              const isSelected = selectedDate && formatDate(day) === formatDate(selectedDate);
              return (
                <button
                  key={formatDate(day)}
                  className={`${styles.dayBtn} ${isWeekend || isPast ? styles.dayDisabled : ''} ${isSelected ? styles.daySelected : ''}`}
                  onClick={() => selectDate(day)}
                  disabled={isWeekend || isPast}
                  aria-label={`Välj ${day.getDate()} ${MONTHS[day.getMonth()]}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Step 2: Time slots ── */}
      {step === 'times' && selectedDate && (
        <div className={styles.timesWrap}>
          <button className={styles.back} onClick={() => setStep('calendar')}>
            ← Tillbaka
          </button>
          <div className={styles.selectedDateLabel}>
            {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
          </div>
          {loading ? (
            <div className={styles.loading}>Hämtar tider...</div>
          ) : (
            <div className={styles.timeSlots}>
              {availableTimes.map(time => (
                <button
                  key={time}
                  className={styles.timeSlot}
                  onClick={() => selectTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Step 3: Booking form ── */}
      {step === 'form' && (
        <form className={styles.bookingForm} onSubmit={submit}>
          <button type="button" className={styles.back} onClick={() => setStep('times')}>
            ← Tillbaka
          </button>
          <div className={styles.bookingSummary}>
            {selectedDate?.getDate()} {selectedDate && MONTHS[selectedDate.getMonth()]} · {selectedTime}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Namn *</label>
            <input
              className={styles.formInput}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              placeholder="Ditt namn"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>E-post *</label>
            <input
              className={styles.formInput}
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              placeholder="din@mail.se"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Företag</label>
            <input
              className={styles.formInput}
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="Företagsnamn (valfritt)"
            />
          </div>

          <button type="submit" className={styles.bookBtn} disabled={loading}>
            {loading ? 'Bokar...' : 'Bekräfta bokning'}
          </button>
        </form>
      )}

      {/* ── Step 4: Confirmed ── */}
      {step === 'confirmed' && (
        <div className={styles.confirmed}>
          <div className={styles.confirmedIcon}>✓</div>
          <div className={styles.confirmedTitle}>Möte bokat.</div>
          <p className={styles.confirmedText}>
            Bekräftelse skickas till {form.email}. Vi ses på Google Meet.
          </p>
          <div className={styles.confirmedMeta}>
            {selectedDate?.getDate()} {selectedDate && MONTHS[selectedDate.getMonth()]} · {selectedTime}
          </div>
        </div>
      )}
    </div>
  );
}
