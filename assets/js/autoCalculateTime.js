function calculateExperience() {
    const currentDate = new Date();
    const experienceContainers = document.querySelectorAll('.work-experience-container');

    experienceContainers.forEach(container => {
      const dateRange = container.querySelector('h4').innerText;
      const dates = dateRange.split(' – ');
      const startDate = new Date(dates[0] + ' 1 ' + dates[0].split(' ')[1]);
      const endDate = dates[1].toLowerCase() === 'present' ? currentDate : new Date(dates[1] + ' 1 ' + dates[1].split(' ')[1]);
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;

      container.querySelector('h4').innerText += ' (' + years + ' yrs ' + remainingMonths + ' mos)';
    });
  }

  // Run the function when the window loads
window.onload = calculateExperience;