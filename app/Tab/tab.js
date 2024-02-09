// cf. https://www.youtube.com/watch?v=ig3GosWuKF0

// 即時関数外で書いてしまうとグローバル汚染になるので即時関数内で書くこと
(() => {

  const $doc = document;
  const $tab = $doc.getElementById('js-tab');
  const $nav = $doc.querySelectorAll('[data-nav]');
  const $content = $doc.querySelectorAll('[data-content]');

  const DISPLAY_BLOCK_CLASS = 'block';
  const ACTIVE_CLASS = 'is-active';

  // 初期化
  const init = () => {
    $content[0].style.display = DISPLAY_BLOCK_CLASS;
  };
  init();

  // 全nav要素に対してクリックしたら起こるイベント
  $nav.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();

      // クリックされたnavとそのdataを取得
      const $this = e.target;
      const targetVal = $this.dataset.nav;

      // 対象外のnav, contentすべて一旦リセットする
      $content.forEach((content, index) => {
        content.style.display = 'none';
        $nav[index].classList.remove(ACTIVE_CLASS);
      });

      // 対象のコンテンツをアクティブ化する
      $tab.querySelectorAll('[data-content="' + targetVal + '"]')[0].style.display = DISPLAY_BLOCK_CLASS;
      $nav[targetVal].classList.add(ACTIVE_CLASS);
    });
  });

})();