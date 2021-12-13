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

class AgedBrie extends Item {
  calculateDepValue() {
    return this.sellIn <= 0 ? -2 : -1;
  }
}

class Sulfuras extends Item {
  itemNextDay() {
    return this;
  }
}

class BackStagePass extends Item {
  calculateDepValue() {
    if (this.sellIn === 0) {
      return this.quality;
    } else if (this.sellIn <= 5) {
      return -3;
    } else if (this.sellIn <= 10) {
      return -2;
    } else {
      return -1;
    }
  }
}

class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateInventory(items) {
    return items.map(function (item) {
      return item.itemTomorrow();
    });
  }

  update_quality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].quality = this.items[i].qualityNextDay();
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
    }

    return this.items;
  }
}
