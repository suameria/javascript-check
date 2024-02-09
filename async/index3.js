// cf. https://www.youtube.com/shorts/m8biTN2fBEs

/*
- イベントループ

・2つのタスク
マクロタスクはタスクキュー(Task Queue)に追加されていく
マイクロタスクはジョブキュー(Job Queue)に追加されていく

setTimeoutはコールバックをWebAPIに投げ、タスクキュー(Task Queue)に登録する。
PromiseはコールバックをWebAPIに投げ、ジョブキュー(Job Queue)に登録する。


・2つのキュー
タスクキュー(Task Queue)
ジョブキュー(Job Queue)

イベントループでの上記キューのプライオリティ
ジョブキュー(Job Queue) > タスクキュー(Task Queue)
*/

const first = () => console.log('first');

const second = () => {
  // Task Queue (Macro Tasks)
  setTimeout(() => {
    console.log('second');
  }, 0);
};

const third = () => {
  // Job Queue (Micro Tasks)
  Promise.resolve(1).then(() => {
    console.log('third');
  });
};

const fourth = () => console.log('fourth');

const fifth = async () => {
  // TODO fetchの場合はどのキューに該当するのか調べること ... 今のところ実行結果としては必ず最後に出力される
  // サーバーから取得してくるから段階としては最後に出力されるというのはわかる
  // 一応fetchはPromiseを返却してる
  // 要確認: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  // console.log(data);
  console.log('fifth');
};

// run
fifth(); // 最後に実行される...のね
first();
second();
third();
fourth();
fifth(); // 最後に実行される...のね

/*
result:

first
fourth
third
second
fifth
fifth


add info:
// https://www.jsv9000.app/
このサイト(JavaScript Visualizer 9000)で上記コードを実行すると
可視化できてわかりやすいかも


*/