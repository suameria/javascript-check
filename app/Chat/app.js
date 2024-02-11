import users from "./users.json" assert { type: "json" };

(() => {
  "use strict";

  const loginUserText = document.getElementById("loginUserText");
  const selectUser = document.getElementById("selectUser");

  const chat = {
    lists: [
      {
        user_img_src: "https://source.unsplash.com/100x100/?portrait?2",
        post_comment: "Hi 3",
        post_time: "3 hours ago",
      },
      {
        user_img_src: "https://source.unsplash.com/100x100/?portrait?1",
        post_comment: "Hi 2",
        post_time: "2 hours ago",
      },
      {
        user_img_src: "https://source.unsplash.com/100x100/?portrait?0",
        post_comment: "Hi 1",
        post_time: "1 hours ago",
      },
    ],
  };

  const listTemplate = document.getElementById("list-0");

  chat.lists.forEach((list) => {
    const cloneListTemplate = listTemplate.cloneNode(true);
    cloneListTemplate.id = "list-1";
    cloneListTemplate.style.display = "block";
    cloneListTemplate.querySelector("img").src = list.user_img_src;
    cloneListTemplate.querySelector("#post_comment-0").innerText =
      list.post_comment;
    cloneListTemplate.querySelector("#post_time-0").innerText = list.post_time;

    listTemplate.after(cloneListTemplate);
  });

  selectUser.addEventListener("click", (e) => {
    users.login.name = e.target.dataset.name;
    if (!users.login.name) {
      loginUserText.innerText = "";
      return;
    }

    loginUserText.innerText = `${users.login.name}でログイン中`;
  });
})();
