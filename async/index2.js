// cf. https://www.youtube.com/watch?v=hfoxoVo0cVo

/*

・同期処理

      task1|
            task2|
                  task3|
past-----------------future


・非同期処理

      task1|
      task2|
            task3|
past-----------------future


・JavaScriptはシングルスレッド

function1->|function2->|function3->|


・4つのメカニズム
下記のメカニズムがわかるとPromiseやasync/awaitへの理解につながる

- *コールスタック
  現在どの関数が実行されているのか、
  その関数の中でどの関数が呼び出されたかなどを追跡し管理する。
  (メインスレッドはコールスタックによって管理されている。)

- *タスクキュー
  非同期関数のコールバック関数はこのタスクキューで待機する。

- *WebAPI
  外部の機能

- ヒープ(今回は割愛)
  データを格納する場所（メモリ領域）


スタック
Last In, First Out (LIFO)
最後に保存したデータは最初に取り出される

function1->|function2->|function3->|

|     |    |     |    |     |    | *fn3 |    |      |    |      |    |     |
|     | -> |     | -> | fn2 | -> | *fn2 | -> | *fn2 | -> |      | -> |     |
|     |    | fn1 |    | fn1 |    | *fn1 |    | *fn1 |    | *fn1 |    |     |


キュー
First In, First Out (FIFO)
最初に保存したデータは最初に取り出される

callback1->|callback2->|callback3->|

|     |    |     |    |     |    | *cb3 |    |      |    |      |    |     |
|     | -> |     | -> | cb2 | -> | *cb2 | -> | *cb3 | -> |      | -> |     |
|     |    | cb1 |    | cb1 |    | *cb1 |    | *cb2 |    | *cb3 |    |     |


WebAPIの例
setTimeout関数、setInterval関数は
ブラウザが提供するTimerAPIという外部APIを利用している。
または、これ以外を提供する外部APIなど
JavaScriptは外部APIを利用することで、処理を任せることになるので、非同期処理が実現できる。



*/

// 同期処理
// const fn1 = () => console.log(1);
// const fn2 = () => console.log(2);
// const fn3 = () => console.log(3);

// fn1();
// fn2();
// fn3();

/*
result:
fn1が実行されるとfn1()の関数がコールスタックに登録され、
fn1の処理が登録、実行、コールスタックから削除され、登録、実行、コールスタックから削除され、...と繰り返され、
終わったら、fn1()もコールスタックから削除される。
fn2()もfn3()もfn1()と同様にLIFOとなる。

1
2
3
*/



// 非同期処理
// console.log(1);
// setTimeout(() => {
//   console.log(2);
// }, 1000);
// console.log(3);

/*
result:
setTimeout関数は非同期関数なのでコールバック関数をWebAPIに投げる。
下記のコールバック関数がタスクキューに登録され、レスポンス待ち状態となる。
() => { console.log(2); }
setTimeoutの非同期関数はコールスタックから削除される。
WebAPIからのレスポンスが返ってきたら、下記のコールバック関数がタスクキューに登録される。
() => { console.log(2); }

[重要]
コールスタックが空になると"イベントループ"によって、
タスクキューにあるコールバック関数をコールスタックに追加してくれる。
つまりsetTimeoutが0ミリ秒でも上記の結果は下記と同じ結果となる。

1
3
2
*/


console.log(1);
setTimeout(function cb1() {
  console.log(2);
}, 1000);
setTimeout(function cb2() {
  console.log(3);
}, 1000);
console.log(4);


/*
result:

1
4
2
3
*/



