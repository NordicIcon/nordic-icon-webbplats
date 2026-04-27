'use client';

import { useState } from 'react';
import BookingCalendar from './BookingCalendar';
import styles from './Contact.module.css';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || sent) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('API error');
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} id="kontakt">
      <div className={styles.inner}>
        {/* Left: form + info */}
        <div className={styles.left}>
          <div className={styles.label}>KONTAKT</div>
          <h2 className={styles.heading}>
            Redo att
            <br />
            <em>komma igång?</em>
          </h2>
          <p className={styles.sub}>
            Fyll i formuläret eller maila direkt så hör vi av oss samma dag.
          </p>

          <div className={styles.contactInfo}>
            <a href="mailto:info@nordicicon.se" className={styles.contactItem}>
              <span className={styles.contactLabel}>MAIL</span>
              <span className={styles.contactValue}>info@nordicicon.se</span>
            </a>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Namn *</label>
                  <input
                    className={styles.input}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    placeholder="Ditt namn"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>E-post *</label>
                  <input
                    className={styles.input}
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    placeholder="din@email.se"
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Företag</label>
                <input
                  className={styles.input}
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Företagsnamn"
                />
              </div>

              <div className={`${styles.formGroup} ${styles.phoneGroup}`}>
                <label className={styles.formLabel}>Telefon</label>
                <input
                  className={styles.input}
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="07X-XXX XX XX"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Meddelande</label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Berätta om ditt projekt..."
                  rows={4}
                />
              </div>

              {error && (
                <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '8px' }}>
                  Något gick fel. Försök igen eller maila oss direkt på info@nordicicon.se.
                </p>
              )}
              <button
                type="submit"
                className={`${styles.submitBtn} ${sent ? styles.submitBtnSent : ''}`}
                disabled={loading || sent}
              >
                {loading ? 'Skickar...' : sent ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Skickat!
                  </>
                ) : (
                  <>
                    Skicka meddelande
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
        </div>

        {/* Right: booking calendar */}
        <div className={styles.right}>
          <BookingCalendar />
        </div>
      </div>
    </section>
  );
}
