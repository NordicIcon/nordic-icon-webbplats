'use client';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.formHeading}>Skicka ett meddelande</h2>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="cf-name">Namn *</label>
          <input
            id="cf-name"
            type="text"
            className={styles.formInput}
            placeholder="Namn"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="cf-company">Bolag</label>
          <input
            id="cf-company"
            type="text"
            className={styles.formInput}
            placeholder="Bolag"
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="cf-email">E-post *</label>
        <input
          id="cf-email"
          type="email"
          className={styles.formInput}
          placeholder="mail@bolag.se"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="cf-message">Meddelande</label>
        <textarea
          id="cf-message"
          className={`${styles.formInput} ${styles.formTextarea}`}
          placeholder="Berätta om ditt projekt..."
          rows={5}
        />
      </div>
      <button type="submit" className={styles.formSubmit}>
        Skicka meddelande →
      </button>
    </form>
  );
}
