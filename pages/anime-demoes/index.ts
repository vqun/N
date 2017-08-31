import Anime from 'animejs'
const anime = Anime({
  targets: '#wrap .cute-cube',
  translateX: {
    value: '+=200',
    duration: 1000
  },
  translateY: [
    { value: 100, duration: 500 },
    { value: 0, duration: 500 }
  ]
})