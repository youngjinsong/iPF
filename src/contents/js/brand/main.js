/*!
 *
 * iPF - base.js
 * @author ssongki (ssongki@gmail.com)
 *
 */
$(function() {
  var $window = $(window);
  var $body = $('body');
  var $header = $('header');
  var $btnTop = $('#btn-top');
  var $gnbButtons = $('nav a');
  var api = new API();
  var newsUI = new NewsUI(api);
  var careerUI = new CareerUI(api);
  var mapUI = new MapUI();
  var sliderUI = new SliderUI();
  var sectionPosition = [];

  /**
   * 스크린 사이즈 정보 추출
   */
  function getScreenSize() {
    return {
      width: screen.width,
      height: screen.height,
      ratio: screen.width / screen.height,
    };
  }

  /**
   * iPad 13 사파리가 기본적으로 Desktop모드로 동작하여 useragent가 Mac으로 전달되어 userAgent로 구분이 안됨.
   * REF https://forums.developer.apple.com/thread/119186
   *
   * 해상도 비율 처리 방법 고안
   * iPad mini 1024 * 768 (1.33)
   * iPad Air & pro 1024 * 768 (1.33)
   * iPad large pro 1366 * 1024 (1.33)
   *
   * Mac PC의 경우 1.6 or 1.77의 ratio라 구분이 가능.
   */
  function detectAppleSafariPcMode() {
    if (navigator.userAgent.match('Mac') && getScreenSize().ratio < 1.4) {
      return true;
    }

    return false;
  }

  /**
   * 모바일 디바이스 체크
   */
  function detectMobile() {
    var isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry/i.test(navigator.userAgent);

    if (isMobile || detectAppleSafariPcMode()) {
      $body.addClass('mobile');
    } else {
      $body.addClass('pc');
    }
  }

  /**
   * 메뉴에 해당하는 섹션의 좌표를 저장 합니다.
   */
  function setSectionPosition() {
    sectionPosition = [];

    $gnbButtons.each(function() {
      var href = $(this).attr('href');
      var top = $(href).offset().top;

      // 모바일 사이즈 일때 헤더 너비 제외 후 포지션 저장.
      if ($window.width() <= 480) {
        top -= $header.height();
      }
      sectionPosition.push(top);
    });

    console.log('setSectionPosition', sectionPosition);
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

      if (scrollTop >= thisTop - safetyGap && (nextTop > 0 ? scrollTop < nextTop - safetyGap : true)) {
        var $target = $('nav a:eq(' + i + ')');

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
    $('html, body').animate(
      {
        scrollTop: top,
      },
      500
    );
  }

  $('#brc-ios-download').on('click', function() {
    alert('해당 앱은 중국 App Store에서만 지원합니다.');
  });

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
      var context = this; // container
      var args = arguments; // event

      // 만약 이벤트가 호출되면 타이머를 초기화 하고 다시 시작한다.
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  /**
   * Disable Logger for production version
   */
  function removeConsole() {
    if (!location.host.match(/dev|localhost/) && !location.hash.match(/#showlog/)) {
      console.log = console.info = console.warn = console.error = function() {};
    }
  }

  /**
   * 초기 바인딩
   */
  function init() {
    removeConsole();
    newsUI.init();
    careerUI.init();
    sliderUI.init();
    mapUI.init();

    $window
      .on('load', detectMobile)
      .on('load', setSectionPosition)
      .on('scroll', onScroll)
      .on('resize', debounce(setSectionPosition, 300));

    $btnTop.on('click', function() {
      moveScrollTop(0);
      $btnTop.removeClass('shown');
    });

    $gnbButtons.on('click', function() {
      setSectionPosition();
      var $this = $(this);
      var index = $gnbButtons.index($this);
      var top = sectionPosition[index];

      moveScrollTop(top);
      return false;
    });
  }
  init();
});
