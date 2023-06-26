export default class Section{
  constructor({ items, renderer}, container){
    this.items = items;
    this._renderer = renderer;
    this._container = container;
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
