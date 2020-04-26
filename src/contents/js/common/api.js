/**
 * TODO
 * Firebase 는 IE 10이상 지원?
 *
 * Firebase DB API Handler
 * @constructor
 */
function API() {
  console.log('Loaded API', arguments);

  var firebaseConfig = {
    apiKey: 'AIzaSyBjWIJFqgQNzBVkS8zmdK88jjughMm0Qec',
    authDomain: 'iportfolio-1532830529208.firebaseapp.com',
    databaseURL: 'https://iportfolio-1532830529208.firebaseio.com/'
  };
  var db;

  /**
   * NEWS API
   * @type {{create: create, read: read, update: update, delete: delete}}
   */
  var news = {
    create: function (data, callback) {
      var id = db.ref().child('news').push().key;
      var title = data.title;
      var link = data.link;
      var timestemp = new Date(data.date).getTime();

      db.ref('news/' + id).set(
        {
          id: id,
          title: title,
          link: link,
          date: timestemp
        },
        function (error) {
          if (error) {
            // The write failed...
            console.error('saved error', error);
          } else {
            // Data saved successfully!
            console.log('saved');
            callback && callback();
          }
        }
      );
    },
    read: function (count, callback) {
      var result = [];

      if (count) {
        db.ref('news/')
          .limitToLast(count)
          .orderByChild('date')
          .once('value', function (data) {
            data.forEach(function (obj) {
              result.unshift(obj.val());
            });
            callback(result);
          });
      } else {
        // orderByChild()	지정된 하위 키 또는 중첩된 하위 경로의 값에 따라 결과를 정렬합니다.
        db.ref('news/')
          .orderByChild('date')
          .once('value', function (data) {
            data.forEach(function (obj) {
              result.unshift(obj.val());
            });
            callback(result);
          });
      }
    },
    update: function (data, callback) {
      var id = data.id;
      data.date = new Date(data.date).getTime();

      db.ref('news/' + id).update(data, function (error) {
        if (error) {
          // The write failed...
          console.error('update error', error);
        } else {
          // Data saved successfully!
          console.log('updated');
          callback && callback();
        }
      });
    },
    delete: function (id, callback) {
      db.ref('news/' + id).remove(function (error) {
        if (error) {
          // The write failed...
          console.error('delete error', error);
        } else {
          // Data saved successfully!
          console.log('deleted');
          callback && callback();
        }
      });
    }
  };

  /**
   * Career API
   * @type {{create: create, read: read, update: update, delete: delete}}
   */
  var career = {
    create: function (data, callback) {
      var id = db.ref().child('career').push().key;
      var title = data.title;
      var detail = data.detail;
      var link = data.link;
      var visible = data.visible;
      var lastUpdateDate = data.lastUpdateDate;

      db.ref('career/' + id).set(
        {
          id: id,
          title: title,
          detail: detail,
          link: link,
          visible: visible,
          lastUpdateDate: lastUpdateDate
        },
        function (error) {
          if (error) {
            // The write failed...
            console.error('saved error', error);
          } else {
            // Data saved successfully!
            console.log('saved');
            callback && callback();
          }
        }
      );
    },
    read: function (callback) {
      var result = [];
      db.ref('career/').once('value', function (data) {
        data.forEach(function (obj) {
          result.unshift(obj.val());
        });
        callback(result);
      });
    },
    update: function (data, callback) {
      var id = data.id;
      db.ref('career/' + id).update(data, function (error) {
        if (error) {
          // The write failed...
          console.error('update error', error);
        } else {
          // Data saved successfully!
          console.log('updated');
          callback && callback();
        }
      });
    },
    delete: function (id, callback) {
      db.ref('career/' + id).remove(function (error) {
        if (error) {
          // The write failed...
          console.error('delete error', error);
        } else {
          // Data saved successfully!
          console.log('deleted');
          callback && callback();
        }
      });
    }
  };

  /**
   * Firebase 앱을 초기화 하고, realtime DB 인스턴스를 실행한다.
   */
  function initFirebaseDB() {
    // Google Firebase DB Config
    // See https://firebase.google.com/docs/web/setup#project_setup for how to auto-generate this config
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    db = firebase.database();
  }
  initFirebaseDB();

  /**
   * news interface
   * @type {{create: create, read: read, update: update, delete: delete}}
   */
  this.news = news;

  /**
   * career interface
   * @type {{create: create, read: read, update: update, delete: delete}}
   */
  this.career = career;
}
