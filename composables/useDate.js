import { DateTime } from "luxon";
export function useDate() {
  const { locale } = useI18n();
  const hmTime = (dateTimeString) => {
    if (dateTimeString) {
      const dateTime = DateTime.fromISO(dateTimeString);
      const formatted = dateTime.setLocale(locale.value).toLocaleString({
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return formatted;
    }
  };
  const hmDate = (dateTimeString) => {
    if (dateTimeString) {
      const dateTime = DateTime.fromISO(dateTimeString);
      const formatted = dateTime.setLocale(locale.value).toLocaleString({
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formatted;
    }
  };

  const hmDuration = (mins) => {
    // Calculate hours and minutes
    const hours = Math.floor(mins / 60);
    const remainingMinutes = mins % 60;
  
    // Construct the formatted string based on the locale
    if (locale.value === 'ar') {
      // Arabic locale
      let formatted = '';
      if (hours > 0) {
        formatted += `${hours} ساعة`;
      }
      if (remainingMinutes > 0) {
        formatted += `${hours > 0 ? ' و ' : ''}${remainingMinutes} دقيقة`;
      }
      return formatted.trim();
    } else {
      // English locale
      let formatted = '';
      if (hours > 0) {
        formatted += `${hours} hour${hours > 1 ? 's' : ''}`;
      }
      if (remainingMinutes > 0) {
        formatted += `${hours > 0 ? ' and ' : ''}${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
      }
      return formatted;
    }
  };
  

  return {
    hmTime,
    hmDate,
    hmDuration,
  };
}
