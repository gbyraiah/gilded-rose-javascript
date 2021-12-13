describe("Gilded Rose", function () {
  describe("#qualityNextDay", function () {
    describe("given Sulfuras", function () {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.update_quality();
      it("should not change quality value", function () {
        expect(items[0].quality).toEqual(80);
      });
      describe("given original quality is greater than 50", function () {
        it("should not change quality value", function () {
          const gildedRose = new GildedRose([
            new Item("Sulfuras, Hand of Ragnaros", 0, 80),
          ]);
          const items = gildedRose.update_quality();
          expect(items[0].quality).toEqual(80);
        });
      });
    });
    describe("given AgedBrie", function () {
      it("should increase quality value", function () {
        var item = new AgedBrie('brie', 10, 10);
        expect(item.qualityNextDay()).toEqual(11);
      });
      it("should not increase quality value above 50", function () {
        var item = new AgedBrie('brie', 10, 50);
        expect(item.qualityNextDay()).toEqual(50);
      });
    });
    it("should not reduce quality to less than zero", function () {
      const gildedRose = new GildedRose([new Item("mango", 1, 0)]);
      const items = gildedRose.update_quality();
      expect(items[0].quality).toEqual(0);
    });
    it("should reduce days to sell by one", function () {
      const gildedRose = new GildedRose([new Item("mango", 1, 0)]);
      const items = gildedRose.update_quality();
      expect(items[0].sellIn).toEqual(0);
    });
    describe("given that item is not brie, sulfuras, backstage pass", function () {
      it("should reduce quality value by 1", function () {
        const gildedRose = new GildedRose([new Item("mango", 1, 0)]);
        const items = gildedRose.update_quality();
        expect(items[0].quality).toEqual(0);
      });
    });
    describe("given BackStagePass", function () {
      describe("given 10 or fewer days until sell-by date", function () {
        it("should increase by 2", function () {
          var testItem = new BackStagePass('pass', 10, 20);
          expect(testItem.qualityNextDay()).toEqual(22);
        });
      });
      describe("given 5 or fewer days until sell-by date", function () {
        it("should increase by 3", function () {
          var testItem = new BackStagePass('pass', 5, 20);
          expect(testItem.qualityNextDay()).toEqual(23);
        });
      });
      describe("given that concert has happened", function () {
        it("should be zero", function () {
          var testItem = new BackStagePass('pass', 0, 20);
          expect(testItem.qualityNextDay()).toEqual(0);
        });
      })
    });
    describe("given the item is not brie, sulfuras, backstage pass or conjured", function () {
      describe("given the item is within the sell-by-date", function () {
        it("should by one less than current quality", function () {
          var item = new Item("mango", 3, 3);
          expect(item.qualityNextDay()).toEqual(2);
          expect(item.qualityNextDay()).toEqual(2);
        });
      });
    });
    it("should never decrease past zero", function () {
      var item = new Item("mango", 3, 0);
      expect(item.qualityNextDay()).toEqual(0);
    });
    it("should never be higher than 50", function () {
      var item = new AgedBrie('brie', 3, 50);
      expect(item.qualityNextDay()).toEqual(50);
    });

    describe("given the item is past the sell-by-date", function () {
      it("should by two less than current quality", function () {
        var item = new Item("mango", 0, 3);
        expect(item.qualityNextDay()).toEqual(1);
      });
    });
    describe("given aged brie", function () {
      it("should be one more than current quality", function () {
        var item = new AgedBrie("brie", 1, 1);
        expect(item.qualityNextDay()).toEqual(2);
      });
    });
    describe("given it is passed expiry", function () {
      it("should be equal to 3", function () {
        var item = new AgedBrie("brie", 0, 1);
        expect(item.qualityNextDay()).toEqual(3);
      });
    });
    describe("given it is passed expiry", function () {
      it("should increase quality value by 2", function () {
        var item = new AgedBrie("brie", 0, 20);
        expect(item.qualityNextDay()).toEqual(22);
      });
      it("should be two more than current quality", function () {
        var item = new AgedBrie("brie", 0, 1);
        expect(item.qualityNextDay()).toEqual(3);
      });
    });
    describe("given sulfuras as item", function () {
      it("should value of quality be 50", function () {
        var item = new Sulfuras("sulfuras", 1, 50);
        expect(item.qualityNextDay()).toEqual(50);
      });
    });
    describe("given BackStagePass", function () {
      describe("given it is has more than 10 days to expire", function () {
        it("should increase by 1", function () {
          var testItem = new BackStagePass("pass", 11, 20);
          expect(testItem.qualityNextDay()).toEqual(21);
        });
      });
      describe("given 10 or fewer days until sell-by date", function () {
        it("should increase by 2", function () {
          var testItem = new BackStagePass("pass", 10, 20);
          expect(testItem.qualityNextDay()).toEqual(22);
        });
      });
      describe("given 5 or fewer days until sell-by date", function () {
        it("should increase by 3", function () {
          var testItem = new BackStagePass("pass", 5, 20);
          expect(testItem.qualityNextDay()).toEqual(23);
        });
      });
      describe("given that the item has expired", function () {
        it("should be zero", function () {
          var item = new BackStagePass("pass", 0, 20);
          expect(item.qualityNextDay()).toEqual(0);
        });
      });
    });
  });
});
