$(document).on('ready', function(){
	$('.tab-nav a').on('click', function(e){
		e.preventDefault()

		$('.tab-nav a').removeClass('active')
		$(this).addClass('active')

		$('.tab-content').hide()
		$($(this).attr('href')).show()
	})

	$('.search-input').on('keyup', function(e){
		$('.search-input').val($(this).val())
		// AJAX REQUEST HERE
	})

	$('.main-search').on('keyup focus', function(e){
		if($(this).val() !== ""){
			showModal()
		}
	})

	$('.search-fade, .search-close').on('click', function(e){
		e.preventDefault()
		hideModal()
	})

	var showModal = function(){
		$('.search-dialog').fadeIn()
		$('.search-fade').fadeIn()

		$('.search-dialog .search-input').focus()
	}

	var hideModal = function(){
		$('.search-dialog').fadeOut()
		$('.search-fade').fadeOut()
	}

	var ratingCallback = function(rating) {
		$(this).parent().find('.rating-word').text(ratingText(rating))
	}

	var ratingText = function(rating) {
		if(rating === 1)
			return 'Жуть'
		if(rating === 2)
			return 'Плохо'
		if(rating === 3)
			return 'Нормально'
		if(rating === 4)
			return 'Хорошо'
		if(rating === 5)
			return 'Отлично'
	}

	$('.dynamic-rating').each(function(){
		rating(this, 0, 5, ratingCallback.bind(this), false)
	})

	$('[data-current-rating]').each(function(){
		var rate = $(this).data('current-rating');
		rating(this, rate, 5, null, true)
		$(this).parent().find('.rating-word').text(ratingText(rate))
	});

	$('[data-dynamic-rating]').each(function() {
		var self = $(this),
			selfData = +self.data('dynamic-rating') - 1;

		$(this).parent().find('.rating-word').text(ratingText(selfData))

		self.children().each(function(i, e) {
			if(selfData == i) {
				var rate = $('.testimonial-block .rate');

				rate.attr('data-current-rating', +selfData);
				rate.find('li').removeClass('is-active');
				for(var i = 0; i < +selfData + 1; i++) {
					rate.find('li').eq(i).addClass('is-active');
				}

				$("input[name='rat']")
					.val(+selfData + 1)
					.prop('checked', true);

				$(e).trigger('click');
			}
		});
	});

	$('.js-mobile-footer').on('click', function(){
		$(this).closest('.footer-menu').toggleClass('active');
	})

	$('.js-mobile-menu').on('click', function(){
		$(this).toggleClass('active');
		$('.js-nav').toggleClass('active');
	})

	$('.js-more-link').on('click', function(e){
		e.preventDefault();

		if($(this).hasClass('active')){
			$('.js-hide-text').slideUp();
			$(this).text('Читать далее');
			$(this).removeClass('active');
		} else {
			$('.js-hide-text').slideDown();
			$(this).text('Свернуть');
			$(this).addClass('active');
		}
	})
});

