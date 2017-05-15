import $ from './dom-tils'
import Swiper from './swiper'

class Page {
  private config = {}
  constructor(private page) {
    this.init()
  }
  init() {
    const { name, o, i } = this.page.dataset
    this.config = { name, o, i }
  }
}

export default class Pageit {
  private pageEls = null
  private pages = []
  private config = {}
  constructor(el, container = '') {
    this.pageEls = $(el, container)
    this.init()
  }
  init() {
    this.pageEls.forEach((el) => {
      this.pages.push(new Page(el))
    })
    this.run()
  }
  run() {
    Swiper(this.pageEls, {
    });
  }
}