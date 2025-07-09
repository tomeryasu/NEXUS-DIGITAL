// Smooth scrolling and navigation
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image");
    const heroContent = document.querySelector(".hero-content");

    if (heroImage && heroContent) {
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Highlight Sectionn
  const counters = document.querySelectorAll(".stat-number");
  counters.forEach((counter) => {
    let target = +counter.dataset.target;
    let current = 0;

    const update = () => {
      const step = target / 100;
      current += step;

      if (current < target) {
        counter.innerText =
          target > 1000
            ? Math.floor(current).toLocaleString()
            : current.toFixed(1);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });

  // Animated counter for stats
  function animateCounter(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
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

        if (entry.target.classList.contains("analytics-text")) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }

        if (entry.target.classList.contains("analytics-chart")) {
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
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".service-card")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".advanced-item")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".analytics-text")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".analytics-chart")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".category-item")
    .forEach((el) => observer.observe(el));
  document
    .querySelectorAll(".client-card")
    .forEach((el) => observer.observe(el));

  // Chart functionality
  const chartButtons = document.querySelectorAll(".chart-btn");
  const chartContent = document.querySelector(".chart-content");

  chartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      chartButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Update chart content based on selected period
      const period = this.getAttribute("data-period");
      updateChart(period);
    });
  });

  function updateChart(period) {
    // Simulate chart update with animation
    chartContent.style.opacity = "0.5";

    setTimeout(() => {
      let chartText = "";
      switch (period) {
        case "ימי":
          chartText = "נתונים יומיים - עלייה של 45%";
          break;
        case "חודשי":
          chartText = "נתונים חודשיים - עלייה של 120%";
          break;
        case "שנתי":
          chartText = "נתונים שנתיים - עלייה של 380%";
          break;
        default:
          chartText = "נתונים מתעדכנים...";
      }

      chartContent.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📈</div>
                    <div>${chartText}</div>
                </div>
            `;

      chartContent.style.opacity = "1";
    }, 300);
  }

  // Initialize chart
  updateChart("חודשי");

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "שולח...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("תודה על הפנייה! נחזור אליכם בהקדם.");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Floating elements animation
  function createFloatingElements() {
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-elements";
    floatingContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;

    for (let i = 0; i < 5; i++) {
      const element = document.createElement("div");
      element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: rgba(93, 173, 226, 0.1);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${
                  Math.random() * 10 + 10
                }s infinite ease-in-out;
            `;
      floatingContainer.appendChild(element);
    }

    document.body.appendChild(floatingContainer);
  }

  // Add floating animation CSS
  const floatingStyles = document.createElement("style");
  floatingStyles.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
            75% { transform: translateY(-15px) rotate(270deg); }
        }
    `;
  document.head.appendChild(floatingStyles);

  // Initialize floating elements
  createFloatingElements();

  // Mouse move parallax effect
  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const parallaxElements = document.querySelectorAll(
      ".service-card, .client-card"
    );

    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Scroll-triggered animations
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .advanced-item, .client-card"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);

  // Contact button handlers
  const contactButton = document.getElementById("contact-btn");
  const heroCtaButton = document.getElementById("hero-cta");

  function scrollToContact() {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = contactSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  if (contactButton) {
    contactButton.addEventListener("click", scrollToContact);
  }

  if (heroCtaButton) {
    heroCtaButton.addEventListener("click", scrollToContact);
  }

  // Form input animations
  const formInputs = document.querySelectorAll(
    ".form-input, .form-textarea, .form-select"
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Text animation effect
  function animateText(element, text, speed = 50) {
    element.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }

  // Initialize text animations when elements come into view
  const textElements = document.querySelectorAll(".hero-title, .section-title");
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("text-animated")
      ) {
        const originalText = entry.target.textContent;
        entry.target.classList.add("text-animated");
        // Uncomment the line below for typewriter effect
        // animateText(entry.target, originalText);
      }
    });
  });

  textElements.forEach((element) => {
    textObserver.observe(element);
  });
});

// Custom cursor effect
document.addEventListener("mousemove", function (e) {
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) {
    const newCursor = document.createElement("div");
    newCursor.className = "custom-cursor";
    newCursor.style.cssText = `
            position: fixed;
            width: 15px;
            height: 15px;
            background: #a02a6b;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.05s ease;
        `;
    document.body.appendChild(newCursor);
  }

  const cursorElement = document.querySelector(".custom-cursor");
  if (cursorElement) {
    cursorElement.style.left = e.clientX - 10 + "px";
    cursorElement.style.top = e.clientY - 10 + "px";
  }
});

// Performance optimization
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(function () {
  // Additional scroll-based animations can be added here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);

// Preloader
window.addEventListener("load", function () {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;

  preloader.innerHTML = `
        <div style="text-align: center; color: white;">
        
        </div>
    `;

  document.body.appendChild(preloader);

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1500);
});
