function calculateExperience() {
  const currentDate = new Date();
  const experienceContainers = document.querySelectorAll('.work-experience-container');

  experienceContainers.forEach(container => {
    const dateRange = container.querySelector('h4').innerText;
    const dates = dateRange.split(' – ');

    // Parse start date
    const startDate = new Date(Date.parse(dates[0]));

    // Handle 'Present' case for the end date
    const endDate = dates[1].toLowerCase() === 'present' ? currentDate : new Date(Date.parse(dates[1]));

    // Calculate difference in months and years
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    // Append the experience duration to the text
    container.querySelector('h4').innerText += ` (${years} yrs ${remainingMonths} mos)`;
  });
}

// Run the function when the window loads
window.onload = calculateExperience;