'use strict';

$(function () {

	// Search
	if ($('.search').length) {
		let searchBtn = $('.header__search');
		let searchPopup = $('.search');
		let searchInner = $('.search__inner');

		searchBtn.on('click', function (e) {
			e.preventDefault();
			searchPopup.removeClass('is-hidden');
		});

		searchInner.on('click', function (e) {
			e.stopPropagation();
		});

		searchPopup.on('click', function () {
			searchPopup.addClass('is-hidden');
		});
	}

	// Burger & mobile menu
	if ($('.burger').length) {
		let burgerWrap = $('.burger');
		let burgerToggle = $('.burger__toggle');
		let mobileMenu = $('.mobile-menu');
		let mobileMenuLink = $('.mobile-menu a');
		let mobileMenuClose = $('.mobile-menu__close');

		burgerWrap.on('click', function (e) {
			burgerToggle.addClass('is-active');
			mobileMenu.addClass('is-active');
			e.stopPropagation();
		});

		mobileMenuClose.on('click', function (e) {
			burgerToggle.removeClass('is-active');
			mobileMenu.removeClass('is-active');
			e.stopPropagation();
		});

		mobileMenu.on('click', function (e) {
			e.stopPropagation();
		});

		mobileMenuLink.on('click', function () {
			burgerToggle.removeClass('is-active');
			mobileMenu.removeClass('is-active');
		});

		$(document).on('click', function () {
			burgerToggle.removeClass('is-active');
			mobileMenu.removeClass('is-active');
		});

	}

	// Login popup
	if ($('.login-popup').length) {
		let loginPopup = $('.login-popup');
		let loginPopupInner = $('.login__inner');
		let loginButtonOpen = $('.mobile-menu__top-link');
		let loginHeaderButton = $('.header__login-btn');
		let loginButtonClose = $('.login-popup__close span');
		let popupToggle = $('.login-new-account');

		loginButtonOpen.on('click', function (e) {
			loginPopup.removeClass('is-hidden');
			e.preventDefault();
		});

		loginHeaderButton.on('click', function (e) {
			loginPopup.removeClass('is-hidden');
			e.preventDefault();
		});

		loginButtonClose.on('click', function () {
			loginPopup.addClass('is-hidden');
		});

		popupToggle.on('click', function (e) {
			loginPopupInner.toggleClass('is-hidden');
			e.preventDefault();
		});
	}

	// Scroll to top
	if ($('.scrollup').length) {
		let scrollBtn = $('.scrollup');
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 50) {
				scrollBtn.removeClass('scrollup__hide');
			} else {
				scrollBtn.addClass('scrollup__hide');
			}
		});
		scrollBtn.on('click', function (e) {
			e.preventDefault();
			$('body,html').animate({ scrollTop: 0 }, 500);
		});
	}

	// Flights table tabs
	if ($('.flights').length) {
		let tableWrap = $('.flights__table-wrap');
		let tableTab = $('.flights__table-tabs span');

		tableTab.on('click', function () {
			if (!$(this).hasClass('is-active')) {
				tableTab.removeClass('is-active');
				$(this).addClass('is-active');
				tableWrap.slideToggle();
			} else {
				return false;
			}
		})
	}

	// Scores sliders 
	if ($('.scores').length) {
		const swiper = new Swiper('.scores__main-slider', {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: '.sw-p',
				prevEl: '.sw-n',
			},
		});

		let sliderBtn = $('.slide-btn');

		sliderBtn.on('click', function () {
			let id = this.id;
			sliderBtn.removeClass('is-active');
			$(this).addClass('is-active');
			swiper.slideTo(id);
		});

		const swiper1 = new Swiper('.scores__sidebar-slider', {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			navigation: {
				nextEl: '.sw-p1',
				prevEl: '.sw-n1',
			},
		});

	}

	// Custom select
	if ($('.custom-select').length) {
		let customSelect = $(".custom-select");
		let searchInner = $('.search__inner');

		customSelect.each(function () {
			let thisCustomSelect = $(this),
				options = thisCustomSelect.find("option"),
				optionsNotFirst = thisCustomSelect.find("option:not('.hidden')"),
				firstOptionText = options.first().text();


			let selectedItem = $("<div></div>", {
				class: "custom-select__selected"
			})
				.appendTo(thisCustomSelect)
				.text(firstOptionText);

			let allItems = $("<div></div>", {
				class: "custom-select__list is-hide"
			}).appendTo(thisCustomSelect);

			optionsNotFirst.each(function () {
				let that = $(this),
					optionText = that.text();

				let item = $("<div></div>", {
					class: "custom-select__item",
					on: {
						click: function () {
							let selectedOptionText = that.text();
							selectedItem.text(selectedOptionText).removeClass("is-active");
							allItems.addClass("is-hide");
						}
					}
				})
					.appendTo(allItems)
					.text(optionText);
			});
		});

		let selectedItem = $(".custom-select__selected"),
			allItems = $(".custom-select__list");

		selectedItem.on("click", function (e) {
			let currentSelectedItem = $(this),
				currentAllItems = currentSelectedItem.next(".custom-select__list");

			allItems.not(currentAllItems).addClass("is-hide");
			selectedItem.not(currentSelectedItem).removeClass("is-active");

			currentAllItems.toggleClass("is-hide");
			currentSelectedItem.toggleClass("is-active");

			e.stopPropagation();
		});

		function removeActiveList() {
			$(".custom-select__list:not(.is-hide)").addClass("is-hide");
			selectedItem.removeClass("is-active");
		}


		$(document).on("click", function () {
			removeActiveList();
		});

		searchInner.on("click", function () {
			removeActiveList();
		});
	}

	// Show more matches
	if ($('.scores').length) {
		let matchesToggler = $('.scores__hidden-toggler');
		let hiddenMatches = $('.scores__next-item.is-hidden');

		matchesToggler.on('click', function () {
			$(this).toggleClass('is-active');
			hiddenMatches.slideToggle(300);
		});
	}

	// Flights 
	if ($('.flights').length) {
		// Flights trip option
		let box = $('#flights-select-wrap');
		let listLi = $('#flights-select-wrap .custom-select__item');

		listLi.on('click', function () {
			let optClass = $(this).text().toLowerCase();

			box.removeAttr('class');
			box.addClass(optClass);
		});

		// Flights number of persons
		let personCounter = $('.flights__form-person');
		let personCounterInput = $('.flights__form-counter');
		let personCounterPopup = $('.flights__form-popup');
		let personCounterPopupInput = $('.flights__form-popup .person-counter');

		personCounter.on('click', function (e) {
			$(this).toggleClass('is-active');
			personCounterPopup.fadeToggle();
			e.stopPropagation();
		});

		personCounterPopupInput.on('click', function (e) {
			e.stopPropagation();
		});

		$(document).on("click", function () {
			personCounter.removeClass('is-active');
			personCounterPopup.fadeOut();
		});

		$('.num-in span').click(function () {
			var $input = $(this).parents('.flights__form-person').find('.person-counter');
			if ($(this).hasClass('minus')) {
				var count = parseFloat($input.val()) - 1;
				count = count < 1 ? 1 : count;
				if (count < 2) {
					$(this).addClass('dis');
				}
				else {
					$(this).removeClass('dis');
				}
				$input.val(count);
			}
			else {
				var count = parseFloat($input.val()) + 1
				$input.val(count);
				if (count > 1) {
					$(this).parents('.num-block').find(('.minus')).removeClass('dis');
				}
			}

			$input.change();
			return false;
		});

		// Flights filter
		let filterBtn = $('.flights__filter-btn');
		let filterTable = $('.flights__filter-table');

		filterBtn.on('click', function () {
			filterTable.slideDown();
		});
	}

	// Share button 
	if ($('.share-button').length) {
		let shareButton = $('.share-button');
		let shareBox = $('.share-block');

		shareButton.on('click', function () {
			shareBox.fadeToggle();
		});
	}

});


