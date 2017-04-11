import $ from './dom-tils';

var AllPages = [];
export default function Pageit(el) {
  var page = $(el);
  AllPages.push(page);
}