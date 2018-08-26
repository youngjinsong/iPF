/**
 * SignUI handler
 * @param auth
 * @param $body
 * @constructor
 */
function SignUI(auth, $body) {
  console.log('Loaded Admin SignUI', arguments);

  var that = this;
  var signUI = {
    isSigned: false,
    $container: $body,

    /**
     * 로그인 여부에 따른 처리
     * @param isSign
     */
    handleSignState: function(isSign) {
      if (isSign) {
        $('#signin-wrap').remove();
        $body.addClass('signed').removeClass('unsigned');
        that.setSignOutEvent();
      } else {
        $body.removeClass('signed').addClass('unsigned');
        that.appendPage();
      }

      that.isSigned = isSign;
    },

    /**
     * 로그인 상태 리턴
     * @returns {*}
     */
    getIsSign: function() {
      return that.isSigned;
    },

    /**
     * 로그인 페이지 노출
     */
    appendPage: function() {
      var url = "./partial/signin.html";

      $.get(url, function(dom) {
        that.$container.append(dom);
        that.setFormEvent();
      });
    },

    /**
     * 버튼에 로더 추가
     * @param $form
     */
    appendButtonLoader: function($form) {
      $form.find(':submit').attr('disabled', true).append([
        '<div class="loader sk-circle">',
          '<div class="sk-circle1 sk-child" />',
          '<div class="sk-circle2 sk-child" />',
          '<div class="sk-circle3 sk-child" />',
          '<div class="sk-circle4 sk-child" />',
          '<div class="sk-circle5 sk-child" />',
          '<div class="sk-circle6 sk-child" />',
          '<div class="sk-circle7 sk-child" />',
          '<div class="sk-circle8 sk-child" />',
          '<div class="sk-circle9 sk-child" />',
          '<div class="sk-circle10 sk-child" />',
          '<div class="sk-circle11 sk-child" />',
          '<div class="sk-circle12 sk-child" />',
        '</div>'
      ].join('\n'));
    },

    /**
     * 버튼에 로더 제거
     * @param $form
     */
    removeButtonLoader: function($form) {
      $form.find(':submit').removeAttr('disabled')
        .find('.loader').remove();
    },

    /**
     * 폼 이벤트 바인딩
     */
    setFormEvent: function() {
      $('#signin-wrap').find('form').submit(function() {
        var $this = $(this);
        var data = $this.serializeObject();

        if (!data.email || !data.password) {
          alert("계정 정보를 입력해 주세요");
          return false;
        }

        that.appendButtonLoader($this);
        auth.signIn(data.email, data.password, function(errorMsg) {
          alert(errorMsg);
          that.removeButtonLoader($this);
        });

        return false;
      });
    },

    /**
     * 로그아웃 이벤트 바인딩
     */
    setSignOutEvent: function() {
      $('#sign-out').off('click').on('click', function() {
        auth.signOut();
      });
    }
  };

  $.extend(this, signUI);
}