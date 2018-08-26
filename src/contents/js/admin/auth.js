/**
 * Firebase Auth handler
 * @constructor
 */
function Auth() {
  console.log('Loaded API', arguments);

  /**
   * 로그인
   * @param email
   * @param password
   * @param errorCallback
   */
  this.signIn = function(email, password, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('login errorCode', errorCode);
      console.log('login errorMessage', errorMessage);

      errorCallback && errorCallback(errorMessage);
    });
  };

  /**
   * 로그아웃
   * @param success
   * @param error
   */
  this.signOut = function(success, error) {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  };

  /**
   * 로그인 상태 감지 리스너
   * @param callback
   */
  this.onAuthChanged = function(callback) {
    // 현재 로그인 정보
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log('로그인 O', user);
        callback && callback(true);
      } else {
        // User is signed out.
        console.log('로그인 X', user);
        callback && callback(false);
      }
    });
  }
}
