// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuIcon = document.querySelector('.menu-icon');
    
    if(menuIcon) {
        menuIcon.addEventListener('click', function() {
            menuToggle.checked = !menuToggle.checked;
        });
    }
    
    // Modal functionality
    const registerBtn = document.getElementById('registerNowBtn');
    const modal = document.getElementById('registerModal');
    const closeBtn = document.querySelector('.closeBtn');
    
    if(registerBtn && modal) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    }
    
    if(closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if(e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
    
    // Enable form button when inputs are filled
    const continueBtn = document.getElementById('continueBtn');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    
    function checkInputs() {
        if (usernameInput.value.trim() !== '' && emailInput.value.trim() !== '') {
            continueBtn.disabled = false;
            continueBtn.style.cursor = 'pointer';
            continueBtn.style.backgroundColor = '#ff6600';
        } else {
            continueBtn.disabled = true;
            continueBtn.style.cursor = 'not-allowed';
            continueBtn.style.backgroundColor = '#666';
        }
    }
    
    if(usernameInput && emailInput && continueBtn) {
        usernameInput.addEventListener('input', checkInputs);
        emailInput.addEventListener('input', checkInputs);
        checkInputs(); // Initial check
    }
    
    // Initialize carousels
    if(typeof $ !== 'undefined') {
        $('.hero-carousel').slick({
            autoplay: true,
            dots: true,
            arrows: false,
            autoplaySpeed: 3000
        });
        
        $('.games-container').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
});