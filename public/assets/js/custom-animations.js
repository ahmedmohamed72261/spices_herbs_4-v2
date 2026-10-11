// Initialize AOS animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });
});

// Function to update WhatsApp floating icon with correct number
function updateWhatsAppIcon() {
  const whatsappNumber = "2001021500622"; // Egypt country code (20) + number
  const whatsappLink = document.querySelector(".whatsapp-float");
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${whatsappNumber}`;
  }
}

// Add AOS attributes to elements that should be animated
function addAOSAttributes() {
  // Common sections to animate
  const sections = [
    { selector: ".hero-section, .slider-section", attr: "fade-up", delay: "0" },
    { selector: ".about-section", attr: "fade-right", delay: "100" },
    { selector: ".services-section", attr: "fade-left", delay: "100" },
    { selector: ".products-section", attr: "fade-up", delay: "200" },
    { selector: ".testimonial-section", attr: "fade-in", delay: "100" },
    { selector: ".contact-section", attr: "zoom-in", delay: "100" },
    { selector: ".footer-section", attr: "fade-up", delay: "0" },
    { selector: ".section-title", attr: "fade-up", delay: "0" },
    { selector: ".product-card", attr: "fade-up", delay: "" },
  ];

  // Apply AOS attributes to each section
  sections.forEach((section) => {
    const elements = document.querySelectorAll(section.selector);
    elements.forEach((el, index) => {
      el.setAttribute("data-aos", section.attr);
      if (section.delay) {
        const calculatedDelay = parseInt(section.delay) + index * 100;
        el.setAttribute("data-aos-delay", calculatedDelay.toString());
      }
    });
  });
}

// Call this function after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  addAOSAttributes();
  updateWhatsAppIcon();
});
