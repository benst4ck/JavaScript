function enumProduct(namesToValues) {
  var enumeration = function () { throw "Can't Instantiate Enumerations"; };  // 这个虚拟的构造函数是最终的返回值 不能用它来创建该类型的新实例
  var proto = enumeration.prototype = {
    constructor: enumeration,
    toString: function () { return this.name; },
    valueOf: function () { return this.value; },  // enumeration对象进行大小比较或是算术运算时 自动调用该方法
    toJSON: function () { return this.name; }
  };

  enumeration.values = [];  // 用以存放枚举对象的数组

  //这里创建新类型的实例
  for (name in namesToValues){
    var e = Object.create(proto);  // 创建一个实例对象 并添加两个属性
    e.name = name;
    e.value = namesToValues[name];

    enumeration[name] = e;  // 将该实例设置为虚拟构造函数的属性
    enumeration.values.push(e);  // 将该实例添加到数组中
  }

  //一个类方法 用来对类的实例进行迭代
  enumeration.everyOne = function (f, context) {
    var arr = [];
    for (var i=0; i<this.values.length; i++) {
      var re = f.call(context, this.values[i]);
      arr.push(re);
    }
    return arr;
  };

  enumeration.foreach = function (f, context) {
    for (var i=0; i<this.values.length; i++)
      f.call(context, this.values[i]);
  };

  return enumeration;
}


var Coin = enumProduct({penny:1, nickel:5, dime:10, quarter:25});

Coin;
// ƒ () { throw "Can't Instantiate Enumerations"; }
Object.keys(Coin);
// ["values", "penny", "nickel", "dime", "quarter", "everyOne", "foreach"]

var x = Coin.dime; 
x;
// enumeration {name: "dime", value: 10}

// 这里的Coin就是enumeration函数 
x instanceof Coin;  // 查看实例x是否属于Coin类 如果x继承自Coin.prototype 则返回true 间接继承也会返回true
// true
x.constructor === Coin;  // 检测实例x的构造函数是否是Coin
// true

typeof x
// "object"

x + 3*Coin.nickel == Coin.quarter;  // 自动调用valueOf
// true

String(x) + ':' + x;  // 调用toString
// "dime:10"

Coin.values;
// [enumeration, enumeration, enumeration, enumeration]

Coin.values[1];
// enumeration {name: "nickel", value: 5}

function cube(n) {
  var re = n*n*n;
  return re;
}

Coin.everyOne(cube);
// [1, 125, 1000, 15625]


// 定义扑克类
function Card(suit, rank) {
  this.suit = suit;  // 花色
  this.rank = rank;  // 点数
}

// 给构造函数添加属性 使用枚举类型定义花色和点数
Card.Suit = enumProduct({Club: 1, Diamonds: 2, Heart: 3, Spades: 4});  // 调用工厂函数enumProduct将返回一个虚拟构造函数
Card.Rank = enumProduct({Two:2, Three:3, Four:4, Five:5, Six:6, Seven:7, Eight:8, Nine:9, Ten:10, Jack:11, Queen:12, King:13, Ace:14});

Card.Suit;
// ƒ () { throw "Can't Instantiate Enumerations"; }
Object.keys(Card.Suit);
// ["values", "Club", "Diamonds", "Heart", "Spades", "everyOne", "foreach"]

Card.Suit.Diamonds;
// enumeration {name: "Diamonds", value: 2}

// 传入enumProduct的参数被生成为一些对应的enumeration类对象 既可以通过构造函数Card的Suit属性访问到 也可以通过values数组访问到
Card.Suit.values;
// [enumeration, enumeration, enumeration, enumeration]
Card.Suit.values[0];
// enumeration {name: "Club", value: 1}


// 定义描述牌面的文本
Card.prototype.toString = function () {
  return this.rank.toString() + 'of' + this.suit.toString();
};
// 比较两张扑克牌的点数大小
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1;
  if (this.rank > that.rank) return 1;
  return 0;
};

