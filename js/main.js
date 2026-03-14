// ========================================
// AxiQuant AI - Main JavaScript
// ========================================

// Initialize EmailJS with your public key (only if emailjs is loaded)
if (typeof emailjs !== 'undefined') {
  emailjs.init('ttowYJCftsKzoSAGO');
} else {
  // Try again after window loads
  window.addEventListener('load', function() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('ttowYJCftsKzoSAGO');
    }
  });
}

// ========================================
// Mobile Menu Toggle (Enhanced with Accessibility)
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  // Create overlay element
  let menuOverlay = document.querySelector('.menu-overlay');
  if (!menuOverlay && mobileMenuBtn) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
  }

  if (mobileMenuBtn && mobileMenu) {
    
    // Function to open menu
    function openMenu() {
      mobileMenuBtn.classList.add('active');
      mobileMenu.classList.add('open');
      body.classList.add('menu-open');
      if (menuOverlay) menuOverlay.classList.add('active');
      
      // Update ARIA
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      
      // Focus first link
      setTimeout(() => {
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }, 100);
      
      console.log('Menu opened');
    }
    
    // Function to close menu
    function closeMenu() {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      body.classList.remove('menu-open');
      if (menuOverlay) menuOverlay.classList.remove('active');
      
      // Update ARIA
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      
      console.log('Menu closed');
    }
    
    // Toggle menu on button click - using multiple event types for better mobile support
    function handleMenuToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
      
      console.log('Menu button clicked, isOpen:', isOpen);
    }
    
    // Add click event
    mobileMenuBtn.addEventListener('click', handleMenuToggle);
    
    // Add touch event for better mobile support
    mobileMenuBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      handleMenuToggle(e);
    }, { passive: false });
    
    // Close menu when clicking a link - BUT allow navigation to happen
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Don't prevent default - let the link navigate
        // Just close the menu after a small delay to allow navigation
        const href = this.getAttribute('href');
        console.log('Link clicked:', href);
        
        // Close menu visually
        closeMenu();
        
        // If it's a same-page anchor link, handle it
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // For regular page links, navigation will happen naturally
      });
      
      // Handle touch events for mobile
      link.addEventListener('touchend', function(e) {
        const href = this.getAttribute('href');
        console.log('Link touched:', href);
        
        // For external page links, navigate directly
        if (href && !href.startsWith('#')) {
          // Small delay to show menu closing animation
          closeMenu();
          setTimeout(() => {
            window.location.href = href;
          }, 100);
          e.preventDefault();
        }
      }, { passive: false });
    });
    
    // Close menu when clicking overlay (but not menu content)
    if (menuOverlay) {
      menuOverlay.addEventListener('click', (e) => {
        // Only close if clicking the overlay itself, not menu items
        if (e.target === menuOverlay) {
          closeMenu();
          console.log('Overlay clicked, menu closing');
        }
      });
      
      menuOverlay.addEventListener('touchstart', (e) => {
        // Only close if touching the overlay itself
        if (e.target === menuOverlay) {
          e.preventDefault();
          closeMenu();
          console.log('Overlay touched, menu closing');
        }
      }, { passive: false });
    }
    
    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        mobileMenuBtn.focus();
        console.log('Escape pressed, menu closing');
      }
    });
    
    // Prevent clicks inside menu from closing it
    mobileMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    console.log('Mobile menu initialized');
    console.log('Mobile Menu Button found:', !!mobileMenuBtn);
    console.log('Mobile Menu found:', !!mobileMenu);
  } else {
    console.warn('Mobile menu elements not found');
    console.log('Mobile Menu Button found:', !!mobileMenuBtn);
    console.log('Mobile Menu found:', !!mobileMenu);
  }
});

// const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
// const mobileMenu = document.querySelector('.mobile-menu');
// const body = document.body;

// if (mobileMenuBtn && mobileMenu) {
//   mobileMenuBtn.addEventListener('click', () => {
//     const isOpen = mobileMenu.classList.contains('open');
    
//     // Toggle classes
//     mobileMenuBtn.classList.toggle('active');
//     mobileMenu.classList.toggle('open');
//     body.style.overflow = !isOpen ? 'hidden' : '';
    
//     // Update ARIA attributes for accessibility
//     mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
//     mobileMenu.setAttribute('aria-hidden', isOpen);
    
//     // Focus first link when menu opens
//     if (!isOpen) {
//       const firstLink = mobileMenu.querySelector('a');
//       if (firstLink) {
//         setTimeout(() => firstLink.focus(), 100);
//       }
//     }
//   });

