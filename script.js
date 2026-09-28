document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('#siteSearch');

  if (search) {
    search.addEventListener('input', () => {
      const query = search.value.toLowerCase();

      document.querySelectorAll('[data-search]').forEach(item => {
        item.style.display =
          !query || item.dataset.search.toLowerCase().includes(query)
            ? ''
            : 'none';
      });
    });
  }
});
