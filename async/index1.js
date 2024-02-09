// cf. https://www.youtube.com/watch?v=kbKIENQKuxQ

const timeout = 1000;

// 1. setTimeout

// setTimeout(() => console.log(1), timeout);
// console.log(2);

/*
result: 1秒後に1が出力される

2
1
*/


// 2. setTimeout カウントダウンで、タイミングをずらして実行させたい ...

// setTimeout(() => console.log(5), timeout);
// setTimeout(() => console.log(4), timeout);
// setTimeout(() => console.log(3), timeout);
// setTimeout(() => console.log(2), timeout);
// setTimeout(() => console.log(1), timeout);

/*
result: 1秒後に同時に出力される

5
4
3
2
1
*/


// 3. setTimeout カウントダウンで、タイミングをずらして実行させる方法 ... コールバック地獄に！！！

// setTimeout(() => {
//   console.log(5);
//   setTimeout(() => {
//     console.log(4);
//     setTimeout(() => {
//     console.log(3);
//     setTimeout(() => {
//       console.log(2);
//       setTimeout(() => {
//         console.log(1);
//       }, timeout);
//     }, timeout);
//     }, timeout);
//   }, timeout);
// }, timeout);

/*
result: 1秒後ごとに出力される

5
4
3
2
1
*/



// Promiseでカウントダウンをしてみる

new Promise((resolve) => {
  setTimeout(() => {
    console.log(3);
    resolve();
  }, timeout);
}).then(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, timeout);
  });
}).then(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, timeout);
  });
});

/*
result: 1秒後ごとに出力される
setTimeoutのコールバック地獄よりフラットに書けるが、
まだ、見ずらいし可読性も少し微妙

3
2
1
*/




// async, awaitを使ってカウントダウンをしてみる

const log = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(time);
      resolve();
    }, timeout);
  });
};

const fn = async () => {
  await log(3);
  await log(2);
  await log(1);
};

fn();

/*
result: 1秒後ごとに出力される
Promiseのthenでつなげるより、フラットに書ける

3
2
1
*/