//   // Close mobile menu when clicking a link
//   document.querySelectorAll('.mobile-nav-link').forEach(link => {
//     link.addEventListener('click', () => {
//       mobileMenuBtn.classList.remove('active');
//       mobileMenu.classList.remove('open');
//       body.style.overflow = '';
      
//       // Update ARIA attributes
//       mobileMenuBtn.setAttribute('aria-expanded', 'false');
//       mobileMenu.setAttribute('aria-hidden', 'true');
//     });
//   });
  
//   // Close menu with Escape key
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
//       mobileMenuBtn.classList.remove('active');
//       mobileMenu.classList.remove('open');
//       body.style.overflow = '';
      
//       // Update ARIA and return focus to button
//       mobileMenuBtn.setAttribute('aria-expanded', 'false');
//       mobileMenu.setAttribute('aria-hidden', 'true');
//       mobileMenuBtn.focus();
//     }
//   });
  
//   // Close menu when clicking outside
//   document.addEventListener('click', (e) => {
//     if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
//       if (mobileMenu.classList.contains('open')) {
//         mobileMenuBtn.classList.remove('active');
//         mobileMenu.classList.remove('open');
//         body.style.overflow = '';
//         mobileMenuBtn.setAttribute('aria-expanded', 'false');
//         mobileMenu.setAttribute('aria-hidden', 'true');
//       }
//     }
//   });
// }

// ========================================
// Header Scroll Effect
// ========================================

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ========================================
// Active Nav Link (Enhanced with ARIA)
// ========================================

const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentLocation || (href === 'index.html' && currentLocation === '')) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// ========================================
// Scroll Animations
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .service-card, .benefit-card, .value-card').forEach(el => {
  observer.observe(el);
});

// ========================================
// Contact Form with EmailJS (Enhanced with Accessibility)
// ========================================
let formSubmitted = false;

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  // Real-time form validation
  const formFields = contactForm.querySelectorAll('input[required], textarea[required]');
  
  formFields.forEach(field => {
    // Only validate after user has interacted with the field
    field.addEventListener('blur', () => {
      // Only show errors after first submit attempt OR if field has been filled
      if (formSubmitted || field.value.trim()) {
        validateField(field, true);
      }
    });
    
    // Clear error on input if field was previously invalid
    field.addEventListener('input', () => {
      if (field.classList.contains('input-error')) {
        validateField(field, true);
      }
    });
  });
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Set flag to show errors from now on
    formSubmitted = true;
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    
    // Validate all required fields
    let isValid = true;
    formFields.forEach(field => {
      if (!validateField(field, true)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      // Focus first error field
      const firstError = contactForm.querySelector('.input-error');
      if (firstError) {
        firstError.focus();
        announceToScreenReader('Please correct the errors in the form');
      }
      return;
    }
    
    // Rest of your form submission code stays the same...
    // Hide any previous messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    announceToScreenReader('Sending message, please wait');
    
    // Get form data
    const templateParams = {
      from_name: contactForm.from_name.value,
      from_email: contactForm.from_email.value,
      company: contactForm.company ? contactForm.company.value : 'Not provided',
      subject: contactForm.subject.value,
      message: contactForm.message.value
    };
    
    // Send email via EmailJS
    emailjs.send('service_8iub6d9', 'template_6zzmzpm', templateParams)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        if (successMsg) {
          successMsg.style.display = 'flex';
          successMsg.setAttribute('role', 'alert');
          announceToScreenReader('Message sent successfully! We will get back to you soon.');
          
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
        
        // Reset form and clear validation
        contactForm.reset();
        formSubmitted = false; // Reset flag
        formFields.forEach(field => {
          field.classList.remove('input-error', 'input-success');
          field.setAttribute('aria-invalid', 'false');
          
          // Clear error messages
          const errorSpan = field.parentElement.querySelector('.error-message');
          if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.style.display = 'none';
          }
        });
        
        submitBtn.disabled = false;
        submitBtn.setAttribute('aria-busy', 'false');
        submitBtn.innerHTML = originalText;
      })
      .catch(function(error) {
        console.error('FAILED...', error);
        
        // Show error message
        if (errorMsg) {
          errorMsg.style.display = 'flex';
          errorMsg.setAttribute('role', 'alert');
          errorMsg.textContent = 'Failed to send message. Please try again or email us directly at info@axiquantai.com';
          announceToScreenReader('Failed to send message. Please try again.');
        }
        
        submitBtn.disabled = false;
        submitBtn.setAttribute('aria-busy', 'false');
        submitBtn.innerHTML = originalText;
      });
  });
}

// ========================================
// Form Validation Function
// ========================================

