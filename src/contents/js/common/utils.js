function Utils() {
  /**
   * 스크린 사이즈 정보 추출
   */
  function getScreenSize() {
    return {
      width: screen.width,
      height: screen.height,
      ratio: screen.width / screen.height
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
   * exports
   */
  this.detectAppleSafariPcMode = detectAppleSafariPcMode;
}
