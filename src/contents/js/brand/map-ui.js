/**
 * Map UI handler
 * @constructor
 */
function MapUI() {
  var that = this;
  var mapUI = {
    /**
     * 지도 줌 레벨
     */
    zoom: 17,

    /**
     * 지도 출력 함수
     * @param data
     */
    setMap: function(data) {
      // 지도
      var map = new google.maps.Map(data.el, {
        center: data.position,
        zoom: that.zoom
      });

      // 마커
      var marker = new google.maps.Marker({
        position: data.position,
        map: map
      });

      // 말풍선
      var infowindow = new google.maps.InfoWindow({ content: data.title });
      google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map, marker);
      });
    },

    /**
     * 초기화
     */
    init: function() {
      var headOfficePos = {
        lat: 37.568532,
        lng: 126.981632
      };
      var subOfficePos = {
        lat: 37.497072,
        lng: 127.0285777
      };

      that.setMap({
        el: document.getElementById('headoffice'),
        position: headOfficePos,
        title: "아이포트폴리오 본사"
      });

      that.setMap({
        el: document.getElementById('suboffice'),
        position: subOfficePos,
        title: "아이포트폴리오 연구소"
      });
    }
  };

  $.extend(this, mapUI);
}

