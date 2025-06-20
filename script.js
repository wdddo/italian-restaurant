const buttons = document.querySelectorAll('.filter-buttons button');
const tableHeader = document.querySelector('.Gerichte-Kategorie');
const bodies = document.querySelectorAll('tbody');

let activeFilter = 'all';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    // Toggle filter logic
    if (button.classList.contains('active')) {
      button.classList.remove('active');
      activeFilter = 'all';
    } else {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = filter;
    }

    let totalVisible = 0;

    bodies.forEach(tbody => {
      const rows = tbody.querySelectorAll('tr[data-tags]');
      let visibleInSection = 0;

      rows.forEach(row => {
        const tags = row.dataset.tags.toLowerCase().split(',');
        if (activeFilter === 'all' || tags.includes(activeFilter)) {
          row.classList.remove('hidden');
          visibleInSection++;
        } else {
          row.classList.add('hidden');
        }
      });

      // Hide the entire tbody if none of its rows are visible
      tbody.classList.toggle('hidden', visibleInSection === 0);
      totalVisible += visibleInSection;
    });

    // Toggle the main table header visibility
    if (tableHeader) {
      tableHeader.classList.toggle('hidden', totalVisible === 0);
    }
  });
});

