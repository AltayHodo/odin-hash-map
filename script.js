import LinkedList from './linkedList.js';

class HashMap {
  constructor() {
    this.buckets = new Array(16);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let node = this.buckets[index];
      while (node) {
        if (node.first.key === key) {
          node.first.value = value;
          return;
        }
        node = node.rest;
      }
      this.buckets[index].append({
        key,
        value,
      });
    } else {
      this.buckets[index] = new LinkedList({
        key,
        value,
      });
    }
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (this.buckets[index]) {
      let node = this.buckets[index];
      while (node) {
        if (node.first.key === key) {
          return node.first.value;
        }
        node = node.rest;
      }
      return null;
    }
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (!this.buckets[index]) {
      return false;
    } else {
      let node = this.buckets[index];
      while (node) {
        if (node.first.key === key) {
          return true;
        }
        node = node.rest;
      }
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    if (!this.buckets[index]) {
      return false;
    } else {
      let node = this.buckets[index];
      if (node.first.key === key) {
        this.buckets[index] = node.rest;
        return true;
      }
      while (node.rest) {
        if (node.rest.first.key === key) {
          node.rest = node.rest.rest;
          return true;
        }
        node = node.rest;
      }
      return false;
    }
  }

  length() {
    let count = 0;
    this.buckets.forEach((item) => {
      if (item) {
        count += item.size();
      }
    });
    return count;
  }

  clear() {
    this.buckets = new Array(16);
  }

  keys() {
    let array = [];
    this.buckets.forEach((item) => {
      if (item) {
        let node = item;
        while (node) {
          array.push(node.first.key);
          node = node.rest;
        }
      }
    });
    return array;
  }

  values() {
    let array = [];
    this.buckets.forEach((item) => {
      if (item) {
        let node = item;
        while (node) {
          array.push(node.first.value);
          node = node.rest;
        }
      }
    });
    return array;
  }

  entries() {
    let array = [];
    this.buckets.forEach((item) => {
      if (item) {
        let node = item;
        while (node) {
          array.push([node.first.key, node.first.value]);
          node = node.rest;
        }
      }
    });
    return array;
  }
}