// 比较函数
// 两个参数分别指两张扑克牌 如果返回一个小于0的值 意味着扑克牌a排在前面 如果返回一个大于0的值 意味着扑克牌b排在前面 如果返回0 说明两张牌一样大
Card.orderByRank = function (a, b) { return a.compareTo(b); };

Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1;  // 返回小于0的值时 第一个参数a排在数组的前面
  if (a.suit > b.suit) return 1;
  if (a.rank < b.rank) return -1;  // 花色一样的情况下 进行点数比较
  if (a.rank > b.rank) return 1;
  return 0;
};

Object.keys(Card);
// ["Suit", "Rank", "orderByRank", "orderBySuit"]
Card.prototype;
// {toString: ƒ, compareTo: ƒ, constructor: ƒ}

// 定义用以表示一副标准扑克的类
function Deck() {
  var cards = this.cards = [];      // 这里this指向通过new Deck()创建的对象 即Deck类的实例 为实例添加一个cards属性 该数组用来存放扑克牌
  console.log(this);  // Deck {cards: Array(0)}

  // foreach方法会遍历调用者(Card.Suit和Card.Rank)的values属性 然后将数组values的元素传递到形参s(Card.Suit)或形参r(Card.Rank)
  // 这里相当于一个嵌套循环
  Card.Suit.foreach(function (s) {
                      console.log(s);
                      Card.Rank.foreach(function (r) {
                                          console.log(r);
                                          cards.push(new Card(s, r));  // 创建一张扑克牌
                                        });
                    });
  console.log(cards);     // [Card × 52]    Card类的实例对象都具有toString和compareTo方法
}

// 洗牌
Deck.prototype.shuffle = function () {  // 通常是Deck类的实例调用洗牌方法 除第一张牌以外 每张牌都会被调换一次位置
    var deck = this.cards, len = deck.length;
    for (var i=len-1; i>0; i--) {
        var r = Math.floor(Math.random()*(i+1)), temp;  // Math.random()随机返回一个0到1之间的浮点数 Math.floor()向下取整
        temp = deck[i], deck[i] = deck[r], deck[r] = temp;
    }
    return this;  // 返回调用该方法的实例对象
};

// 发牌 n指定发牌的张数
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) throw 'Out of Cards';
    return this.cards.splice(this.cards.length - n, n);  // 从索引为this.cards.length - n的地方开始 向数组尾部删除n个元素 splice方法返回被删除的元素组成的数组
};

Object.keys(Deck);
// []
Deck.prototype;
// {shuffle: ƒ, deal: ƒ, constructor: ƒ}

function showCardsBySuit(hand) {  // 显示牌的花色
  var re = [];
  for (var i=0; i<hand.length; i++)
    re.push(hand[i].suit.name);
  return re;
}

function showCardsByRank(hand) {  // 显示牌的点数
  var re = [];
  for (var i=0; i<hand.length; i++)
    re.push(hand[i].rank.value);
  return re;
}

function showCards(hand) {  // 以文本形式显示点数和花色
  var re = [];
  for (var i=0; i<hand.length; i++)
    re.push(hand[i].toString());  // 调用Card的toString方法
  return re;
}


