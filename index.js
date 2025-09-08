document.addEventListener('DOMContentLoaded', () => {
  const toc = document.getElementById('toc');
  const tocToggle = document.querySelector('.toc-toggle');
  const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  // Toggle TOC on mobile
  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => {
      toc.classList.toggle('open');
    });
  }

  // On mobile, close the TOC after clicking a link
  tocLinks.forEach(anchor => {
    anchor.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        toc.classList.remove('open');
      }
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Active link highlighting on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const correspondingLink = document.querySelector(`.toc a[href="#${id}"]`);

      if (entry.isIntersecting) {
        // Remove active class from all links
        tocLinks.forEach(link => link.classList.remove('active'));
        // Add active class to the intersecting link
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      } else {
        if (correspondingLink) {
          correspondingLink.classList.remove('active');
        }
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => {
    observer.observe(section);
  });
});
