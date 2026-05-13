  // ==========================================
  // Gallery: Hover (desktop) + Click (mobile)
  // ==========================================

  const galleryItems = document.querySelectorAll('.gallery-wrap .item');
  const galleryWrap = document.querySelector('.gallery-wrap');
  const isTouch = () => !window.matchMedia('(hover: hover)').matches;

  galleryItems.forEach(item => {

    // Desktop: expand on mouseenter if fully visible
    item.addEventListener('mouseenter', () => {
      if (isTouch()) return;
      const rect = item.getBoundingClientRect();
      const isFullyVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;
      if (isFullyVisible) item.classList.add('is-hovered');
    });

    item.addEventListener('mouseleave', () => {
      if (isTouch()) return;
      item.classList.remove('is-hovered');
    });

    // Mobile: tap to expand, tap again to collapse
    item.addEventListener('click', () => {
      if (!isTouch()) return;
      const isActive = item.classList.contains('is-hovered');
      galleryItems.forEach(i => i.classList.remove('is-hovered'));
      if (isActive) {
        galleryWrap.classList.remove('has-active');
      } else {
        item.classList.add('is-hovered');
        galleryWrap.classList.add('has-active');
      }
    });
  });


// Accent 3 ONLY (so we can place it anywhere)
function addWillemAccent3(tl, container) {
    const accent3 = container.querySelectorAll(".willem__accent3");
    if (!accent3.length) return;
  
    tl.to(accent3, {
      backgroundImage:
        "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
      duration: 0.2,
      ease: "none",
      stagger: 0.02,
    }, "<"); 
  }
  
  // Accent 1 + Accent 2 (keep these after white letters if you want)
  function addWillemAccentColorAfter(tl, container) {
    const accentLetters = container.querySelectorAll(".willem__accent");
    const accent2 = container.querySelectorAll(".willem__accent2");
  
    if (accentLetters.length) {
      tl.to(accentLetters, {
        color: "#c4652a",
        duration: 0.3,
        ease: "none",
        stagger: 0.02,
      }, "<");
    }
  
    if (accent2.length) {
      tl.to(accent2, {
        color: "#f4f4f4",
        duration: 0.4,
        ease: "none",
        stagger: 0.02,
      }, ">");
    }
  }
  
  function initWillemLoadingAnimation() {
    const container = document.querySelector(".willem-header");
    const loadingLetter = container.querySelectorAll(".willem__letter");
    const box = container.querySelectorAll(".willem-loader__box");
    const growingImage = container.querySelectorAll(".willem__growing-image");
    const headingStart = container.querySelectorAll(".willem__h1-start");
    const headingEnd = container.querySelectorAll(".willem__h1-end");
    const coverImageExtra = container.querySelectorAll(".willem__cover-image-extra");
    const headerLetter = container.querySelectorAll(".willem__letter-white");
    const navLinks = container.querySelectorAll(".willen-nav a, .osmo-credits__p");
  
    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onStart: () => container.classList.remove("is--hidden"),
    });
  
    if (loadingLetter.length) {
      tl.from(loadingLetter, { yPercent: 100, stagger: 0.025, duration: 1 });
    }
  
    if (box.length) {
      const boxWidth = window.matchMedia("(min-width: 768px)").matches ? "1em" : "0.5em";
      tl.fromTo(box, { width: "0em" }, { width: boxWidth, duration: 1.2 }, "< 1.2");
    }
  
    if (growingImage.length) {
      tl.fromTo(growingImage, { width: "0%" }, { width: "100%", duration: 1.2 }, "<");
    }
  
    if (headingStart.length) {
      tl.fromTo(headingStart, { x: "0em" }, { x: "-0.05em", duration: 1.2 }, "<");
    }
  
    if (headingEnd.length) {
      tl.fromTo(headingEnd, { x: "0em" }, { x: "0.05em", duration: 1.2 }, "<");
    }
  
    if (coverImageExtra.length) {
      tl.fromTo(
        coverImageExtra,
        { opacity: 1 },
        { opacity: 0, duration: 0.001, ease: "none", stagger: 0.5 },
        "-=0.05"
      );
    }
  
  
  
    // image gets bigger 
    if (growingImage.length) {
      tl.to(growingImage, { width: "100vw", height: "100dvh", duration: 2 }, "< 1.2");
    }


  
    if (box.length) {
      tl.to(box, { width: "110vw", duration: 2 }, "<");
    }
  
    if (headerLetter.length) {
      tl.from(
        headerLetter,
        { yPercent: 100, duration: 1.2, ease: "expo.out", stagger: 0.025 },
        "< 1.2"
      );
    }
  
    if (navLinks.length) {
      tl.from(navLinks, { yPercent: 100, duration: 1.2, ease: "expo.out", stagger: 0.1 }, "<");
    }

          // ✅ RUN ACCENT3 RIGHT BEFORE THE IMAGE GETS BIGGER
          addWillemAccent3(tl, container);
  
    // ✅ keep accent 1/2 after white letters/nav if that’s what you want
    addWillemAccentColorAfter(tl, container);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    initWillemLoadingAnimation();
  });
  



  // lllllllllllllllllllllllll

  // ========== MOBILE MENU ==========
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const header = document.getElementById('header');

menuBtn.addEventListener('click', function() {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    header.classList.add('scrolled');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a, .order-btn').forEach(link => {
    link.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});


// ========== STICKY HEADER ==========
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        if (!menuBtn.classList.contains('active')) {
            header.classList.remove('scrolled');
        }
    }
});


// ========== TESTIMONIAL CAROUSEL ==========
const testimonials = [
    {
        text: "The best döner I've had outside of Istanbul. Authentic flavors and the staff treats you like family!",
        author: "— Sarah M.",
        source: "Google Review"
    },
    {
        text: "Fresh ingredients, generous portions, and incredible baklava. This place is a hidden gem in Bentonville!",
        author: "— James K.",
        source: "Yelp Review"
    },
    {
        text: "Our go-to spot for Mediterranean food. The falafel wrap is perfection and the hummus is to die for.",
        author: "— Maria L.",
        source: "Google Review"
    }
];

let currentTestimonial = 0;

function showTestimonial(index) {
    currentTestimonial = index;
    const testimonial = document.getElementById('testimonial');
    testimonial.innerHTML = `
        <p class="testimonial-text">${testimonials[index].text}</p>
        <div class="testimonial-author">${testimonials[index].author}</div>
        <div class="testimonial-source">${testimonials[index].source}</div>
    `;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-rotate testimonials every 5 seconds
setInterval(function() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// lllllllllllllllllllllllll


/**
 * Casa Döner - Social Proof Section Script
 * Handles expandable review text functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get all read more buttons
  const readMoreBtns = document.querySelectorAll('.read-more-btn');
  
  readMoreBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
          // Find the review text in the same box
          const box = btn.closest('.box');
          const reviewText = box.querySelector('.review-text');
          
          // Toggle expanded state
          const isExpanded = reviewText.classList.contains('expanded');
          
          if (isExpanded) {
              // Collapse
              reviewText.classList.remove('expanded');
              btn.textContent = 'Read more';
              btn.classList.remove('expanded');
          } else {
              // Expand
              reviewText.classList.add('expanded');
              btn.textContent = 'Show less';
              btn.classList.add('expanded');
          }
      });
  });
  
  // Optional: Add subtle entrance animation on scroll
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  // Apply initial hidden state and observe boxes
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(function(box, index) {
      box.style.opacity = '0';
      box.style.transform = 'translateY(20px)';
      box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      box.style.transitionDelay = (index * 0.08) + 's';
      observer.observe(box);
  });
});


