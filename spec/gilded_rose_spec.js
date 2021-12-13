describe("Gilded Rose", function () {

  describe("#qualityNextDay", function () {
    describe("given the item is not brie, sulfuras, backstage pass or conjured", function () {
      describe("given the item is within sell-by-date", function () {
        it("should by one less than current quality", function () {
          var testItem = new Item("mango", 3, 3);
          expect(testItem.qualityNextDay()).toEqual(2);
        });
      });
    });
  });
});
