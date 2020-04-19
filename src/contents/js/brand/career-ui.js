/**
 * CarrerUI handler
 * @param api
 * @constructor
 */
function CareerUI(api) {
  var that = this;
  var careerUI = {
    $container: $('#career'), // 컨테이너 DOM
    /**
     * 목록 생성
     */
    setList: function() {
      var $ul = that.$container.find('ul');

      api.career.read(function(data) {
        var result = [];

        if (data) {
          $.each(data, function(i, item) {
            var visible = item.visible;
            var title = item.title;
            var link = item.link;
            var date = item.detail;

            if (visible === 'true') {
              // prettier-ignore
              result.push([
                '<li>',
                  '<a href="' + link + '" target="_blank">',
                    title,
                    '<img src="contents/img/icons/ic-share.png" class="ic-share" alt= "share icon" />',
                  '</a>',
                '</li>'
              ].join('\n'));
            }
          });
        } else {
          result.push(["<li class='no-career'>진행중인 채용 공고가 없습니다.</li>"].join('\n'));
        }

        $ul.html(result);
      });
    },

    /**
     * 초기화
     */
    init: function() {
      that.setList();
    }
  };

  $.extend(this, careerUI);
}
