module.exports = function() {

  // Target path
  const srcDir = './src';          // source directory path
  const contentsDir = srcDir + '/contents';
  const watch = {
    js: [
      contentsDir + '/js/common/*.js',
      contentsDir + '/js/brand/*.js',
      contentsDir + '/js/admin/*.js'
    ],
    scss: {
      brand: contentsDir + '/css/scss-brand/*.scss',
      admin: contentsDir + '/css/scss-admin/*.scss',
      all: contentsDir + '/css/**/*.scss',
      result: contentsDir + '/css'
    },
    img: contentsDir + '/img/*',
    html: [
      srcDir + '/*.html',
      srcDir + '/views/*.html'
    ]
  };

  const build = {
    root: './build',
    js: {
      brand: [
        contentsDir + '/js/lib/*.js',
        contentsDir + '/js/common/*.js',
        contentsDir + '/js/brand/*.js'
      ],
      admin: [
        contentsDir + '/js/lib/*.js',
        contentsDir + '/js/common/*.js',
        contentsDir + '/js/admin/*.js'
      ]
    },
    css: contentsDir + '/css/*.css',
    img: contentsDir + '/img/**',
    html: {
      brand: srcDir + '/index.html',
      admin: srcDir + '/views/**/*.html'
    }
  };

  return {
    srcDir: srcDir,
    watch: watch,
    build: build
  }
};
