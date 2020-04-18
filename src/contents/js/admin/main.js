/**
 * Admin Main
 */
(function($, doc, win) {
  console.log('Loaded Admin Main', arguments);

  var $body = $('body');
  var api = new API();
  var auth = new Auth();
  var signUI = new SignUI(auth, $body);
  var newsUI = new NewsUI(api);
  var careerUI = new CareerUI(api);
  var pageUIs = {
    news: newsUI,
    career: careerUI
  };

  /**
   * Partial 뷰 호출
   * @param pageName
   */
  function getPage(pageName) {
    console.log('getPage', arguments);
    var url = './partial/' + pageName + '.html';
    var instance = pageUIs[pageName]; // 해당 페이지 UI instance 탐색

    if (!instance) {
      alert('잘못된 페이지 요청 입니다.');
      return false;
    }

    $.get(url, function(dom) {
      $('#content').html(dom);
      instance.init();
      activeMenu(pageName);
    });
  }

  /**
   * 현재 페이지 GNB 포커스
   * @param name
   */
  function activeMenu(name) {
    var $gnb = $('#gnb');
    var $target = $gnb.find("[href='#" + name + "']");

    $gnb.find('.active').removeClass('active');
    $target.addClass('active');
  }

  /**
   * 해쉬가 변경되면 동작하는 이벤트.
   */
  function setHashListener() {
    var hash = location.hash;
    var pageName = hash.split('#')[1];

    if (hash) {
      getPage(pageName);
    } else {
      location.hash = 'news'; // 해쉬가 없을때 첫 페이지 표시
    }

    $(window).bind('hashchange', function() {
      hash = location.hash;
      pageName = hash.split('#')[1];
      getPage(pageName);
    });
  }

  /**
   * 초기화
   */
  function init() {
    // 로그인 상태에 따른 처리
    auth.onAuthChanged(signUI.handleSignState);

    // 해쉬 변화 감지
    setHashListener();
  }
  init();
})(jQuery, document, window);
