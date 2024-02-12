import users from "./users.json" assert { type: "json" };

(() => {
  ("use strict");

  const loginUserText = document.getElementById("loginUserText");
  const selectUser = document.getElementById("selectUser");
  const postCommentBtn = document.getElementById("postCommentBtn");
  const postComment = document.getElementById("postComment");
  const chatLists = document.getElementById("chatLists");
  let listTemplate = document.getElementsByClassName("list-template")[0];
  let userImgSrc = "";

  const getDateNow = () => {
    const date = new Date();
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const str_date = date.toISOString().replace("T", " ").substring(0, 19);
    return str_date;
  };

  const getChatListsByLocalStorage = () => {
    const chat = JSON.parse(localStorage.getItem("chat-lists"));
    return chat ?? { lists: [] };
  };

  const storeChatListsByLocalStorage = (chatLists) => {
    localStorage.setItem("chat-lists", JSON.stringify(chatLists));
  };

  // const deleteAllChatListsByLocalStorage = () => {
  //   localStorage.clear();
  // };
  // deleteAllChatListsByLocalStorage();

  const renderChatLists = (listTemplate) => {
    const chat = getChatListsByLocalStorage();
    if (!chat.lists.length) {
      return;
    }
    chat.lists.forEach((list) => {
      const cloneListTemplate = listTemplate.cloneNode(true);
      cloneListTemplate.style.display = "block";
      cloneListTemplate.querySelector("img").src = list.user_img_src;
      cloneListTemplate.querySelector("#post_comment-0").innerText =
        list.post_comment;
      cloneListTemplate.querySelector("#post_time-0").innerText =
        list.post_time;

      listTemplate.after(cloneListTemplate);
    });
  };

  const resetRenderChatLists = () => {
    const lists = document.getElementsByClassName("list-template");
    listTemplate = lists.item(0);
    while (lists.length) {
      lists.item(0).remove();
    }
    chatLists.appendChild(listTemplate);

    return listTemplate;
  };

  const realTimeRender = () => {
    listTemplate = resetRenderChatLists();
    renderChatLists(listTemplate);
  };

  renderChatLists(listTemplate);

  // 1秒ごとにチャットリストを更新
  setInterval(realTimeRender, 1000);

  selectUser.addEventListener("click", (e) => {
    users.login.name = e.target.dataset.name;
    if (!users.login.name) {
      loginUserText.innerText = "";
      return;
    }

    userImgSrc = e.target.src;
    loginUserText.style.display = "block";
    loginUserText.innerText = `${users.login.name}でログイン中`;
  });

  postCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!userImgSrc) {
      loginUserText.style.display = "block";
      loginUserText.innerText = "ログインしてください";
      return;
    }

    const comment = postComment.value;
    if (!comment) {
      loginUserText.innerText = "コメントを入力してください";
      return;
    }

    const chat = getChatListsByLocalStorage();

    chat.lists.push({
      user_img_src: userImgSrc,
      post_comment: comment,
      post_time: getDateNow(),
    });

    storeChatListsByLocalStorage(chat);

    postComment.value = "";

    listTemplate = resetRenderChatLists();
    renderChatLists(listTemplate);
  });
})();
