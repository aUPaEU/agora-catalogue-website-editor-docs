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
});
