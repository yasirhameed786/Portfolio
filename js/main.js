(function ($) {
    "use strict";

    // Superfish on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });
    
    
    // Typed Initiate
    if ($('.top-header h2').length == 1) {
        var typed_strings = $('.top-header p').text();
        var typed = new Typed('.top-header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }
    
    
    // Smooth scrolling on the navbar links
    $(".nav-menu a, #mobile-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.nav-menu').length) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
            }
        }
    });


    // Stick the header at top on scroll
    $(".header").sticky({topSpacing: 0, zIndex: '50'});


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Skills section
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });


    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // START OF CONTACT FORM JAVASCRIPT (MODIFIED FOR EMAILJS)
    // Initialize EmailJS with your User ID (Public Key)
    // This is safe to expose on the client side.
    (function() {
        // IMPORTANT: Replace "YOUR_EMAILJS_USER_ID" with your actual EmailJS Public Key
        emailjs.init("wWk4cz1VvGwoTruWD"); 
    })();

    // Handle Contact Form Submission
    $("#contactForm").submit(function(e) {
        e.preventDefault(); // Prevent default form submission

        // IMPORTANT: Replace these with your actual EmailJS Service ID and Template ID
        const serviceID = 'service_oylsdwm'; 
        const templateID = 'template_i7w0ro4'; 

        const form = this; // 'this' refers to the form element
        const statusDiv = $("#mailMessage");
        const submitBtn = $("#sendMessageButton");

        // Show "Sending..." message and disable button
        statusDiv.text("Sending...").removeClass("alert-success alert-danger").addClass("alert-info").fadeIn(); // Use alert-info for sending status
        submitBtn.prop("disabled", true);
        
        // Ensure form field names (name="name", name="email", etc.) match EmailJS template variables (e.g., {{name}}).
        emailjs.sendForm(serviceID, templateID, form)
            .then(function() {
                statusDiv.text("Message sent successfully!").removeClass("alert-info").addClass("alert-success").fadeIn();
                form.reset(); // Clear the form fields
            }, function(error) {
                console.error("FAILED to send message...", error);
                statusDiv.text("Failed to send message. Please try again later.").removeClass("alert-info").addClass("alert-danger").fadeIn();
            })
            .always(function() { // .always() runs whether it's success or error
                submitBtn.text("Send Message").prop("disabled", false); // Re-enable button
            });
    });
    // END OF CONTACT FORM JAVASCRIPT (MODIFIED FOR EMAILJS)

})(jQuery);