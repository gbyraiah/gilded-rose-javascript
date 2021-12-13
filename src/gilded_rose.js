class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  qualityNextDay() {
    if (this.quality > 50) return this.quality;
    let qualityNextDay = this.quality - this.calculateDepValue();
    if (qualityNextDay < 0) return 0;
    if (qualityNextDay >= 50) return 50;
    return qualityNextDay;
  }

  itemNextDay() {
    this.quality = this.qualityNextDay();
    this.sellIn--;
    return this;
  }

  calculateDepValue() {
    return this.sellIn === 0 ? 2 : 1;
  }
}

class DefaultItem extends Item {
  itemNextDay() {
    this.quality = this.qualityNextDay();
  }
}
class AgedBrie extends DefaultItem {
  calculateDepValue() {
    return this.sellIn <= 0 ? -2 : -1;
  }
}

class Sulfuras extends DefaultItem {
  calculateDepValue() {
    return 0;
  }

  itemNextDay() {
    return this;
  }
}

class BackStagePass extends DefaultItem {
  calculateDepValue() {
    switch (true) {
      case this.sellIn <= 0:
        return this.quality;
      case this.sellIn <= 5:
        return -3;
      case this.sellIn <= 10:
        return -2;
      default:
        return -1;
    }
  }
}

class ConjuredItem extends DefaultItem {
  calculateDepValue() {
    return this.sellIn <= 0 ? 4 : 2;
  }
}

class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  update_quality() {
    return this.items.map(function (item) {
      return item.itemNextDay();
    });
  }
}
