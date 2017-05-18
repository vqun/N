import $ from './dom-tils'
import Swiper from './swiper'

const Body = document.body

class Page {
  private config
  constructor(private page) {
    this.init()
  }
  init() {
    const { name, o, i } = this.page.data()[0]
    this.config = { name, o, i }
  }
  pageIn() {
    const { o, i } = this.config;
    this.page.swapClass(o, i).show()
  }
  pageOut() {
    const { o, i } = this.config;
    this.page.swapClass(i, o).hide()
  }
}

export default class Pageit {
  private pageEls = null
  private pages = []
  private currentPage = null
  private currentPageIndex = 0
  private MaxPageIndex = 0
  constructor(el, private container = Body) {
    this.pageEls = $(el, this.container)
    this.init()
  }
  init() {
    const that = this
    this.pageEls.forEach(function(el, k) {
      !!el.dataset && that.pages.push(new Page(this.item(k)))
    }, this.pageEls)
    this.run()
  }
  run() {
    this.currentPage = this.pages[0]
    this.MaxPageIndex = this.pages.length - 1
    Swiper(this.container, {
      swipeLeft: () => {
        let nextPageIndex = ++this.currentPageIndex
        if(nextPageIndex > this.MaxPageIndex) nextPageIndex = 0;
        this.currentPage.pageOut();
        (this.currentPage = this.pages[nextPageIndex]).pageIn();
        this.currentPageIndex = nextPageIndex
      },
      swipeRight: () => {
        let nextPageIndex = --this.currentPageIndex
        if(nextPageIndex < 0) nextPageIndex = this.MaxPageIndex;
        this.currentPage.pageOut();
        (this.currentPage = this.pages[nextPageIndex]).pageIn();
        this.currentPageIndex = nextPageIndex
      }
    });
    this.currentPage.pageIn()
  }
}