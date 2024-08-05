export default class Section {
  constructor({ renderer }, containerSelector) {
    this._items = [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
