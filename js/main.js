// AOS
AOS.init({
  duration: 1000,
})

jQuery(document).ready(function($){
  'use strict';

  
  // Animsition
  $(".animsition").animsition();
  
  // Scrollax
  $.Scrollax();

  // Smooth scroll
  var $root = $('html, body');

  $('a.js-smoothscroll[href^="#"]').click(function () {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top - 40
    }, 500);

    return false;
  });

  // Owl
  $('.wide-slider').owlCarousel({
    loop:true,
    autoplay: true,
    margin:10,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav:true,
    autoplayHoverPause: false,
    items: 1,
    autoheight: true,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:1,
        nav:false
      },
      1000:{
        items:1,
        nav:true
      }
    }
  });

  // Show menu 
  if ($(window).width() > 768 ) {
    $('body').removeClass('menu-open');
    $('.js-templateux-menu').css('display', 'block');
  }
  // Window Resize
  $(window).resize(function(){
    var $this = $(this);
    $('.js-templateux-menu li').removeClass('staggard');
    $('.js-toggle-menu').removeClass('is-active');
    if ($this.width() > 768 ) {
      $('body').removeClass('menu-open');
      $('.js-templateux-menu').css('display', 'block');
      
    } else {
      if ($this.width() < 768 ) {
        $('.js-templateux-menu').css('display', 'none');
      }
    }
  });

  // Hamburger Button 
  $('.js-toggle-menu').on('click', function(e){
  	e.preventDefault();
  	
    var $this = $(this);

    if ($('body').hasClass('menu-open')) {
      $this.removeClass('is-active');
      $('body').removeClass('menu-open');  
      $('.js-templateux-menu li').removeClass('staggard');
    } else {
      $this.addClass('is-active');
      $('body').addClass('menu-open');  

      $('.js-templateux-menu li').each(function(k){
        var $this = $(this);
        setTimeout(function(){
          $this.addClass('staggard');
        }, 100 * k );
      });

    }

  	if ( $('.templateux-menu').is(':visible') ) {
  		$('.js-templateux-menu').fadeOut(300);
  	} else {
  		$('.js-templateux-menu').fadeIn(300);
  	}
  })
});
$$.controller('mail', function($scope, $http, $language) {
    $scope.send = function() {
        var message = $('div[contenteditable]').html();

        var data = {
            name: $scope.name,
            email: $scope.email,
            message: message,
        };

        $http.get('/mail', { params: data }).then(function(d) {
            var message;
            if (d.data.is_success) {
                switch ($language.lang) {
                    case 'kor':
                        message = '이메일 전송 완료.';
                        break;
                    case 'eng':
                        message = 'E-Mail sending complete.';
                        break;
                }

                
                $scope.name = '';
                $scope.email = '';
                
                $('div[contenteditable]').empty();
            }
            else {
                switch ($language.lang) {
                    case 'kor':
                        message = '이메일 전송 실패. 다시 시도해주세요.';
                        break;
                    case 'eng':
                        message = 'E-Mail sending failed. Please try again.';
                        break;
                }
            }

            alert(message);
        });
    };
});