function validateField(field, showError = true) {
  const value = field.value.trim();
  const fieldName = field.labels && field.labels[0] ? field.labels[0].textContent.replace('*', '').trim() : 'This field';
  let errorMessage = '';
  
  // Check if required field is empty
  if (field.hasAttribute('required') && !value) {
    errorMessage = `${fieldName} is required`;
  }
  // Check email format
  else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Update field state
  if (errorMessage && showError) {
    field.classList.add('input-error');
    field.classList.remove('input-success');
    field.setAttribute('aria-invalid', 'true');
    
    // Show error message
    let errorSpan = field.parentElement.querySelector('.error-message');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'error-message';
      errorSpan.setAttribute('role', 'alert');
      field.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = errorMessage;
    errorSpan.style.display = 'flex';
    
    return false;
  } else if (!errorMessage) {
    field.classList.remove('input-error');
    if (value) {
      field.classList.add('input-success');
    }
    field.setAttribute('aria-invalid', 'false');
    
    // Hide error message
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
    
    return true;
  }
  
  return !errorMessage;
}

// ========================================
// Screen Reader Announcements
// ========================================

function announceToScreenReader(message, priority = 'polite') {
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = message;
  
  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

// ========================================
// Smooth Scroll for Anchor Links (Enhanced)
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      // Smooth scroll
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Set focus for keyboard users
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus();
        
        // Remove tabindex after focus
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }, 500);
    }
  });
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================

function initKeyboardNavigation() {
  // Show focus outline only when using keyboard
  let usingMouse = false;
  
  document.addEventListener('mousedown', () => {
    usingMouse = true;
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingMouse = false;
    }
  });
  
  // Arrow key navigation for main menu
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    const links = navMenu.querySelectorAll('.nav-link');
    
    links.forEach((link, index) => {
      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && links[index + 1]) {
          e.preventDefault();
          links[index + 1].focus();
        }
        if (e.key === 'ArrowLeft' && links[index - 1]) {
          e.preventDefault();
          links[index - 1].focus();
        }
      });
    });
  }
}

// ========================================
// Detect User Preferences
// ========================================

function detectUserPreferences() {
  // Reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.body.classList.add('reduce-motion');
  }
  
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  });
  
  // High contrast
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
  
  if (prefersHighContrast.matches) {
    document.body.classList.add('high-contrast');
  }
  
  prefersHighContrast.addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  });
}

// ========================================
// Initialize Accessibility Features
// ========================================

function initAccessibility() {
  initKeyboardNavigation();
  detectUserPreferences();
  
  console.log('✅ Accessibility features initialized');
}

// ========================================
// Initialize Everything on DOM Ready
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
  initAccessibility();
}

// ========================================
// Loading Spinner Animation
// ========================================

const style = document.createElement('style');
style.textContent = `
  .loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(10, 14, 26, 0.3);
    border-top-color: var(--bg-primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 0.5rem;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ========================================
// Theme Switcher
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeDropdown = document.getElementById('theme-dropdown');
  const themeOptions = document.querySelectorAll('.theme-option');
  
  if (!themeToggle) return; // Exit if no theme switcher on page
  
  // Load saved theme
  const savedTheme = localStorage.getItem('axiquant-theme') || 'dark';
  applyTheme(savedTheme);
  
  // Toggle dropdown
  themeToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    themeDropdown.classList.toggle('open');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    themeDropdown.classList.remove('open');
  });
  
  // Handle theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', function() {
      const theme = this.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('axiquant-theme', theme);
      themeDropdown.classList.remove('open');
    });
  });
  
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Update active state
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.theme === theme);
    });
    
    // Update meta theme-color
    const metaColor = document.querySelector('meta[name="theme-color"]');
    if (metaColor) {
      const colors = { dark: '#0a0e1a', light: '#ffffff', ocean: '#f0f9ff', warm: '#fffbeb', midnight: '#0f0a1e' };
      metaColor.setAttribute('content', colors[theme] || '#0a0e1a');
    }
  }
  
  console.log('✅ Theme switcher initialized');
});
// ── Live Demos Dropdown ──────────────────────────────
(function() {
    const toggle   = document.getElementById('demos-toggle');
    const dropdown = document.getElementById('demos-dropdown');

    if (!toggle || !dropdown) return;

    // Toggle on button click
    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', function() {
        dropdown.classList.remove('open');
    });

    // Prevent closing when clicking inside dropdown
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
})();

// ========================================
// Console Welcome Message
// ========================================

console.log('%cAxiQuant AI', 'font-size: 24px; font-weight: bold; color: #d4a574;');
console.log('%cPowering Decisions with Engineered Intelligence', 'font-size: 14px; color: #9ca3af;');
console.log('%cWebsite: https://axiquantai.com', 'color: #3b82f6;');