var deck = {
    suits: ['one', 'two', 'three', 'four'],
    cards: Array(52),
    createCard: function () {
        var _this = this;
        return function () {
            var number = 0;
            return _this.suits[number];
        };
    }
};
var card = deck.createCard();
card();
