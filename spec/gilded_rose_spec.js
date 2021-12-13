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
      var item = new Item('mango', 3, 0);
      expect(item.qualityNextDay()).toEqual(0);
    });
    describe("given the item is past the sell-by-date", function () {
      it("should by two less than current quality", function () {
        var item = new Item('apple', 0, 3);
        expect(item.qualityNextDay()).toEqual(1);
      });
    });
    describe("given aged brie", function () {
      it("should be one more than current quality", function () {
        var testItem = new AgedBrie('brie', 1, 1);
        console.log(testItem.qualityNextDay());
        console.log(testItem.calculateDepValue());
        expect(testItem.qualityNextDay()).toEqual(2);
      });
    });
  });
});
