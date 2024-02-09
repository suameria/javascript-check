// cf. https://www.youtube.com/watch?v=ig3GosWuKF0

(() => {

  class Accordion {
    constructor (obj) {
      const $elm = document.querySelector(obj.hookName);
      const $triggers = $elm.getElementsByTagName(obj.tagName);

      Array.from($triggers).forEach(($trigger) => {
        $trigger.addEventListener('click', (e) => this.clickHandler(e));
      });
    }

    clickHandler (e) {
      e.preventDefault();

      // 質問に対しての次の要素である答えを取得
      const $target = e.currentTarget;
      const $content = $target.nextElementSibling;

      // 表示されていたら非表示にする
      if ($content.style.display === 'block') {
        $content.style.display = 'none';
      } else {
        $content.style.display = 'block';
      }
    };
  }

  const jsFaq = new Accordion({
    hookName: '#js-faq',
    tagName: 'p'
  });

  const jsAccordion = new Accordion({
    hookName: '#js-accordion',
    tagName: 'a'
  });


})();