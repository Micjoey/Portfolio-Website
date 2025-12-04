/**
 * Calculates and displays work experience duration for each experience container.
 */
function calculateExperience() {
  const currentDate = new Date();
  const experienceContainers = document.querySelectorAll('.work-experience-container');

  experienceContainers.forEach(container => {
    const heading = container.querySelector('h4');
    if (!heading) return;

    const dateRange = heading.textContent.trim();
    if (!dateRange) return;

    const dates = dateRange.split(' – ');
    if (dates.length !== 2) return;

    const startDate = parseDate(dates[0]);
    if (!startDate) return;

    const endDate = dates[1].toLowerCase() === 'present' 
      ? currentDate 
      : parseDate(dates[1]);
    
    if (!endDate) return;

    const duration = calculateDuration(startDate, endDate);
    if (duration) {
      heading.textContent = `${dateRange} (${duration})`;
    }
  });
}

/**
 * Parses a date string into a Date object.
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 */
function parseDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  const parsed = Date.parse(dateString.trim());
  if (isNaN(parsed)) {
    return null;
  }

  return new Date(parsed);
}

/**
 * Calculates duration between two dates in years and months.
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {string|null} Formatted duration string or null if invalid
 */
function calculateDuration(startDate, endDate) {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return null;
  }

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return null;
  }

  if (endDate < startDate) {
    return null;
  }

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 
    + (endDate.getMonth() - startDate.getMonth());
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  return `${years} yrs ${remainingMonths} mos`;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', calculateExperience);
} else {
  calculateExperience();
}