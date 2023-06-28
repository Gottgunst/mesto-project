export default class Section{
  constructor({ items, renderer}, sectionSelector){
    this.items = items;
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  addArray(way='append'){
    const {items, _renderer, _container} = this;

    items.forEach((item)=>{
      _container[way](_renderer(item));
    });
  }

  addItem(item, way='prepend'){
    this._container[way](item);
  }
}
