/**
 * ============================================
 * Casa Doner - About Page JavaScript
 * ============================================
 * 
 * This file handles:
 * - Catering form submission
 * - Form validation
 * - Email functionality via mailto
 * - Success message display
 */

// ============================================
// CONFIGURATION
// ============================================

/**
 * =============================================
 * EDIT THIS EMAIL ADDRESS TO RECEIVE FORM DATA
 * =============================================
 * 
 * Change the email below to your actual email address.
 * All catering requests will be sent to this email.
 */
const CATERING_EMAIL = 'catering@casadoner.com';  // <-- CHANGE THIS EMAIL


// ============================================
// DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Get form elements
  const cateringForm = document.getElementById('cateringForm');
  const formSuccess = document.getElementById('formSuccess');
  const eventDateInput = document.getElementById('eventDate');
  
  
  // ============================================
  // SET MINIMUM DATE FOR EVENT DATE PICKER
  // Users can't select dates in the past
  // ============================================
  
  const today = new Date().toISOString().split('T')[0];
  eventDateInput.setAttribute('min', today);
  
  
  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  
  cateringForm.addEventListener('submit', function(e) {
    // Prevent default form submission
    e.preventDefault();
    
    // Collect form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      eventDate: document.getElementById('eventDate').value,
      eventType: document.getElementById('eventType').value,
      guestCount: document.getElementById('guestCount').value,
      message: document.getElementById('message').value.trim()
    };
    
    // Validate form data
    if (!validateForm(formData)) {
      return;
    }
    
    // Log form data for debugging
    console.log('Catering Request Submitted:', formData);
    
    // Build email body
    const emailBody = buildEmailBody(formData);
    
    // Send email via mailto
    sendEmail(emailBody);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form after delay
    setTimeout(function() {
      cateringForm.reset();
    }, 1000);
  });
  
  
  // ============================================
  // FORM VALIDATION
  // ============================================
  
  /**
   * Validate form data before submission
   * @param {Object} data - Form data object
   * @returns {Boolean} - True if valid, false otherwise
   */
  function validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.phone || !data.eventDate || !data.guestCount) {
      alert('Please fill in all required fields.');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    
    // Validate guest count
    if (parseInt(data.guestCount) < 10) {
      alert('Minimum guest count is 10.');
      return false;
    }
    
    // Validate event date is in the future
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
  // HELPER FUNCTIONS
  // ============================================
  
  /**
   * Build email body from form data
   * @param {Object} data - Form data object
   * @returns {String} - Formatted email body
   */
  function buildEmailBody(data) {
    // Format the event date nicely
    const eventDate = new Date(data.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `
NEW CATERING REQUEST - Casa Doner
================================

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Event Details:
- Date: ${formattedDate}
- Event Type: ${data.eventType || 'Not specified'}
- Number of Guests: ${data.guestCount}

Additional Details:
${data.message || 'None provided'}

================================
Submitted via Casa Doner Website
    `.trim();
  }
  
  
  /**
   * Send email using mailto link
   * Opens the user's email client with pre-filled data
   * @param {String} body - Email body content
   */
  function sendEmail(body) {
    const subject = encodeURIComponent('New Catering Request - Casa Doner');
    const encodedBody = encodeURIComponent(body);
    
    // Open email client with pre-filled data
    window.location.href = `mailto:${CATERING_EMAIL}?subject=${subject}&body=${encodedBody}`;
  }
  
  
  /**
   * Show success message and hide form
   */
  function showSuccessMessage() {
    cateringForm.style.display = 'none';
    formSuccess.classList.add('show');
  }
  
  
  // ============================================
  // INPUT ANIMATIONS - Add focus effects
  // ============================================
  
  const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  inputs.forEach(function(input) {
    // Add focus animation class
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    // Remove focus animation class
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
});
