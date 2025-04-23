document.addEventListener("DOMContentLoaded", () => {
    // Initialize all components
    initMobileMenu()
    initThemeToggle()
    initScrollAnimations()
    initCounters()
    initTestimonialSlider()
    initModal()
    initPledgeForm()
    initReportForm()
  })
  
  // Mobile Menu Toggle
  function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle")
    const nav = document.getElementById("main-nav")
  
    if (!menuToggle || !nav) return
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      nav.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav__link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        nav.classList.remove("active")
      })
    })
  }
  
  // Theme Toggle
  function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")
    const themeWrapper = document.querySelector(".theme-wrapper")
    const icon = themeToggle.querySelector("i")
  
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      themeWrapper.setAttribute("data-theme", "dark")
      icon.classList.replace("fa-moon", "fa-sun")
    }
  
    themeToggle.addEventListener("click", () => {
      const currentTheme = themeWrapper.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
  
      themeWrapper.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
  
      // Toggle icon
      if (newTheme === "dark") {
        icon.classList.replace("fa-moon", "fa-sun")
      } else {
        icon.classList.replace("fa-sun", "fa-moon")
      }
    })
  }
  
  // Scroll Animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll("[data-aos]")
  
    const checkInView = () => {
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("aos-animate")
        }
      })
    }
  
    // Initial check
    checkInView()
  
    // Check on scroll
    window.addEventListener("scroll", checkInView)
  }
  
  // Number Counters Animation
  function initCounters() {
    const counters = document.querySelectorAll(".stat-card__number")
  
    const animateCounter = (counter, target) => {
      let count = 0
      const speed = 2000 / target // Adjust speed based on target value
  
      const updateCount = () => {
        const increment = target / (2000 / 30) // Increment based on 30fps
  
        if (count < target) {
          count += increment
          counter.innerText = Math.ceil(count)
          requestAnimationFrame(updateCount)
        } else {
          counter.innerText = target
        }
      }
  
      updateCount()
    }
  
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          animateCounter(counter, target)
          observer.unobserve(counter)
        }
      })
    }
  
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    })
  
    counters.forEach((counter) => {
      observer.observe(counter)
    })
  }
  
  // Testimonial Slider
  function initTestimonialSlider() {
    const testimonials = document.querySelectorAll(".testimonial-card")
    const dots = document.querySelectorAll(".testimonial-slider__dot")
    const prevBtn = document.getElementById("prev-testimonial")
    const nextBtn = document.getElementById("next-testimonial")
  
    if (!testimonials.length || !dots.length || !prevBtn || !nextBtn) return
  
    let currentIndex = 0
  
    const showTestimonial = (index) => {
      testimonials.forEach((testimonial) => {
        testimonial.classList.remove("testimonial-card--active")
      })
  
      dots.forEach((dot) => {
        dot.classList.remove("testimonial-slider__dot--active")
      })
  
      testimonials[index].classList.add("testimonial-card--active")
      dots[index].classList.add("testimonial-slider__dot--active")
    }
  
    const nextTestimonial = () => {
      currentIndex = (currentIndex + 1) % testimonials.length
      showTestimonial(currentIndex)
    }
  
    const prevTestimonial = () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
      showTestimonial(currentIndex)
    }
  
    // Event listeners
    nextBtn.addEventListener("click", nextTestimonial)
    prevBtn.addEventListener("click", prevTestimonial)
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index
        showTestimonial(currentIndex)
      })
    })
  
    // Auto slide every 5 seconds
    setInterval(nextTestimonial, 5000)
  }
  
  // Modal Functionality
  function initModal() {
    const reportLinks = document.querySelectorAll('a[href="#report"]')
    const modal = document.getElementById("report-modal")
    const closeBtn = document.getElementById("close-modal")
  
    if (!modal || !closeBtn) return
  
    const openModal = (e) => {
      e.preventDefault()
      modal.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  
    const closeModal = () => {
      modal.classList.remove("active")
      document.body.style.overflow = ""
    }
  
    reportLinks.forEach((link) => {
      link.addEventListener("click", openModal)
    })
  
    closeBtn.addEventListener("click", closeModal)
  
    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal.querySelector(".modal__overlay")) {
        closeModal()
      }
    })
  
    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal()
      }
    })
  }
  
  // Pledge Form
  function initPledgeForm() {
    const pledgeForm = document.getElementById("pledge-form")
    const pledgeCount = document.getElementById("pledge-count")
  
    if (!pledgeForm || !pledgeCount) return
  
    pledgeForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Simple form validation
      const name = pledgeForm.querySelector("#name").value.trim()
      const email = pledgeForm.querySelector("#email").value.trim()
      const agree = pledgeForm.querySelector("#agree").checked
  
      if (!name || !email || !agree) {
        alert("Please fill in all fields and agree to the terms.")
        return
      }
  
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }
  
      // Simulate form submission
      pledgeForm.reset()
  
      // Update pledge count
      const currentCount = Number.parseInt(pledgeCount.textContent.replace(/,/g, ""))
      const newCount = currentCount + 1
      pledgeCount.textContent = newCount.toLocaleString()
  
      // Show success message
      alert("Thank you for taking the pledge! Together, we can make Kerala drug-free.")
  
      // Add animation to the counter
      pledgeCount.classList.add("animate-pulse")
      setTimeout(() => {
        pledgeCount.classList.remove("animate-pulse")
      }, 2000)
    })
  }
  
  // Report Form
  function initReportForm() {
    const reportForm = document.querySelector(".modal__form")
    const anonymousCheckbox = document.getElementById("anonymous")
    const contactInfoField = document.getElementById("contact-info")
  
    if (!reportForm || !anonymousCheckbox || !contactInfoField) return
  
    anonymousCheckbox.addEventListener("change", function () {
      if (this.checked) {
        contactInfoField.style.display = "none"
      } else {
        contactInfoField.style.display = "block"
      }
    })
  
    reportForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Simple form validation
      const reportType = reportForm.querySelector("#report-type").value
      const location = reportForm.querySelector("#location").value.trim()
      const description = reportForm.querySelector("#description").value.trim()
  
      if (!reportType || !location || !description) {
        alert("Please fill in all required fields.")
        return
      }
  
      // Simulate form submission
      reportForm.reset()
  
      // Close modal
      document.getElementById("report-modal").classList.remove("active")
      document.body.style.overflow = ""
  
      // Show success message
      alert("Thank you for your report. Your information will help us in our fight against drugs.")
    })
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
  
      if (href === "#") return
  
      if (href !== "#report") {
        e.preventDefault()
  
        const targetElement = document.querySelector(href)
  
        if (targetElement) {
          const headerHeight = document.querySelector(".header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })
  
  // Add active class to nav links based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav__link")
  
    let currentSection = ""
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const headerHeight = document.querySelector(".header").offsetHeight
  
      if (
        window.pageYOffset >= sectionTop - headerHeight - 100 &&
        window.pageYOffset < sectionTop + sectionHeight - headerHeight - 100
      ) {
        currentSection = section.getAttribute("id")
      }
    })
  
    navLinks.forEach((link) => {
      link.classList.remove("nav__link--active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("nav__link--active")
      }
    })
  })
  



  // Fix viewport height on mobile
function fixViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
fixViewportHeight();

