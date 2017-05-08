module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'Explorer >= 8',
        'Firefox >= 24',
        'Chrome >= 20',
        'Safari >= 6',
        'Opera >= 12',
        'iOS >= 7',
        'Android >= 4'
      ]
    })
  ]
}