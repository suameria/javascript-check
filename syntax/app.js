/**
 * cf.
 * https://www.youtube.com/watch?v=pnsieVYy72M&list=PLwM1-TnN_NN7-zdRV8YsGUB82VVhfYiWW
 * https://www.youtube.com/watch?v=YRbpoUz8Y6g
 * https://www.youtube.com/watch?v=ig3GosWuKF0
 */

/**
 * WEBでのJavaScriptの仕事
 * 1. データのやりとり
 * 2. DOMの操作
 */

/**
 * const 再宣言できない、再代入できない(*1)
 * let   再宣言できない、再代入できる
 * var   再宣言できる、再代入できる <- ES6からconst, letが出てきたのでもう使わないようにする
 */

// 変数
let test1 = 'test1';
test1 = 'test12';
console.log(test1);

// 定数
const test2 = 'test2';
// 定数だからエラーになる
// test2 = 'test22';
console.log(test2);

// 配列
let arr1 = ['a', 'b', 'c'];
console.log(arr1, arr1[0], arr1[1], arr1[2]);

// オブジェクト
const human = {
  age: 30,
  move() {
      console.log('run move method.');
  },
};
console.log(human.age, human.move());

// window オブジェクト WEBブラウザ全体のオブジェクト
const screenHeight = window.screen.height;
const screenWidth = window.screen.width;
console.log(screenHeight, screenWidth);

// *1 厳密には再代入できる
// 配列とオブジェクトの場合再代入可能
const constObj = {
  greeting: 'hello1',
}
constObj.greeting = 'hello2';
console.log(constObj.greeting);


// ループ
arr1.forEach((arr, index) => {
  console.log(arr, index);
});


// 条件
if (arr1.length < 10) {
  console.log('満たしているよ');
} else {
  console.log('満たしてない');
}

// // 関数
const canTweet = (text) => {
  return text.length <= 140;
  // return text.length <= 1;
};

const alertTweet = (text) => {
  if (canTweet(String(text))) {
      console.log('you can tweet!!');
  }
};

alertTweet(111);


// コールバック関数
const unfollow = () => {
  console.log('フォローを外しました');
};

const cancelTweet = () => {
  console.log('ツイートをキャンセルしました');
};

const confirmed = (fn) => {
  if (window.confirm('実行しますか')) {
      fn();
  }
};

// confirmed(unfollow);
// confirmed(cancelTweet);
