(function ($) {
	"use strict";

	var $window = $(window);
	var $body = $('body');

	/* Preloader Effect */
	$window.on('load', function () {
		$(".preloader").fadeOut(600);
	});

	/* Slick Menu */
	$('#menu').slicknav({
		label: '',
		prependTo: '.responsive-menu'
	});


	/* Jackpot Init Counter */
	var $counter = $('#counter-number');
	if ($counter.length) {
		// var cstart = parseFloat($counter.attr('data-start'));
		// var cend = parseFloat($counter.attr('data-end'));
		var cdecimals = parseInt($counter.attr('data-decimals'));
		var cduration = parseInt($counter.attr('data-duration'));
		const options = {
			startVal: cstart,
			decimalPlaces: cdecimals,
			duration: cduration,
			useEasing: false,
		};
		let demo = new countUp.CountUp('counter-number', cend, options);
		if (!demo.error) {
			demo.start();
		} else {
			console.error(demo.error);
		}
	}

	/* Init Counter */
	$('.counter').counterUp({ delay: 6, time: 3000 });

	/* Testimonial Slider */
	var swiper = new Swiper(".testimonial-slider", {
		slidesPerView: 1,
		spaceBetween: 20,
		autoplay: true,
		loop: true,
		speed: 750,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			991: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
	});

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({ focus: false }).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm() {
		/* Initiate Variables With Form Content*/
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var message = $("#msg").val();

		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message,
			success: function (text) {
				if (text == "success") {
					formSuccess();
				} else {
					submitMSG(false, text);
				}
			}
		});
	}

	function formSuccess() {
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Animated Wow Js */
	new WOW().init();

})(jQuery);