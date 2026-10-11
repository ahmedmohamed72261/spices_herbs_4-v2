/**
 * Contact Page JavaScript
 * Handles loading contact information and form submission
 */

document.addEventListener("DOMContentLoaded", function () {
  // Load contact information immediately
  loadContactInfo();

  // Make sure ApiService is available globally
  window.ApiService = window.ApiService || window.apiService;

  // Set up form submission
  setupContactForm();
});

/**
 * Load contact information from API
 */
function loadContactInfo() {
  // Get contact elements
  const phoneElement = document.getElementById("contact-phone");
  const emailElement = document.getElementById("contact-email");
  const addressElement = document.getElementById("contact-address");

  // Set default values immediately to prevent "Loading..." text
  setFallbackContactInfo();

  // Try to get data from API
  if (typeof apiService !== "undefined" && apiService.getContactInfo) {
    apiService
      .getContactInfo()
      .then((contactInfo) => {
        // Update phone information
        if (contactInfo && contactInfo.phone) {
          phoneElement.textContent = contactInfo.phone.value;
          phoneElement.href = `tel:${contactInfo.phone.value}`;
        }

        // Update email information
        if (contactInfo && contactInfo.email) {
          emailElement.textContent = contactInfo.email.value;
          emailElement.href = `mailto:${contactInfo.email.value}`;
        }

        // Update address information
        if (contactInfo && contactInfo.address) {
          addressElement.textContent = contactInfo.address.value;
        }
      })
      .catch((error) => {
        console.error("Failed to load contact information:", error);
        // Fallback info already set
      });
  }
}

/**
 * Set fallback contact information if API fails
 */
function setFallbackContactInfo() {
  // Phone fallback
  const phoneElement = document.getElementById("contact-phone");
  if (phoneElement) {
    phoneElement.textContent = "+20 122 008 5073";
    phoneElement.href = "tel:+201021500622";
  }

  // Email fallback
  const emailElement = document.getElementById("contact-email");
  if (emailElement) {
    emailElement.textContent = "info@kingdomspicesherbs.com";
    emailElement.href = "mailto:info@kingdomspicesherbs.com";
  }

  // Address fallback
  const addressElement = document.getElementById("contact-address");
  if (addressElement) {
    addressElement.textContent = "Egypt, Beni Suef, Sumusta Al Waqf";
  }
}

/**
 * Set up contact form submission
 */
function setupContactForm() {
  const form = document.getElementById("contact-form");

  if (form) {
    // console.log('Contact form found, setting up submission handler');

    // Create message element if it doesn't exist
    let formMessages = document.querySelector(".form-message");
    if (!formMessages) {
      formMessages = document.createElement("div");
      formMessages.className = "form-message";
      form.appendChild(formMessages);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // console.log('Form submitted, processing data...');

      // Get form data
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const phoneInput = document.getElementById("phone");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      // Check if elements exist
      if (!nameInput || !emailInput || !messageInput || !subjectInput) {
        // console.error('Required form fields not found in the DOM');
        formMessages.textContent = "Form error: Required fields not found.";
        formMessages.className = "form-message error";
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Validate form
      if (!name) {
        formMessages.textContent = "Please enter your name.";
        formMessages.className = "form-message error";
        nameInput.focus();
        return;
      }

      if (!email) {
        formMessages.textContent = "Please enter your email address.";
        formMessages.className = "form-message error";
        emailInput.focus();
        return;
      }

      if (!subject) {
        formMessages.textContent = "Please enter a subject.";
        formMessages.className = "form-message error";
        subjectInput.focus();
        return;
      }

      if (!message) {
        formMessages.textContent = "Please enter your message.";
        formMessages.className = "form-message error";
        messageInput.focus();
        return;
      }

      // Create message data object
      const messageData = {
        name,
        email,
        phone,
        subject,
        message,
      };

      // Show loading state
      formMessages.textContent = "Sending message...";
      formMessages.className = "form-message";

      console.log("Sending message data to API:", messageData);

      // Direct API call without using ApiService
      fetch(
        "https://kingdom-spices-herbs-backend-dashbo.vercel.app/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        }
      )
        .then((response) => {
          // console.log('API Response:', response);
          return response.json();
        })
        .then((data) => {
          // console.log('Message sent successfully:', data);
          showSuccessMessage(form, formMessages);
        })
        .catch((error) => {
          // console.error('API error when sending message:', error);
          formMessages.textContent =
            "An error occurred while sending your message. Please try again.";
          formMessages.className = "form-message error";
        });
    });
  } else {
    console.error("Contact form not found in the DOM");
  }
}

/**
 * Show success message and reset form
 */
function showSuccessMessage(form, formMessages) {
  // Show success message in the form
  formMessages.textContent = "Your message has been sent successfully!";
  formMessages.className = "form-message success";

  // Clear the form
  form.reset();
}
