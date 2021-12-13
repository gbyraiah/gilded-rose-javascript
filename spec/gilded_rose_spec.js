describe("Gilded Rose", function () {
  describe("#qualityNextDay", function () {
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
      var item = new Item("mango", 3, 52);
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
    describe("given sulfuras as item", function () {
      it("should value to zero", function () {
        var item = new Sulfuras("sulfuras", 1, 50);
        expect(item.qualityNextDay()).toEqual(50);
      });
    });
    describe("given BackStagePass", function () {
      describe("given it is has more than 10 days to expire", function () {
        it("should increase by 1", function () {
          var testItem = new BackStagePass('pass', 11, 20);
          expect(testItem.qualityNextDay()).toEqual(21);
        });
      });
      describe("given 10 or fewer days until sell-by date", function () {
        it("should increase by 2");
      });
      describe("given 5 or fewer days until sell-by date", function () {
        it("should increase by 3");
      });
      describe("given that the item has expired", function () {
        it("should be zero");
      });
    });
  });
});
