/**
 * SliderUI handler
 * @constructor
 */
function SliderUI() {
  var MAX_WIDTH = 1000;
  var slider1;
  var options = {
    $AutoPlay: 1,
    $Idle: 3000,
    $ArrowNavigatorOptions: {
      $Class: $JssorArrowNavigator$
    }
  };

  function scaleSlider() {
    var containerElement = slider1.$Elmt.parentNode;
    var containerWidth = containerElement.clientWidth;

    if (containerWidth) {
      var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
      slider1.$ScaleWidth(expectedWidth);
    } else {
      window.setTimeout(scaleSlider, 30);
    }
  }

  function init() {
    slider1 = new $JssorSlider$('slider1', options);

    scaleSlider();
    $Jssor$.$AddEvent(window, 'resize', scaleSlider);
    $Jssor$.$AddEvent(window, 'orientationchange', scaleSlider);
  }

  $.extend(this, {
    init: init
  });
}
