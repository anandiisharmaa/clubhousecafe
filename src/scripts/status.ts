// Live Operating Status for Clubhouse Cafe (IST: Asia/Kolkata)
// Operating hours: 9:30 AM to 12:00 AM Daily
export function initLiveStatus() {
  function getISTTime() {
    const now = new Date();
    // Convert to IST (UTC + 5:30)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 3600000;
    return new Date(utc + istOffset);
  }

  function updateStatus() {
    const ist = getISTTime();
    const hours = ist.getHours();
    const minutes = ist.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // 9:30 AM = 570 mins, 12:00 AM (midnight) = 1440 mins
    const openTime = 9 * 60 + 30; // 570
    const closeTime = 24 * 60;    // 1440

    const isOpen = currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;

    const statusTexts = document.querySelectorAll('[data-live-status-text]');
    const statusDots = document.querySelectorAll('[data-live-status-dot]');

    statusTexts.forEach((el) => {
      if (isOpen) {
        el.textContent = 'Open Today until 12 AM';
      } else {
        el.textContent = 'Doors Open at 9:30 AM';
      }
    });

    statusDots.forEach((el) => {
      if (isOpen) {
        el.classList.remove('bg-gold');
        el.classList.add('bg-emerald-700');
      } else {
        el.classList.remove('bg-emerald-700');
        el.classList.add('bg-gold');
      }
    });
  }

  updateStatus();
  // Refresh every 2 minutes
  setInterval(updateStatus, 120000);
}
