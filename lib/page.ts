import $ from './dom-tils'
import Swiper from './swiper'

const Body = document.body

class Page {
  private config
  constructor(private page) {
    this.init()
  }
  init() {
    const { name, o, i } = this.page.dataset
    this.config = { name, o, i }
  }
  pageIn() {
    const { o, i } = this.config;
    this.page.swapClass(o, i)
  }
  pageOut() {
    const { o, i } = this.config;
    this.page.swapClass(i, o)
  }
}

export default class Pageit {
  private pageEls = null
  private pages = []
  private currentPage = null
  private currentPageIndex = 0
  private MaxPage = 0
  constructor(el, private container = Body) {
    this.pageEls = $(el, this.container)
    this.init()
  }
  init() {
    this.pageEls.forEach(el => this.pages.push(new Page(el)))
    this.run()
  }
  run() {
    this.currentPage = this.pages[0]
    this.MaxPage = this.pages.length
    Swiper(this.container, {
      swipeLeft: () => {
        let nextPageIndex = ++this.currentPageIndex
        if(nextPageIndex > this.MaxPage) nextPageIndex = 0;
        this.currentPage.pageOut()
        (this.currentPage = this.pages[nextPageIndex]).pageIn()
      },
      swipeRight: () => {
        let nextPageIndex = --this.currentPageIndex
        if(nextPageIndex < 0) nextPageIndex = this.MaxPage;
        this.currentPage.pageOut()
        (this.currentPage = this.pages[nextPageIndex]).pageIn()
      }
    });
  }
}