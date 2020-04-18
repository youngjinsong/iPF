/**
 * Career UI handler
 * @param api
 * @constructor
 */
function CareerUI(api) {
  console.log('Loaded Admin CareerUI', arguments);

  var that = this;
  var careerUI = {
    $container: $('#content'),

    /**
     * 목록 랜더링
     */
    setList: function() {
      var self = this;
      var $table = self.$container.find('table');

      api.career.read(function(data) {
        var listDom = [];
        var size = Object.size(data);

        if (!size) {
          listDom.push('<tr><td colspan="5">목록이 없습니다.</td></tr>');
        } else {
          $.each(data, function(key, val) {
            var jsonData = $.replaceQuoteToEntity(JSON.stringify(val));
            var visibleState = val.visible === 'true' ? '공개' : '비공개';

            // prettier-ignore
            listDom.push([
              "<tr>",
                "<td>" + size + "</td>",
                "<td class='title'><button class='edit' data-obj='" + jsonData + "'>" + val.title + "</button><p>" + val.detail + "</p></td>",
                "<td>" + visibleState + "</td>",
                "<td><a href='" + val.link + "' class='button green' target='_blank'>" + "링크" + "</a></td>",
                "<td><button class='edit button green' data-obj='" + jsonData + "'>수정</button></td>",
              "</tr>"
            ].join('\n'));

            size--;
          });
        }

        // Append list
        $table.find('tbody').html(listDom.join('\n'));

        // Bind edit event
        $table.find('.edit').click(self.showEditDialog);
      });
    },

    /**
     * 현재 날짜를 셋팅한다
     * @param $target
     */
    setCurrentDate: function($target) {
      var date = moment().format();
      $target.val(date);
    },

    /**
     * 폼 이벤트 바인딩
     * @param type
     */
    setFormEvent: function(type) {
      var $dialog = $('.dialog');

      $dialog.find('form').submit(function() {
        var data = $(this).serializeObject();

        if (type === 'create') {
          api.career.create(data);
        } else {
          api.career.update(data);
        }

        that.setList();
        $.dialog.close();
        $.msgbox('정상 처리 되었습니다.');
        return false;
      });

      // 저장시 정렬을 위한 timestemp 설정한다.
      that.setCurrentDate($dialog.find('[name="lastUpdateDate"]'));
    },

    /**
     * 채용 분야 생성 다이얼로그 노출
     */
    showCreateDialog: function() {
      $.dialog('./dialog/career.html', function() {
        that.setFormEvent('create');
      });
    },

    /**
     * 채용 분야 편집 다이얼로그 노출
     * @param e
     */
    showEditDialog: function(e) {
      var $target = $(e.target);
      var data = JSON.parse($target.attr('data-obj'));
      var id = data.id;
      var title = data.title;
      var detail = data.detail;
      var link = data.link;
      var lastUpdateDate = data.lastUpdateDate;
      var visible = data.visible;

      $.dialog('./dialog/career.html', function() {
        var $dialog = $('.dialog');
        that.setFormEvent('edit');

        $dialog.find('.dialog-header').html('모집 분야 수정');
        $dialog.find('[name=title]').val(title);
        $dialog.find('[name=detail]').val(detail);
        $dialog.find('[name=link]').val(link);
        $dialog.find('[name=lastUpdateDate]').val(lastUpdateDate);
        $dialog.find('form').append('<input type="hidden" name="id" value="' + id + '" />');
        $dialog
          .find('.dialog-footer')
          .prepend(["<button type='button' id='delete' class='button large red'>삭제</button>"].join('\n'));

        if (visible === 'false') {
          $('#unvisible').attr('checked', true);
        }

        $('#delete').click(function() {
          that.deleteItem(id, function() {
            that.setList();
            $.dialog.close();
            $.msgbox('삭제 되었습니다.');
          });
        });
      });
    },

    /**
     * 채용 분야 삭제
     * @param id
     * @param callback
     */
    deleteItem: function(id, callback) {
      if (confirm('정말 삭제 하시겠습니까?')) {
        api.career.delete(id, callback);
      }
    },

    /**
     * 초기화
     */
    init: function() {
      that.setList();
      $('#create').click(that.showCreateDialog);
      $('.edit').click(that.showEditDialog);
    }
  };

  $.extend(this, careerUI);
}
