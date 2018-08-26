/*!
 *
 * iPF - base.js
 * @author ssongki (ssongki@gmail.com)
 *
 */
$(function() {
  var $window = $(window)
    , $header = $('header')
    , $btnTop = $('#btn-top')
    , $gnbButtons = $('nav a')
    , api = new API()
    , newsUI = new NewsUI(api)
    , careerUI = new CareerUI(api)
    , mapUI = new MapUI()
    , sectionPosition = [];

  /**
   * 메뉴에 해당하는 섹션의 좌표를 저장 합니다.
   */
  function setSectionPosition() {
    sectionPosition = [];

    $gnbButtons.each(function() {
      var href = $(this).attr('href');
      var top = $(href).offset().top;
      sectionPosition.push(top);
    });

    console.log('setSectionPosition', sectionPosition)
  }

  /**
   * 현재 좌표에 해댕하는 메뉴에 포커싱 한다.
   * @param scrollTop
   */
  function focusMenu(scrollTop) {
    var safetyGap = 5;

    $.each(sectionPosition, function(i, thisTop) {
      var nextTop = sectionPosition[i + 1];
      // console.log('focusMenu', i, scrollTop, thisTop - safetyGap, nextTop);

      if (scrollTop >= thisTop - safetyGap &&
        (nextTop > 0 ? scrollTop < nextTop - safetyGap : true)) {
        var $target = $('nav a:eq(' + i +')');

        if (!$target.hasClass('active')) {
          $gnbButtons.removeClass('active');
          $target.addClass('active');
        }

        return false;
      } else if (scrollTop < sectionPosition[0]) {
        $gnbButtons.removeClass('active');
      }
    });
  }

  /**
   * 스크롤 이벤트 핸들링
   */
  function onScroll() {
    var winTop = $window.scrollTop();
    // console.log('onScroll', winTop);

    // Sticky Header
    $header[winTop >= 80 ? 'addClass' : 'removeClass']('sticky-header');

    // Scroll Top Button
    $btnTop[winTop > 600 ? 'addClass' : 'removeClass']('shown');

    // Focus GNB Menu
    focusMenu(winTop);
  }

  /**
   * 스크롤 이동 합니다.
   * @param top
   */
  function moveScrollTop(top) {
    $("html, body").animate({
      scrollTop: top
    }, 500);
  }

  /**
   * 이벤트를 텀을 두고 발동하도록 디바운싱 합니다.
   * @param fn
   * @param delay
   * @returns {Function}
   */
  function debounce(fn, delay) {
    // console.log('debounce', arguments);
    var timer = null;

    // 타이머 변수에 접근 가능한 클로져 함수
    return function() {
      var context = this;	  // container
      var args = arguments; // event
      console.log(context, arguments);

      // 만약 이벤트가 호출되면 타이머를 초기화 하고 다시 시작한다.
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  }

  /**
   * 초기 바인딩
   */
  function init() {
    newsUI.init();
    careerUI.init();
    mapUI.init();
    setSectionPosition();

    $window
      .on('scroll', onScroll)
      .on('resize', debounce(setSectionPosition, 300));

    $btnTop.on('click', function() {
      moveScrollTop(0);
      $btnTop.removeClass('shown');
    });

    $gnbButtons.on('click', function() {
      var $this = $(this);
      var index = $gnbButtons.index($this);
      var top = sectionPosition[index];

      moveScrollTop(top);
      return false;
    });
  }
  init();
});
