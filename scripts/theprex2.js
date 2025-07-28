window.addEventListener("DOMContentLoaded", () => {
  // 1) Disable scroll restoration so browsers don't restore previous scroll on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // If there's a hash (like #history), remove it so the browser won't auto-scroll
  if (window.location.hash) {
    // This replaces the current URL with one without the hash,
    // so the user stays on the same page but with no fragment.
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
  
  // 2) Immediately scroll to the top
  window.scrollTo(0, 0);
  
  // 3) Get header element
  const header = document.getElementById("site-header");
  header.classList.remove("splash-active");
  
  // 4) Function to update header based on scroll position
  let ticking = false;
  
  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    
    // Add/remove classes based on scroll position
    // When scrolled past the full viewport height (100vh), make header white
    if (scrollTop > viewportHeight) {
      header.classList.add("scrolled");
      header.classList.remove("transparent");
    } else {
      header.classList.remove("scrolled");
      header.classList.add("transparent");
    }
    
    ticking = false;
  }
  
  // 5) Initial call to set proper state
  updateHeader();
  
  // 6) Add scroll listener
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
});
