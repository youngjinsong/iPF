/**
 * serializeObject
 * @returns {Object}
 */
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

/**
 * Object.size
 * @param {Object} obj
 */
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

/**
 * dialog plugin
 */
(function($, win, doc){
  var $dialogWrap;
  var $dialog;

  $.fn.dialog = $.dialog = function(url, callback) {
    if (url) {
      $.get(url, function(res) {
        !$dialogWrap && $.dialog.create();
        $dialogWrap.show().find('.dialog-content').html(res);
        $.dialog.center();
        callback && callback();
      });
    } else {
      this.click(function() {
        $.get(this.href, function(res) {
          !$dialogWrap && $.dialog.create();
          $dialogWrap.show().find('.dialog-content').html(res);
          $.dialog.center();
        });
        return false;
      });
    }
  };

  $.dialog.create = function() {
    $dialogWrap = $([
      '<div class="dialog-wrap">',
        '<div class="dialog-overlay"></div>',
        '<div class="dialog">',
          '<button type="button" class="dialog-close close">×</button>',
          '<div class="dialog-content"></div>',
        '</div>',
      '</div>'
    ].join('\n')).appendTo('body');

    $dialogWrap.on('click', '.close', function() {
      $.dialog.close();
    });
  };

  $.dialog.center = function() {
    $dialog = $dialogWrap.find('.dialog');
    $dialog.css({
      left: ($(win).width()- $dialog.width()) / 2
    });
  };

  $.dialog.close = function() {
    $dialogWrap.hide();
  };

  $(win).resize(function() {
    if($dialogWrap && $dialogWrap.css('display') === 'block') {
      $.dialog.center();
    }
  });

  // ESC keydown dialog Close
  $(doc).keydown(function(e) {
    if($dialogWrap && $dialogWrap.css('display') === 'block') {
      (e.keyCode === 27) && $.dialog.close();
    }
  });
})(jQuery, window, document);


/**
 * msgbox plugin
 */
(function($, win, doc) {
  var maxVisibleTime = 3000;

  $.msgbox = function(text) {
    var $msgBox = $('#msg-box');

    if (!$msgBox.length) {
      $msgBox = $('<div />', { id: "msg-box" });
      $('body').append($msgBox);
    }

    $msgBox.text(text).css({
      left: ($(win).width() - $msgBox.outerWidth(true)) / 2
    }).addClass('visible');

    setTimeout(function() {
      $msgBox.removeClass('visible');
    }, maxVisibleTime);
  };
})(jQuery, window, document);
