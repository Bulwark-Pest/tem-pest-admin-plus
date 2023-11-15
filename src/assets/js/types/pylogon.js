import generateID from 'unique-id-generator';
export class Polygon {
  #polygon = null;
  #note = null;
  #index = null;
  constructor(polygon, note) {
    this.#polygon = polygon;
    this.#note = note;
    this.#index = generateID({ prefix:"polygon-" });
  }

  get polygon() {
    return this.#polygon;
  }

  get latLng() {
    return this.path.getAt(0);
  }

  get path() {
    return this.#polygon.getPath();
  }

  get area() {
    if (!!window.google) {
      const area = google.maps.geometry.spherical.computeArea(this.path) * 10.7639;
      return +area.toFixed(2);
    }
  }

  get note() {
    return this.#note;
  }

  set note(note) {
    if (typeof note === 'string') {
      this.#note = note;
    }
  }

  get index() {
    return this.#index;
  }

  set editable(active) {
    this.#polygon.setEditable(!!active);
  }

  set draggable(active) {
    this.#polygon.setDraggable(!!active);
  }

  removeToMap() {
    this.#polygon.setMap(null)
  }

  check(id) {
    return this.#index === id;
  }
}

