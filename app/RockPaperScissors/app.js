import rps from "./rps.json" assert { type: "json" };

(() => {
  ("use strict");

  /**
   * Define RPS
   * 1: Rock, 2: Paper, 3: Scissors
   *
   * win rule (left->enemy, right->myself)
   * 1: Rock vs 2: Paper => 2: Paper
   * 2: Paper vs 3: Scissors => 3: Scissors
   * 3: Scissors vs 1: Rock => 1: Rock
   */

  const choose = document.getElementById("choose");
  const resultEnemyImg = document.getElementById("resultEnemyImg");
  const resultMyselfImg = document.getElementById("resultMyselfImg");
  const resultEnemyText = document.getElementById("resultEnemyText");

  const getChooseRpsOfEnemy = () => {
    return rps.definition.selections[
      Math.floor(Math.random() * rps.definition.selections.length)
    ];
  };

  const initRps = () => {
    resultEnemyImg.src = rps.definition.img_src[rps.choose_rps_of_enemy];
    resultEnemyImg.style.display = "block";
    resultMyselfImg.src = rps.definition.img_src[rps.choose_rps_of_myself];
    resultMyselfImg.style.display = "block";
    resultEnemyText.innerText = rps.result.text;
    resultEnemyText.style.display = "block";
    rps.choose_rps_of_enemy = 0;
    rps.choose_rps_of_myself = 0;
  };

  const initRender = () => {
    resultEnemyImg.style.display = "none";
    resultMyselfImg.style.display = "none";
    resultEnemyText.style.display = "none";
  };
  initRender();

  choose.addEventListener("click", (e) => {
    rps.choose_rps_of_myself = Number(e.target.dataset.myself);
    if (!rps.choose_rps_of_myself) {
      return;
    }

    rps.choose_rps_of_enemy = getChooseRpsOfEnemy();

    if (rps.choose_rps_of_enemy === rps.choose_rps_of_myself) {
      rps.result.text = "引き分けです。再度、選択してください。";
      initRps();
      return;
    }

    if (rps.isWin[rps.choose_rps_of_enemy][rps.choose_rps_of_myself] ?? false) {
      rps.result.text = "勝ちました!";
      initRps();
      return;
    } else {
      rps.result.text = "負けました...";
      initRps();
      return;
    }
  });
})();
