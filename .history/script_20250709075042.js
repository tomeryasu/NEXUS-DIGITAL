// Smooth scrolling and navigation
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenu = document.getElementById("close-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function(event) {
    if (mobileMenu && hamburger && !mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Header scroll effect
  const mainHeader = document.querySelector(".main-header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      mainHeader.classList.add("header-minimal");
    } else {
      mainHeader.classList.remove("header-minimal");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu after clicking link
        if (mobileMenu) {
          mobileMenu.classList.remove("open");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // Animated counter for stats - Run immediately on page load
  const counters = document.querySelectorAll(".stat-number");
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;
      const increment = target / 100;
      const duration = 2000; // 2 seconds
      const stepTime = duration / 100;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toLocaleString();
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      updateCounter();
    });
  }

  // Run counter animation after a short delay
  setTimeout(animateCounters, 1000);

  // Also run on scroll for better UX
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-target"));
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5, rootMargin: "0px 0px -50px 0px" });

  counters.forEach(counter => counterObserver.observe(counter));

  // Intersection Observer for scroll animations
  const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute("data-aos")) {
          entry.target.classList.add("aos-animate");
        }

        // Special animations for specific elements
        if (entry.target.classList.contains("service-card")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        if (entry.target.classList.contains("advanced-item")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }

        if (entry.target.classList.contains("category-item")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

        if (entry.target.classList.contains("client-card")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      }
    });
  }, animationObserverOptions);

  // Observe all animated elements
  document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));
  document.querySelectorAll(".service-card").forEach((el) => observer.observe(el));
  document.querySelectorAll(".advanced-item").forEach((el) => observer.observe(el));
  document.querySelectorAll(".category-item").forEach((el) => observer.observe(el));
  document.querySelectorAll(".client-card").forEach((el) => observer.observe(el));

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to your server
      console.log("Form submitted:", data);
      
      // Show success message (you can customize this)
      alert("תודה! נציג יצור איתך קשר בהקדם.");
      
      // Reset form
      this.reset();
    });
  }

  // Sticky contact button
  const stickyContactBtn = document.getElementById("stickyContactBtn");
  if (stickyContactBtn) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 300) {
        stickyContactBtn.classList.add("show");
      } else {
        stickyContactBtn.classList.remove("show");
      }
    });

    stickyContactBtn.addEventListener("click", function() {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Contact button functionality
  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add simple fade-in animations for elements when they come into view
  const fadeElements = document.querySelectorAll('.service-card, .advanced-item, .category-item, .client-card');
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    fadeObserver.observe(el);
  });
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener("resize", debounce(function() {
  // Reinitialize any responsive elements if needed
}, 250));
