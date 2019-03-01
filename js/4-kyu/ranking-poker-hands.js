// Ranking Poker Hands
// https://www.codewars.com/kata/5739174624fc28e188000465
var Result = { "win": 1, "loss": 2, "tie": 3 }

function PokerHand(cards) {
  this.cards       = cards
  this.cardsSorted = this.sortCards()
  this.cardsStats  = this.getCardStats()
  this.extraValue  = this.getExtraValue()
  this.handValue   = this.getHandValue()
}

// Sort hands based on its value
PokerHand.prototype.sortCards = function() {
  const VALUES = '23456789TJQKA'  
  return this.cards
    .split(" ").map(c => {
      return {
        card  : c.charAt(0),
        value : VALUES.indexOf(c.charAt(0)) + 1,
        suit  : c.charAt(1)
      }
    }).sort((a,b) => b.value - a.value)
}

// Create a card stats
PokerHand.prototype.getCardStats = function() {
  return Object.entries( this.cardsSorted
    .reduce((a,v) => {
      a[v.value] = a[v.value] ? a[v.value] + 1 : 1
      return a
    }, {})
  )
  .sort((a,b) => b[1] === a[1] ? b[0] - a[0] : b[1] - a[1] )
  .map(e => [e[1], e[0]])
}

// Get simple value of a hand only based on cards values
// This value is used for same hands
PokerHand.prototype.getExtraValue = function() {
  return this.cardsStats.reduce((a,v,i) => {
    return a + v[1] * Math.pow(14,this.cardsStats.length - i - 1)
  },0)
} 

PokerHand.prototype.getHandValue = function() {
  let isFlush         = () => this.cardsSorted.filter((e,i,a) => e.suit === a[0].suit).length === 5
  let isStraight      = () => this.cardsSorted.filter((e,i,a) => i === 0 || (a[i].value + 1) === a[i-1].value).length === 5
  let isRoyalFlush    = () => isFlush() && isStraight() && this.cardsSorted[0].card === "A"
  let isStraightFlush = () => isFlush() && isStraight() && this.cardsSorted[0].card !== "A"
  let isFourOfAKind   = () => this.cardsStats[0][0] === 4
  let isFullHouse     = () => this.cardsStats[0][0] === 3 && this.cardsStats[1][0] === 2
  let isThreeOfAKind  = () => this.cardsStats[0][0] === 3 && this.cardsStats[1][0] !== 2
  let isTwoPairs      = () => this.cardsStats[0][0] === 2 && this.cardsStats[1][0] === 2
  let isPair          = () => this.cardsStats[0][0] === 2 && this.cardsStats[1][0] === 1

  if (isRoyalFlush())    return 30000000000
  if (isStraightFlush()) return 2000000000  + this.extraValue
  if (isFourOfAKind())   return 1000000000  + this.extraValue
  if (isFullHouse())     return 600000000   + this.extraValue
  if (isFlush())         return 500000000   + this.extraValue
  if (isStraight())      return 400000000   + this.extraValue
  if (isThreeOfAKind())  return 300000000   + this.extraValue
  if (isTwoPairs())      return 200000000   + this.extraValue
  if (isPair())          return 100000000   + this.extraValue
  
  return this.extraValue
}

PokerHand.prototype.compareWith = function(hand){
  if (this.handValue > hand.handValue) return Result.win
  if (this.handValue < hand.handValue) return Result.loss
  return Result.tie
};