var deck = (new Deck()).shuffle();
/*
Deck {cards: Array(0)}
enumeration {name: "Club", value: 1}  创建梅花的所有牌
enumeration {name: "Two", value: 2}
enumeration {name: "Three", value: 3}
enumeration {name: "Four", value: 4}
enumeration {name: "Five", value: 5}
enumeration {name: "Six", value: 6}
enumeration {name: "Seven", value: 7}
enumeration {name: "Eight", value: 8}
enumeration {name: "Nine", value: 9}
enumeration {name: "Ten", value: 10}
enumeration {name: "Jack", value: 11}
enumeration {name: "Queen", value: 12}
enumeration {name: "King", value: 13}
enumeration {name: "Ace", value: 14}
enumeration {name: "Diamonds", value: 2}  创建方块的所有牌
enumeration {name: "Two", value: 2}
enumeration {name: "Three", value: 3}
enumeration {name: "Four", value: 4}
enumeration {name: "Five", value: 5}
enumeration {name: "Six", value: 6}
enumeration {name: "Seven", value: 7}
enumeration {name: "Eight", value: 8}
enumeration {name: "Nine", value: 9}
enumeration {name: "Ten", value: 10}
enumeration {name: "Jack", value: 11}
enumeration {name: "Queen", value: 12}
enumeration {name: "King", value: 13}
enumeration {name: "Ace", value: 14}
enumeration {name: "Heart", value: 3}  创建红桃的所有牌
enumeration {name: "Two", value: 2}
enumeration {name: "Three", value: 3}
enumeration {name: "Four", value: 4}
enumeration {name: "Five", value: 5}
enumeration {name: "Six", value: 6}
enumeration {name: "Seven", value: 7}
enumeration {name: "Eight", value: 8}
enumeration {name: "Nine", value: 9}
enumeration {name: "Ten", value: 10}
enumeration {name: "Jack", value: 11}
enumeration {name: "Queen", value: 12}
enumeration {name: "King", value: 13}
enumeration {name: "Ace", value: 14}
enumeration {name: "Spades", value: 4}  创建黑桃的所有牌
enumeration {name: "Two", value: 2}
enumeration {name: "Three", value: 3}
enumeration {name: "Four", value: 4}
enumeration {name: "Five", value: 5}
enumeration {name: "Six", value: 6}
enumeration {name: "Seven", value: 7}
enumeration {name: "Eight", value: 8}
enumeration {name: "Nine", value: 9}
enumeration {name: "Ten", value: 10}
enumeration {name: "Jack", value: 11}
enumeration {name: "Queen", value: 12}
enumeration {name: "King", value: 13}
enumeration {name: "Ace", value: 14}
[Card × 52]
*/

deck instanceof Deck;
// true

deck;
// Deck {cards: Array(52)}

// 查看最后一张扑克牌 黑桃3
var lastCard = deck.cards[deck.cards.length-1]
lastCard;
// Card {suit: enumeration, rank: enumeration}
lastCard.suit
// enumeration {name: "Spades", value: 4}
lastCard.rank
// enumeration {name: "Three", value: 3}
lastCard instanceof Card
// true

var hand1 = deck.deal(6);  // 给玩家1发6张牌 hand1只是一个普通数组
deck;  // 还剩余46张
// Deck {cards: Array(46)}

var hand2 = deck.deal(6).sort(Card.orderByRank);  // 给玩家2发6张牌 并且牌按点数由小到大排序
deck;
// Deck {cards: Array(40)}

var hand3 = deck.deal(5).sort(Card.orderBySuit);  // 给玩家3发5张牌 并且牌按花色由小到大排序
deck;
// Deck {cards: Array(35)}

hand1;
// [Card, Card, Card, Card, Card, Card]
hand1[hand1.length-1]  // 黑桃3 与lastCard一致
// Card {suit: enumeration, rank: enumeration}
hand1[hand1.length-1].suit
// enumeration {name: "Spades", value: 4}
hand1[hand1.length-1].rank
// enumeration {name: "Three", value: 3}

showCards(hand1);
// ["KingofDiamonds", "ThreeofHeart", "SevenofSpades", "FourofDiamonds", "TwoofDiamonds", "ThreeofSpades"]
showCardsBySuit(hand1);
// ["Diamonds", "Heart", "Spades", "Diamonds", "Diamonds", "Spades"]

showCardsByRank(hand1);
// [13, 3, 7, 4, 2, 3]

showCardsByRank(hand2);
// [4, 5, 6, 9, 12, 14]

showCardsBySuit(hand3);
// ["Club", "Diamonds", "Heart", "Heart", "Spades"]
