/* ============================================
   BOOKING-WIDGET.JS — Sedin Hotel PRO
   Datepicker + formulärlogik
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const widgets = document.querySelectorAll('.booking-widget');
  if (!widgets.length) return;

  // Sätt minsta datum (idag)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const toInputValue = (date) => {
    return date.toISOString().split('T')[0];
  };

  widgets.forEach(widget => {
    const checkInInput  = widget.querySelector('[name="check-in"]');
    const checkOutInput = widget.querySelector('[name="check-out"]');
    const form          = widget.querySelector('.booking-widget__form');

    if (checkInInput) {
      checkInInput.type = 'date';
      checkInInput.min  = toInputValue(today);
      if (!checkInInput.value) checkInInput.value = toInputValue(tomorrow);
    }

    if (checkOutInput) {
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
      checkOutInput.type = 'date';
      checkOutInput.min  = toInputValue(tomorrow);
      if (!checkOutInput.value) checkOutInput.value = toInputValue(dayAfterTomorrow);
    }

    // Uppdatera check-out min när check-in ändras
    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener('change', () => {
        const newMin = new Date(checkInInput.value);
        newMin.setDate(newMin.getDate() + 1);
        checkOutInput.min = toInputValue(newMin);
        if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
          checkOutInput.value = toInputValue(newMin);
        }
      });
    }

    // Form submit — placeholder (visningsprojekt)
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.booking-widget__submit');
        if (!btn) return;
        const original = btn.textContent;
        btn.textContent = 'Söker tillgänglighet...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 1800);
      });
    }
  });

});
