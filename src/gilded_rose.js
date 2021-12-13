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
  calculateDepValue() {
    return 0;
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

  update_quality() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            this.items[i].quality = this.items[i].qualityNextDay();
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].qualityNextDay();
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].qualityNextDay();
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
