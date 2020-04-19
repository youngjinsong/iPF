/**
 * News UI handler
 * @param api
 * @constructor
 */
function NewsUI(api) {
  var that = this;
  var newsUI = {
    data: null, // API 응답 객체
    renderingCount: 5, // 한번에 목록을 그리는 횟수
    $container: $('#news'), // 컨테이너 DOM

    /**
     * 목록 조회
     * @param callback
     */
    getList: function(callback) {
      api.news.read(null, function(data) {
        that.data = data; // 더보기 누르면 생성하기 위해 상위 객체에 추가
        callback();
      });
    },

    /**
     * 목록 생성 함수
     * @param data
     * @param isFirst
     */
    setList: function(data, isFirst) {
      var $ul = that.$container.find('ul');
      var result = [];

      $.each(data, function(i, item) {
        var title = item.title;
        var link = item.link;
        var date = moment(item.date).format('MMMM DD, YYYY');
        // var date = moment(item.date).format('YYYY-MM-DD');

        // prettier-ignore
        result.push([
          '<li>',
            '<a href="' + link + '" target="_blank">',
              '<span class="date">' + date + '</span>',
              '<p>' + title + '</p>',
            '</a>',
          '</li>'
        ].join('\n'));
      });

      if (isFirst) {
        $ul.html(result);
      } else {
        $ul.append(result);
      }
    },

    /**
     * 더보기
     */
    getMore: function() {
      var listData = that.data.splice(0, that.renderingCount);
      if (listData) {
        that.setList(listData);
      }

      if (!that.data.length) {
        that.removeMoreButton();
      }
    },

    /**
     * 더보기 버튼 생성
     */
    appendMoreButton: function() {
      var $innerContainer = that.$container.find('.container');
      $innerContainer.append('<button type="button">더보기</button>');
      $innerContainer.find('button').click(that.getMore);
    },

    /**
     * 더보기 버튼 제거
     */
    removeMoreButton: function() {
      that.$container.find('button').remove();
    },

    /**
     * 초기화
     */
    init: function() {
      that.getList(function() {
        var listData = that.data.splice(0, that.renderingCount);
        that.setList(listData, true);
        that.appendMoreButton();
      });
    }
  };

  $.extend(this, newsUI);
}
