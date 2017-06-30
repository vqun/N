module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'Explorer >= 9',
        'Firefox >= 35',
        'Chrome >= 40',
        'Safari >= 8',
        'Opera >= 12',
        'iOS >= 8',
        'Android >= 4'
      ]
    })
  ]
}