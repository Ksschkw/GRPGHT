$(document).ready(function(){
    $('.hero-carousel').slick({
        autoplay: true,
        dots: true,
        arrows: false
    });
    $('.games-container').slick({ 
        infinite: true, 
        slidesToShow: 3, 
        slidesToScroll: 1, 
        arrows: true 
    });
    $('.faq-question').on('click', function() { 
        $(this).next('.faq-answer').slideToggle(); 
        $(this).toggleClass('active'); 
    });

    // Modal functionality 
    var modal = document.getElementById("registerModal"); 
    var joinBtn = document.getElementById("joinNowBtn"); 
    var regBtn = document.getElementById("registerNowBtn"); 
    var span = document.getElementsByClassName("closeBtn")[0]; 
    joinBtn.onclick = function() { 
        modal.style.display = "block"; 
    } 
    regBtn.onclick = function() { 
        modal.style.display = "block"; 
    } 
    span.onclick = function() { 
        modal.style.display = "none"; 
    } 
    window.onclick = function(event) { 
        if (event.target == modal) { 
            modal.style.display = "none"; 
        } 
    }

    // Enable the continue button only when both fields are filled 
    var continueBtn = document.getElementById("continueBtn"); 
    var usernameInput = document.getElementById("username"); 
    var emailInput = document.getElementById("email"); 

    function checkInputs() { 
        if (usernameInput.value !== "" && emailInput.value !== "") { 
            continueBtn.disabled = false; 
        } else { 
            continueBtn.disabled = true; 
        } 
    } 
    usernameInput.addEventListener("input", checkInputs); 
    emailInput.addEventListener("input", checkInputs);

    // Handle form submission
    $('#registerForm').on('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission
        
        const formData = {
            username: $('#username').val(),
            email: $('#email').val()
        };
        
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Data Submitted Successfully!');
                modal.style.display = "none";  // Close the modal on success
            } else {
                alert('Error submitting data.');
            }
        })
        .catch(error => {  // Option 1: Using the error parameter
            console.error('Error submitting data:', error);
            alert('Error submitting data.');
        });
    });
});
