(function () {
  'use strict';

  /* Directives */


  angular.module('myApp.directives', [])
  .directive('codepenEmbed', function() {
    var injectScript = function(element) {
      var scriptTag = angular.element(document.createElement('script'));
      scriptTag.attr('charset', 'utf-8');
      scriptTag.attr('src', '//assets.codepen.io/assets/embed/ei.js');
      element.append(scriptTag);
    };

    return {
      link: function(scope, element) {
        injectScript(element);
      }
    };
  })
  .directive('includeReplace', function () {
    return {
      require: 'ngInclude',
      restrict: 'A', /* optional */
      link: function (scope, el, attrs) {
        el.replaceWith(el.children());
      }
    };
  })
  .directive('changeOnScroll', ['$timeout', function ($timeout, $window) {
    return {
      restrict: 'A',
      scope: {
        offset: "@",
        scrollClass: "@"
      },
      link: function(scope, element) {
       element.bind("scroll", function() {
        element.addClass(scope.scrollClass);
        $timeout(function(){
          element.removeClass(scope.scrollClass);
        }, 900);  
      });
     }
   };
 }])
  .directive('heroLanding', ['$timeout', '$window', function ($timeout, $window) {
    return {
      restrict: 'A', 
      link: function (scope, el, attrs) {
        console.log(scope.triggerAnimation);
        if (scope.triggerAnimation && !isIOSSafari()) {
          $timeout(function() {
            el.find('.hero-landing').removeClass("expanded");
          }, 2400);
          $timeout(function() {
            el.find('.hero-landing').removeClass("hero-landing");
          }, 3700);
          $timeout(function() {
            el.removeClass("hero-delay");
          }, 3800);
          scope.triggerAnimation = false;
        } else {
          el.removeClass("hero-delay");
          el.find('.hero-landing').removeClass("hero-landing expanded");
        }

        function isIOSSafari() {
          var userAgent;
          userAgent = window.navigator.userAgent;
          return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
        }
      }
    };
  }])
  .directive('ciperText', ['$timeout', function ($timeout) {
    return {
      link: function(scope, element, attrs) {
        scope.$on('duScrollspy:becameActive', function($event, $element, $target){
          if ($element.attr('id') == element.attr('id')) {
            $timeout(function () {
              var fx = new TextScramble(element.find('.cipher-text')[0]);
              fx.setText(element.find('.cipher-text').attr('cipher-data'));
            }, ((element.hasClass('hero-delay')) ? 2300 : 0));
          } 
        });

        var TextScramble = function () {
          function TextScramble(el) {

            this.el = el;
            this.chars = 'abcdefghjklmnopqrstuvwxyz123456789<>_\\/[]{}—=+*?';
            this.update = this.update.bind(this);
          }

          TextScramble.prototype.setText = function setText(newText) {
            var _this = this;

            var oldText = this.el.innerText;
            var length = Math.max(oldText.length, newText.length);
            var promise = new Promise(function (resolve) {
              return _this.resolve = resolve;
            });
            this.queue = [];
            for (var i = 0; i < length; i++) {
              var from = oldText[i] || '';
              var to = newText[i] || '';
              var start = Math.floor(Math.random() * 40);
              var end = start + Math.floor(Math.random() * 40);
              this.queue.push({ from: from, to: to, start: start, end: end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
          };

          TextScramble.prototype.update = function update() {
            var output = '';
            var complete = 0;
            for (var i = 0, n = this.queue.length; i < n; i++) {
              var _queue$i = this.queue[i];
              var from = _queue$i.from;
              var to = _queue$i.to;
              var start = _queue$i.start;
              var end = _queue$i.end;
              var char = _queue$i.char;

              if (this.frame >= end) {
                complete++;
                output += to;
              } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                  char = this.randomChar();
                  this.queue[i].char = char;
                }
                output += '<span class="dud">' + char + '</span>';
              } else {
                output += from;
              }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
              this.resolve();
            } else {
              this.frameRequest = requestAnimationFrame(this.update);
              this.frame++;
            }
          };

          TextScramble.prototype.randomChar = function randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
          };

          return TextScramble;
        }();
      }
    };
  }])
  .directive('splitText', function () {
    return {
      link: function(scope, element, attrs) {
        var text = $.trim(element.text()),
        word = text.split(' '),
        str = "";
        $.each( word, function( key, value ) {
          if(key != 0) { str += " "; }
          str += "<span>" + value + "</span>";
        });
        element.html(str);
      }
    };
  })
  .directive('ngX', function() {
    return function(scope, elem, attrs) {
      attrs.$observe('ngX', function(x) {
        elem.attr('x', x);
      });
    };
  })
  .directive('ngY', function() {
    return function(scope, elem, attrs) {
      attrs.$observe('ngY', function(y) {
        elem.attr('y', y);
      });
    };
  })
  .directive('ngTransform', function() {
    return function(scope, elem, attrs) {
      attrs.$observe('ngTransform', function(transform) {
        elem.attr('transform', transform);
      });
    };
  })
  .directive('processDiagram', ['$timeout', function ($timeout, $window) {
    return {
      link: function(scope, element, attrs) {

        var STEP__RADIUS = 40,
        COLORS = [
        '#FF6701',
        '#EA610C',
        '#D45B17',
        '#BF5522',
        '#A94F2E',
        '#944939',
        '#7E4344',
        '#693D4F'
        ];

        function isIOSSafari() {
          var userAgent;
          userAgent = window.navigator.userAgent;
          return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
        }

        function isTouch() {
          var isIETouch;
          isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
          return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
        }

        var isIOS = isIOSSafari(),
        clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

        function extend( a, b ) {
          for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
              a[key] = b[key];
            }
          }
          return a;
        }

        function Animocon(el, options) {
          this.el = el;
          this.options = extend( {}, this.options );
          extend( this.options, options );

          this.checked = false;

          this.timeline = new mojs.Timeline();

          for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
          }

          var self = this;
          this.el.addEventListener(clickHandler, function() {
            if( self.checked ) {
              self.options.onUnCheck();
            }
            else {
              self.options.onCheck();
              self.timeline.start();
              self.checked = true;
            }
          });
        }

        Animocon.prototype.start = function() {
          this.timeline.start();
          self.checked = true;
        };

        Animocon.prototype.options = {
          tweens : [
          new mojs.Burst({
            shape : 'circle',
            isRunLess: true
          })
          ],
          onCheck : function() { return false; },
          onUnCheck : function() { return false; }
        };

        var circleArcs = [
        {
          centerX: 50,
          centerY: 50,
          startAngle: -112.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: -67.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: -22.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 22.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 67.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 112.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 157.5,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 202.5,
          arcAngle: 45,
          radius: 49
        }
        ];
        var arcs = [
        {
          centerX: 50,
          centerY: 50,
          startAngle: -90,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: -45,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 0,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 45,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 90,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 135,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 180,
          arcAngle: 45,
          radius: 49
        },
        {
          centerX: 50,
          centerY: 50,
          startAngle: 225,
          arcAngle: 45,
          radius: 49
        }
        ];

        function arcPath(arc, prog) {
          var progress = prog || 1,
          arcStartX = arc.centerX + Math.cos(arc.startAngle * Math.PI / 180)*arc.radius,
          arcStartY = arc.centerY + Math.sin(arc.startAngle * Math.PI / 180)*arc.radius,
          arcEndX = arc.centerX + Math.cos((arc.startAngle + arc.arcAngle * progress) * Math.PI / 180)*arc.radius,
          arcEndY = arc.centerY + Math.sin((arc.startAngle + arc.arcAngle * progress) * Math.PI / 180)*arc.radius;

          return 'M ' + arcStartX.toString() + ' ' + arcStartY.toString() + ' A ' + arc.radius.toString() + ' ' + arc.radius.toString() + ' 0 0 1 ' + arcEndX.toString() + ' ' + arcEndY.toString();
        }

        function arcPathMiddle(arc, prog) {
          var progress = prog || 1,
          medianAngle = arc.startAngle + 0.5 * arc.arcAngle,
          arcStartX = arc.centerX + Math.cos((medianAngle - arc.arcAngle * 0.5 * progress) * Math.PI / 180)*arc.radius,
          arcStartY = arc.centerY + Math.sin((medianAngle - arc.arcAngle * 0.5 * progress) * Math.PI / 180)*arc.radius,
          arcEndX = arc.centerX + Math.cos((medianAngle + arc.arcAngle * 0.5 * progress) * Math.PI / 180)*arc.radius,
          arcEndY = arc.centerY + Math.sin((medianAngle + arc.arcAngle * 0.5 * progress) * Math.PI / 180)*arc.radius;

          return 'M ' + arcStartX.toString() + ' ' + arcStartY.toString() + ' A ' + arc.radius.toString() + ' ' + arc.radius.toString() + ' 0 0 1 ' + arcEndX.toString() + ' ' + arcEndY.toString();
        }

        function hideWithQ(el) {
          var q1 = document.createElement('div'),
          q2 = document.createElement('div'),
          q3 = document.createElement('div'),
          q4 = document.createElement('div');

          q1.classList.add('q', 'q1');
          q2.classList.add('q', 'q2');
          q3.classList.add('q', 'q3');
          q4.classList.add('q', 'q4');

          q1.dataset.type = Math.round(Math.random()*3);
          q2.dataset.type = Math.round(Math.random()*3);
          q3.dataset.type = Math.round(Math.random()*3);
          q4.dataset.type = Math.round(Math.random()*3);

          el.appendChild(q1);
          el.appendChild(q2);
          el.appendChild(q3);
          el.appendChild(q4);

          return el;
        }

        function initQ(className) {
          var elements = document.getElementsByClassName(className);
          for (var i=0; i < elements.length; i++) {
            hideWithQ(elements[i]);
          }
        }

        function initQString(queryString) {
          [].slice.call(document.querySelectorAll(queryString)).map(function(el, index) {
            var elString = el.innerHTML;
            el.innerHTML = '';
            for (var i = 0; i < elString.length; i++) {
              var char = elString[i],
              charEl = document.createElement('span');
              charEl.innerHTML = char;
              charEl.classList.add('super-q');
              el.appendChild(charEl);
              hideWithQ(charEl);
            }
          });
        }

        initQString('.step__title');
        initQString('.title');


        var el1 = document.getElementById('process'),
        arc1 = document.getElementById('step__arc-1');

        var startCircle = new Step(el1, {
          tweens : [
          new mojs.Burst({
            parent: el1,
            duration: 1700,
            shape : 'circle',
            fill: '#C0C1C3',
            x: '50%',
            y: '50%',
            opacity: 0.6,
            childOptions: { radius: {15:0} },
            radius: {30:210},
            count: 8,
            isRunLess: true,
            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
          }),
          new mojs.Tween({
            duration : 800,
            delay: 700,
            onUpdate: function(progress) {
              var easing = mojs.easing.ease.out(progress),
              steps = document.getElementsByClassName('step__spot-circle');

              for (var i = 0, step; i < steps.length; i++) {
                step = steps[i];
                step.setAttribute('r', STEP__RADIUS * easing);
              }
            }
          }),

          new mojs.Tween({
            duration : 800,
            delay: 750,
            onUpdate: function(progress) {
              var easing = mojs.easing.ease.in(progress);
              circleArcs.forEach(function(arc, index) {
                var id = 'circle__arc-' + Math.round(index + 1).toString(),
                arcEl = document.getElementById(id);
                if (arcEl) {
                  arcEl.setAttribute('d', arcPathMiddle(arc, easing));
                }
              });
            }
          }),

          new mojs.Tween({
            duration : 700,
            delay: 1300,
            onUpdate: function(progress) {
              var easingFunction = mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0'),
              easing = mojs.easing.ease.out(progress),
              stepNumbers = document.getElementsByClassName('step__number');

              for (var i=0; i < stepNumbers.length; i++) {
                stepNumbers[i].style.opacity = easing;
              }
            }
          }),

          new mojs.Tween({
            duration : 1000,
            delay: 600,
            onUpdate: function(progress) {
              var easingFunction = mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0'),
              easing = mojs.easing.ease.in(progress),
              title = document.querySelector('.title');

              function setQStyle(q) {
                switch (q.dataset.type) {
                  case '0':
                  q.style.top = Math.round(q.classList.contains('q2', 'q4') ? 50 : 0 + 50*easing).toString() + '%';
                  q.style.height = Math.round(55*(1-easing)).toString() + '%';
                  break;

                  case '1':
                  q.style.left = Math.round(q.classList.contains('q3', 'q4') ? 50 : 0 + 50*easing).toString() + '%';
                  q.style.width = Math.round(55*(1-easing)).toString() + '%';
                  break;

                  case '2':
                  q.style.height = Math.round(55*(1-easing)).toString() + '%';
                  break;

                  case '3':
                  q.style.width = Math.round(55*(1-easing)).toString() + '%';
                  break;
                }
              }

              [].slice.call(title.querySelectorAll('.q')).forEach(setQStyle);
              title.style.opacity = 1.5*easing;
            }
          })
          ],
          onCheck : function() {
          },
          onUnCheck : function() {
          }
        });


        function Step(el, options, target) {
          this.el = el;
          this.target = target;
          this.options = extend( {}, this.options );
          extend( this.options, options );

          this.checked = false;

          this.timeline = new mojs.Timeline();

          for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
          }

          var self = this;

          var timer = $timeout(function() {
            self.checked = true;
            self.options.onCheck();
            self.timeline.start();
          }, parseInt(this.el.id.split('-').pop()) * 5000);

          function onClick() {
            $timeout.cancel(timer);
            if( self.checked ) {
              self.options.onUnCheck();
            }
            else {
              self.checked = true;
              self.options.onCheck();
              self.timeline.start();
            }
          }
          if (this.target) {
            this.target.addEventListener(clickHandler, onClick);
          } else if (this.el) {
            this.el.addEventListener(clickHandler, onClick);
          }
        }

        Step.prototype.start = function() {
          if (!this.checked) {
            this.timeline.start();
            this.checked = true;
          }
        };

        Step.prototype.options = {
          tweens : [
          new mojs.Burst({
            shape : 'circle',
            isRunLess: true
          })
          ],
          onCheck : function() { return false; },
          onUnCheck : function() { return false; }
        };

        function initSteps() {
          return [].slice.call(document.querySelectorAll('.step')).map(function(stepEl, index) {
            return new Step(stepEl, {
              tweens : [
              new mojs.Tween({
                duration : 900,
                onUpdate: function(progress) {
                  var easingFunction = mojs.easing.bezier(0.075, 0.82, 0.165, 1),
                  easing = mojs.easing.circ.in(progress),
                  arcEl = document.getElementById('step__arc-' + index);

                  if (arcEl) {arcEl.setAttribute('d', arcPath(arcs[index - 1], easing));}
                }
              }),

              new mojs.Tween({
                duration : 1200,
                delay: 2300,
                onUpdate: function(progress) {
                  if (index === 7) {
                    var easing = mojs.easing.ease.in(progress),
                    arcEl = document.getElementById('step__arc-' + Math.round(index + 1).toString());

                    if (arcEl) {arcEl.setAttribute('d', arcPath(arcs[index], easing));}
                  }

                }
              }),

              new mojs.Burst({
                parent: stepEl,
                duration: 2000,
                delay: index === 0 ? 0 : 900,
                shape : 'circle',
                fill: COLORS[index],
                x: '50%',
                y: '50%',
                opacity: 0.6,
                childOptions: { radius: {15:0} },
                radius: {10:30},
                count: 10,
                isRunLess: true,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
              }),

              new mojs.Tween({
                duration : 1200,
                delay: index === 0 ? 0 : 900,
                onUpdate: function(progress) {
                  var circle = stepEl.querySelector('.step__spot-circle');
                  var elasticOutProgress = mojs.easing.elastic.out(progress);
                  circle.style.opacity = elasticOutProgress;
                },
                onFirstUpdate: function() {
                  stepEl.querySelector('.step__spot-circle').style.stroke = COLORS[index];
                  stepEl.querySelector('.step__spot-circle').style.fill = COLORS[index];
                  stepEl.querySelector('.step__number').style.color = '#ffffff';
                }
              }),

              new mojs.Tween({
                duration : 700,
                delay: index === 0 ? 200 : 1100,
                onUpdate: function(progress) {
                  var easingFunction = mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0'),
                  easing = mojs.easing.circ.in(progress),
                  title = stepEl.querySelector('.step__title');

                  function setQStyle(q) {
                    switch (q.dataset.type) {
                      case '0':
                      q.style.top = Math.round(q.classList.contains('q2', 'q4') ? 50 : 0 + 50*easing).toString() + '%';
                      q.style.height = Math.round(55*(1-easing)).toString() + '%';
                      break;

                      case '1':
                      q.style.left = Math.round(q.classList.contains('q3', 'q4') ? 50 : 0 + 50*easing).toString() + '%';
                      q.style.width = Math.round(55*(1-easing)).toString() + '%';
                      break;

                      case '2':
                      q.style.height = Math.round(55*(1-easing)).toString() + '%';
                      break;

                      case '3':
                      q.style.width = Math.round(55*(1-easing)).toString() + '%';
                      break;
                    }
                  }

                  [].slice.call(title.querySelectorAll('.q')).forEach(setQStyle);
                  title.style.opacity = 1.5*easing;
                }
              }),

              new mojs.Tween({
                duration : 1000,
                delay: index === 0 ? 400 : 1200,
                onUpdate: function(progress) {
                  var easing = mojs.easing.circ.in(progress),
                  stepIcon = stepEl.querySelector('.step__icon');
                  stepIcon.style.opacity = easing;
                }
              }),

              new mojs.Tween({
                duration : 1400,
                delay: index === 0 ? 400 : 1200,
                onUpdate: function(progress) {
                  var easing = mojs.easing.circ.in(progress),
                  stepInfo = stepEl.querySelector('.step__text'),
                  stepDiv = stepEl.querySelector('.step__info'),
                  stepRole = stepEl.querySelector('.step__role');
                  stepInfo.style.opacity = easing;
                }
              }),
              ],
              onCheck: function() {

              }
            });
});
}

var steps = initSteps();
startCircle.start();



}
};
}])
.directive('sineWaveAnimate',  ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      if (!scope.isMobile.any()) {
        scope.timer;

        element.bind("mouseover", function() {
          scope.timer = $timeout(function() {
            scope.play = true;
            animate();
          }, 0);
        });

        element.bind("mouseout", function() {
          $timeout.cancel(scope.timer);
          var holdAmplitude = scope.amplitude;
          scope.amplitude = 0;
          createGraph(path);
          scope.amplitude = holdAmplitude;
          scope.play = false;
        });

        scope.play = true;
        scope.x = 0;
        scope.offset = 0;
        scope.frequency = 10.0;
        scope.amplitude = 1;
        scope.increment = 5;

        var path = $('.sine-wave');

        function animate() {
          if (scope.play) {
            scope.offset += (scope.increment / 60);
            createGraph(path);
            $timeout(function () {
              requestAnimationFrame(animate);  
            },(1000 / 60));
          }
        }

        scope.pathFunction = function (x) {
          var result = (Math.sin(Math.sqrt(x*scope.frequency)-scope.offset))*x*(0.1 * scope.amplitude);
          return result;
        };

        function createGraph(wave) {
          scope.x = 0;
          var data = [
          {
            'type': 'M',
            'values': [0,30]
          }
          ];
          while (scope.x < 160) {
            data.push({
              'type': 'L',
              'values': [
              scope.x,
              30 - scope.pathFunction(scope.x) 
              ]
            });
            scope.x += 1;
          }
          wave[0].setPathData(data);
        };
      }
    }
  };
}])
.directive('videoPlayer', function($templateRequest, $compile) {
  return {
    link: function(scope, element) {
      function addVideoOverlay() {
        $templateRequest("partials/video-overlay.html").then(function(html) {
          var template = angular.element(html);
          element.parent().append(template);
          $compile(template)(scope);
          player.addEventListener('play', hideVideoOverlay, false);
        });
      }

      function hideVideoOverlay() {
        element.parent().find('video-overlay');
      }

      var player = angular.element(element)[0];
      player.addEventListener('ended', addVideoOverlay, false);
    }
  };
});
})();
