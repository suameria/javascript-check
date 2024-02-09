// cf. https://www.youtube.com/watch?v=pnsieVYy72M&list=PLwM1-TnN_NN7-zdRV8YsGUB82VVhfYiWW

// WEB APIを叩いてみる
const callApiReturnPromise = () => {
    const res = fetch('https://jsonplaceholder.typicode.com/users');
    // Promise {<pending>} オブジェクトが返ってくる
    console.log(res);
}

const callApi = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    // Response オブジェクトが返ってくる
    console.log(res);
    const users = await res.json();
    // jsonの内容を参照する
    console.log(users);
    // 何かしらのプロパティにアクセスしてみる
    users.forEach((user) => {
        console.log(user.name);
    });
}

callApiReturnPromise();

callApi();


// 上記を利用してユーザーのリストを追加するイベントを書いてみる

// DOM
const button = document.getElementById('addBtn');
const lists = document.getElementById('lists');

// メソッド
const getUsers = async () => {
    // データのやり取り
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    return users;
};

const addUsers = (user) => {
    // DOM操作
    const list = document.createElement('li');
    list.innerText = user.name;
    lists.appendChild(list);
};

const listUsers = async () => {
    const users = await getUsers();
    users.forEach(addUsers);
};

// イベント
window.addEventListener('load', listUsers);
button.addEventListener('click', listUsers);
