class LinkedList {
  constructor(first, rest = null) {
    this.first = first;
    this.rest = rest;
  }

  append(value) {
    let temp = this;
    while (temp.rest) {
      temp = temp.rest;
    }
    temp.rest = new LinkedList(value);
  }

  prepend(value) {
    let newList = new LinkedList(this.first, this.rest);
    this.first = value;
    this.rest = newList;
  }

  size() {
    if (this.rest) {
      return 1 + this.rest.size();
    }
    return 1;
  }

  head() {
    return this.first;
  }

  tail() {
    let temp = this;
    while (temp.rest) {
      temp = temp.rest;
    }
    return temp.first;
  }

  at(index) {
    if (index >= this.size()) {
      return new Error('too big');
    }
    if (index === 0) {
      return this.first;
    } else {
      return this.rest.at(index - 1);
    }
  }

  pop() {
    if (!this.rest) {
      let value = this.first;
      this.first = null;
      return value;
    }
    let temp = this;
    while (temp.rest.rest) {
      temp = temp.rest;
    }
    let last = temp.rest.first;
    temp.rest = null;
    return last;
  }

  contains(value) {
    if (!this.rest) {
      return this.first === value;
    }
    if (this.first === value) {
      return true;
    }
    return this.rest.contains(value);
  }

  find(value) {
    if (this.first === value) {
      return 0;
    }
    if (!this.rest) {
      return null;
    }
    const restIndex = this.rest.find(value);
    return restIndex !== null ? restIndex + 1 : null;
  }

  toString() {
    if (this.rest) {
      return `( ${this.first} ) -> ` + this.rest.toString();
    }
    if (!this.rest) {
      return `( ${this.first} ) -> null`;
    }
  }
}

export default LinkedList;