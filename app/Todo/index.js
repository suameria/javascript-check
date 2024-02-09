// cf. https://www.youtube.com/watch?v=E08jeQBa1D0

// DOM
const form = document.getElementById('form');
const input = document.getElementById('input');
const button = document.getElementById('button');
const ul = document.getElementById('ul');

// ローカルストレージからtodo-listsの値を取得
const todoListsByLocalStorage = JSON.parse(localStorage.getItem('todo-lists'));

// ローカルストレージに追加したリストを残す
const saveTodoList = () => {
  const todoLists = [];
  const listGroupItems = Array.from(document.getElementsByClassName('list-group-item'));

  listGroupItems.forEach((listGroupItem) => {
    const todo = {
      text: listGroupItem.innerText,
      completed: listGroupItem.classList.contains('text-decoration-line-through')
    }
    todoLists.push(todo);
  });

  localStorage.setItem('todo-lists', JSON.stringify(todoLists));
};

// リストを追加
const addList = (todoListByLocalStorage) => {
  let todoText = input.value;
  if (todoListByLocalStorage && todoListByLocalStorage.text) {
    todoText = todoListByLocalStorage.text;
  }

  if (todoText) {
    // li要素を作成
    const li = document.createElement('li');
    // 入力した値をli要素の値に代入
    li.innerText = todoText;
    // li要素にclass属性を追加
    li.classList.add('list-group-item');
    // 取り消し線の完了フラグが立っていれば取り消し線を付与する
    if (todoListByLocalStorage && todoListByLocalStorage.completed) {
      li.classList.add('text-decoration-line-through');
    }

    // 右クリックでリストを削除するイベント
    li.addEventListener('contextmenu', (event) => {
      // 右クリックでメニューが出てしまわないようにする
      event.preventDefault();
      li.remove();
      saveTodoList();
    });

    // 左クリックで完了の取り消し線を付与するイベント
    li.addEventListener('click', () => {
      li.classList.toggle('text-decoration-line-through');
      saveTodoList();
    });

    // ul要素のliの子を追加
    ul.appendChild(li);
    // リスト追加完了後に入力文字列を初期化
    input.value = '';
    saveTodoList();
  }
};

button.addEventListener('click', () => {
  const isConfirm = confirm('登録したリストを一括で削除しますか？');

  if (isConfirm) {
    localStorage.clear();
    location.reload();
  }
});

form.addEventListener('submit', (event) => {
  // submit した際に画面のリロードをさせないようにする
  event.preventDefault();
  addList();
});

if (todoListsByLocalStorage) {
  todoListsByLocalStorage.forEach((todoListByLocalStorage) => {
    addList(todoListByLocalStorage);
  });
}

