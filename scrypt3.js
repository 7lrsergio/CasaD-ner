/**
 * ============================================
 * Casa Doner - About Page JavaScript
 * ============================================
 */

// ============================================
// CONFIGURATION
// ============================================

const WEB3FORMS_KEY = '81c9f8df-7dee-41db-a9d2-2fd9eb861691';

/**
 * =============================================
 * EDIT THIS EMAIL TO SEND REQUESTS TO OWNER
 * =============================================
 * Change this to the owner's actual email address.
 */
const OWNER_EMAIL = 'srgl2179@gmail.com'; // <-- CHANGE TO OWNER'S REAL EMAIL


// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  const cateringForm = document.getElementById('cateringForm');
  const formSuccess = document.getElementById('formSuccess');
  const eventDateInput = document.getElementById('eventDate');

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  eventDateInput.setAttribute('min', today);


  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================

  cateringForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      eventDate: document.getElementById('eventDate').value,
      eventType: document.getElementById('eventType').value,
      guestCount: document.getElementById('guestCount').value,
      message: document.getElementById('message').value.trim()
    };

    if (!validateForm(formData)) return;

    const submitBtn = cateringForm.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const success = await sendToWeb3Forms(formData);

    if (success) {
      showSuccessMessage();
      setTimeout(() => cateringForm.reset(), 1000);
    } else {
      alert('Something went wrong. Please call us directly at (479) 555-0123.');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
    }
  });


  // ============================================
  // SEND VIA WEB3FORMS
  // ============================================

  async function sendToWeb3Forms(data) {
    const eventDate = new Date(data.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const payload = {
      access_key: WEB3FORMS_KEY,
      to: OWNER_EMAIL,
      subject: `New Catering Request - ${data.name}`,
      from_name: 'Casa Doner Website',
      name: data.name,
      email: data.email,
      phone: data.phone,
      event_date: formattedDate,
      event_type: data.eventType || 'Not specified',
      guest_count: data.guestCount,
      message: data.message || 'None provided'
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      return result.success === true;

    } catch (err) {
      console.error('Web3Forms error:', err);
      return false;
    }
  }


  // ============================================
  // FORM VALIDATION
  // ============================================

  function validateForm(data) {
    if (!data.name || !data.email || !data.phone || !data.eventDate || !data.guestCount) {
      alert('Please fill in all required fields.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (parseInt(data.guestCount) < 10) {
      alert('Minimum guest count is 10.');
      return false;
    }

    const selectedDate = new Date(data.eventDate);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (selectedDate < todayDate) {
      alert('Please select a future date for your event.');
      return false;
    }

    return true;
  }


  // ============================================
  // SUCCESS MESSAGE
  // ============================================

  function showSuccessMessage() {
    cateringForm.style.display = 'none';
    formSuccess.classList.add('show');
  }


  // ============================================
  // INPUT FOCUS ANIMATIONS
  // ============================================

  const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

  inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });

});