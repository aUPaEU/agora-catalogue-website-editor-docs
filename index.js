document.addEventListener('DOMContentLoaded', () => {
  const toc = document.getElementById('toc');
  const tocToggle = document.querySelector('.toc-toggle');

  // Toggle TOC on mobile
  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => {
      toc.classList.toggle('open');
    });
  }

  // On mobile, close the TOC after clicking a link
  document.querySelectorAll('.toc a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
      if (window.innerWidth <= 980) {
        toc.classList.remove('open');
      }
    });
  });

  // Collapsible TOC sections
  const collapsibleElements = document.querySelectorAll('.collapsible .toggle-btn');
  collapsibleElements.forEach(element => {
    element.addEventListener('click', function() {
      this.classList.toggle('open');
      const nestedList = this.closest('.collapsible').querySelector('.nested-list');
      if (nestedList.style.display === 'block') {
        nestedList.style.display = 'none';
      } else {
        nestedList.style.display = 'block';
      }
    });
  });
});
