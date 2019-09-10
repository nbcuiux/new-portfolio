(function () {
  'use strict';

  /* Controllers */


  angular.module('myApp.controllers', [])
  .controller('mainController', ['$scope', '$state', '$timeout', '$location', function($scope, $state, $timeout, $location) {

   $scope.home = false;
   $scope.american = false;
   $scope.jurassic = false;
   $scope.lorax = false;
   $scope.cnbc = false;
   $scope.chiller = false;
   $scope.concerto = false;
   $scope.rationalized = false;
   $scope.syfy = false;
   $scope.universal = false;
   $scope.mvpd = false;
   $scope.nav = function() {
    if($location.path() == "/home") {
      $scope.home = true;
    }
    if($location.path() == "/american-made") {
     $scope.american = true;
   }
   if($location.path() == "/jurassic-world") {
     $scope.jurassic = true;
   }
   if($location.path() == "/lorax") {
     $scope.lorax = true;
   }
   if($location.path() == "/cnbc") {
     $scope.cnbc = true;
   }
   if($location.path() == "/chiller") {
     $scope.chiller = true;
   }
   if($location.path() == "/concerto") {
     $scope.concerto = true;
   }
   if($location.path() == "/rationalized") {
     $scope.rationalized = true;
   }
   if($location.path() == "/syfy") {
     $scope.syfy = true;
   }
   if($location.path() == "/universal-kids") {
     $scope.universal = true;
   }
   if($location.path() == "/mvpd") {
     $scope.mvpd = true;
   }
 }

 $scope.nav();

 $scope.triggerAnimation = true;

 $state.showPageTransition = false;

 $scope.isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return ($scope.isMobile.Android() || $scope.isMobile.BlackBerry() || $scope.isMobile.iOS() || $scope.isMobile.Opera() || $scope.isMobile.Windows());
  }
};

$scope.isBrowser =  {
  safari: function() {
    return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  },
  firefox: function() {
    return /Firefox/.test(navigator.userAgent);
  }
}

$scope.firefoxAdjustments = function() {
  if ($scope.isBrowser.firefox()) {
    angular.element('.fh5co-section').addClass('no-animate');
    angular.element('#preloader').addClass('show-warning');
    // angular.element('.mask').addClass('firefox-mask');
  }
};

$scope.changeMobileViewboxes = function() {
  if ($scope.isMobile.any()) {

    var shapes = angular.element('.fh5co-section').find('svg');
    for (var i = 0; i < shapes.length; i++) {
      shapes[i].setAttribute('viewBox', '0 0 600 416.1458333');
    }
  }
};


$timeout(function(){
  $scope.lorax = "partials/home/lorax.html";
  $scope.mvpd = "partials/home/mvpd.html";
  $scope.chiller = "partials/home/chiller.html";
  $scope.concerto = "partials/home/concerto.html";
  $scope.about = "partials/footer-about.html";    
  $scope.nav();   
}, 5000);
$scope.time = 0;
var timer = function() {
  if( $scope.time < 5000 ) {
    $scope.time += 1000;
    $timeout(timer, 0);
  }
}


$scope.goTopNav = function(){
  for(var i = 0;i < 11; i++) {
    $scope.triggerScroll = angular.element("#menu-list").children().children()[i].id;
    $scope.triggerScrollClass = angular.element("#menu-list").children().children()[i];
    $scope.top_home = $("#top-home").offset();
    $scope.top_american = $("#top-american").offset();
    $scope.top_cnbc = $("#top-cnbc").offset();
    $scope.top_rationalized = $("#top-rationalized").offset();
    $scope.top_syfy = $("#top-syfy").offset();
    $scope.top_jurassic = $("#top-jurassic").offset();
    $scope.top_universal = $("#top-universal").offset();
    $scope.top_lorax = $("#top-lorax").offset();
    $scope.top_mvpd = $("#top-mvpd").offset();
    $scope.top_chiller = $("#top-chiller").offset();
    $scope.top_concerto = $("#top-concerto").offset();

    if($scope.triggerScroll == "home" && $scope.triggerScrollClass.classList.contains('active1')) {
      $('#menu-list').animate({ scrollTop: $scope.top_home.top - $(window).scrollTop() - $("#top-home").innerHeight()*11 }, 'fast');
      
    }

    if($scope.triggerScroll == "american" && $scope.triggerScrollClass.classList.contains('active1')) {
     $('#menu-list').animate({ scrollTop: $scope.top_american.top - $(window).scrollTop() - $("#top-american").innerHeight()*11 }, 'fast');
     
     
   }

   if($scope.triggerScroll == "cnbc" && $scope.triggerScrollClass.classList.contains('active1')) {
    $('#menu-list').animate({ scrollTop: $scope.top_cnbc.top - $(window).scrollTop() - $("#top-cnbc").innerHeight()*11}, 'fast');
  }

  if($scope.triggerScroll == "rationalized" && $scope.triggerScrollClass.classList.contains('active1')) {
    $('#menu-list').animate({ scrollTop: $scope.top_rationalized.top - $(window).scrollTop() - $("#top-rationalized").innerHeight()*11}, 'fast');
    
  }

  if($scope.triggerScroll == "syfy" && $scope.triggerScrollClass.classList.contains('active1')) {
   $('#menu-list').animate({ scrollTop: $scope.top_syfy.top - $(window).scrollTop() - $("#top-syfy").innerHeight()*11}, 'fast');
 }

 if($scope.triggerScroll == "jurassic" && $scope.triggerScrollClass.classList.contains('active1')) {
   $('#menu-list').animate({ scrollTop: $scope.top_jurassic.top - $(window).scrollTop() - $("#top-jurassic").innerHeight()*11}, 'fast');
 }

 if($scope.triggerScroll == "universal" && $scope.triggerScrollClass.classList.contains('active1')) {
   $('#menu-list').animate({ scrollTop: $scope.top_universal.top - $(window).scrollTop() - $("#top-universal").innerHeight()*11}, 'fast');
 }

 if($scope.triggerScroll == "lorax" && $scope.triggerScrollClass.classList.contains('active1')) {
  $('#menu-list').animate({ scrollTop: $scope.top_lorax.top - $(window).scrollTop() - $("#top-lorax").innerHeight()*11}, 'fast');
}

if($scope.triggerScroll == "mvpd" && $scope.triggerScrollClass.classList.contains('active1')) {
 $('#menu-list').animate({ scrollTop: $scope.top_mvpd.top - $(window).scrollTop() - $("#top-mvpd").innerHeight()*11}, 'fast');
}

if($scope.triggerScroll == "chiller" && $scope.triggerScrollClass.classList.contains('active1')) {
 $('#menu-list').animate({ scrollTop: $scope.top_chiller.top - $(window).scrollTop() - $("#top-chiller").innerHeight()*11}, 'fast');
}

if($scope.triggerScroll == "concerto" && $scope.triggerScrollClass.classList.contains('active1')) {
 $('#menu-list').animate({ scrollTop: $scope.top_concerto.top - $(window).scrollTop() - $("#top-concerto").innerHeight()*11}, 'fast');
}

}
}


$scope.mobileMenuOutsideClick = function() {
  $(document).click(function (e) {
    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('offcanvas') ) {
        $('body').removeClass('offcanvas');
        $('.js-fh5co-nav-toggle').removeClass('active');
      }
    }
  });
};


$scope.offcanvasMenu = function() {
  $(window).resize(function(){
    if ( $('#page').hasClass('offcanvas') ) {
     
      $('#page').removeClass('offcanvas');
      $('.js-fh5co-nav-toggle').removeClass('active');

    }
  });
};

$scope.burgerMenu = function() {
 $scope.goTopNav();
 if (angular.element('#page').hasClass('overflow offcanvas')) {
  angular.element('#page').removeClass('overflow offcanvas');
  angular.element('.js-fh5co-nav-toggle').removeClass('active');
  


} else {
  angular.element('#page').addClass('overflow offcanvas');
  angular.element('.js-fh5co-nav-toggle').addClass('active');

}
event.preventDefault();
};

$scope.playVideo = function(event) {
  var overlay = angular.element(event.target);
  var video = overlay.parent().parent().parent().parent().parent().find('video')[0];
  overlay = overlay.parent().parent().parent().parent();
  overlay.addClass('hidden');
  video.play();
};

$scope.burgerWayPoint = function() {
 
  $('#fh5co-header').waypoint( function( direction ) {
    if (direction == 'up') {
      $('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
    }
  } , { offset: function() {
    return -this.element.clientHeight;
  } } );
  $('.fh5co-section').each(function() {
    $(this).waypoint( function( direction ) {
      if (direction == 'down') {
        if(this.element.classList.contains('fh5co-section--white'))
          $('.js-fh5co-nav-toggle').removeClass('fh5co-nav-white');
        if(this.element.classList.contains('fh5co-section--black'))
          $('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
      }
    } , { offset: '5%' } );
  });
  $('.fh5co-section').each(function() {
    $(this).waypoint( function( direction ) {
      if (direction == 'up') {
        if(this.element.classList.contains('fh5co-section--white'))
          $('.js-fh5co-nav-toggle').removeClass('fh5co-nav-white');
        if(this.element.classList.contains('fh5co-section--black'))
          $('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
      }
    } , { offset: function() {
      return -this.element.clientHeight;

    } } );
  });
      // $('.js-fh5co-nav-toggle').addClass('fh5co-nav-white');
    };


    $scope.contentWayPoint = function() {
      var i = 0;
      $('.animate-box').waypoint( function( direction ) {

        if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function(){

            $('body .animate-box.item-animate').each(function(k){
              var el = $(this);
              setTimeout( function () {
                var effect = el.data('animate-effect');
                el.addClass(effect + ' animated-fast');


                el.removeClass('item-animate');
              },  k * 50, 'easeInOut' );
            });

          }, 100);

        }

      } , { offset: '85%' } );
    };
    $scope.videoWayPoint = function() {
      if (!($scope.isMobile.any())) {
        $('.play-on-scroll').waypoint(function( direction ) {
          if ( direction === 'down') {
            $(this.element)[0].play();
          }
        }, { offset: '50%' });
      }
    };



    $scope.goToTop = function() {

      $('.js-gotop').on('click', function(event){

        event.preventDefault();

        $('html, body').animate({
          scrollTop: $('html').offset().top
        }, 500, 'easeInOutExpo');

        return false;
      });

      $(window).scroll(function(){

        var $win = $(window);
        if ($win.scrollTop() > 200) {
          $('.js-top').addClass('active');
        } else {
          $('.js-top').removeClass('active');
        }

      });

    };

    $scope.parallax = function() {
      if (!($scope.isMobile.any()) && !($scope.isBrowser.safari())) {
        $(window).stellar({
          parallaxBackgrounds: true,
          parallaxElements: true,
          hideDistantElements: true,
          horizontalScrolling: false,
          verticalScrolling: true
        });
      }
    };

    $scope.$on('$viewContentLoaded', function() {
      $scope.offcanvasMenu();
      $scope.mobileMenuOutsideClick();
      $scope.offcanvasMenu();
      $scope.goToTop();
      // $scope.parallax();
      $scope.$state = $state;

      setTimeout( function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }, 1);

      if($state.includes('preloader')) {
        setTimeout(function(){
          $state.go('home');
        }, 6000);
      }

    });

    $scope.$on("$includeContentLoaded", function(event, templateName){
      $scope.changeMobileViewboxes();
      $scope.firefoxAdjustments();
   });

    $scope.$on('$stateChangeSuccess', function() {
    });

    $scope.$on('$stateChangeStart', function () {
    });
  }]);
})();
