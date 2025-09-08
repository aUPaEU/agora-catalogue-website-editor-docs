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

  // Collapsible TOC sections - ensure nested lists start collapsed and toggles work reliably
  const collapsibleItems = document.querySelectorAll('.collapsible');
  collapsibleItems.forEach(item => {
    const toggle = item.querySelector('.toggle-btn');
    const label = item.querySelector('.flex-container');
    const nested = item.querySelector('.nested-list');

    // Force collapsed state on load
    if (nested) {
      nested.style.display = 'none';
      nested.style.maxHeight = '0';
    }

    const toggleHandler = (e) => {
      e && e.preventDefault();
      if (!nested) return;
      const isOpen = nested.style.maxHeight && nested.style.maxHeight !== '0px' && nested.style.maxHeight !== '0';
      if (isOpen) {
        // close: animate maxHeight to 0 then hide
        nested.style.maxHeight = '0';
        const onEnd = () => {
          nested.style.display = 'none';
          nested.removeEventListener('transitionend', onEnd);
        };
        nested.addEventListener('transitionend', onEnd);
        if (toggle) toggle.classList.remove('open');
      } else {
        // open: make visible and animate to full height
        nested.style.display = 'block';
        // allow layout
        requestAnimationFrame(() => {
          nested.style.maxHeight = nested.scrollHeight + 'px';
        });
        if (toggle) toggle.classList.add('open');
      }
    };

    // Click on the small button
    if (toggle) toggle.addEventListener('click', toggleHandler);
    // Also make the whole label clickable (but avoid letting the anchor navigate)
    if (label) {
      label.addEventListener('click', (e) => {
        const anchor = label.querySelector('a');
        // If the click target was the anchor itself, allow navigation to section
        if (e.target === anchor) return;
        // If the click originated from the toggle button (or inside it), skip here
        if (e.target.closest && e.target.closest('.toggle-btn')) return;
        toggleHandler(e);
      });
    }
  });
});
