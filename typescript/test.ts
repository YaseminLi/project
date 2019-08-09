let deck = {
    suits: ['one', 'two', 'three', 'four'],
    cards: Array(52),
    createCard: function () {
        return () =>{
            let number=0
            return this.suits[number];

        }
    }
}
let card=deck.createCard()
card();
