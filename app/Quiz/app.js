// cf. https://www.youtube.com/watch?v=ig3GosWuKF0

const quiz = [
  {
    question: 'ゲーム市場、最も売れたゲーム機は次のうちどれ？',
    answers: [
      'スーパーファミコン',
      'プレイステーション',
      'ニンテンドースイッチ',
      'ニンテンドーDS'
    ],
    correct: 'ニンテンドーDS'
  },
  {
    question: '答えは１だよ',
    answers: [
      '1',
      '2',
      '3',
      '4'
    ],
    correct: '1'
  },
  {
    question: '答えは２だよ',
    answers: [
      '1',
      '2',
      '3',
      '4'
    ],
    correct: '2'
  },
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

// 変数名のプレフィックスに$がついていたらHTMLのオブジェクトが入っているんだと、わかりやすくさせる
const $buttons = document.getElementsByTagName('button');

const setupQuiz = () => {
  document.getElementById('js-question').textContent = quiz[quizIndex].question;
  for (let i = 0; i < quiz[quizIndex].answers.length; i++) {
    $buttons[i].textContent = quiz[quizIndex].answers[i];
  }
};

setupQuiz();

const clickHandler = (e) => {
  if (quiz[quizIndex].correct === e.target.textContent) {
    score++;
    window.alert('正解！');
  } else {
    window.alert('不正解…');
  }

  quizIndex++;

  if (quizIndex < quizLength) {
    setupQuiz();
  } else {
    window.alert(quizLength + '問中' + score + '問正解しました！');
  }
};

for (i = 0; i < $buttons.length; i++) {
  $buttons[i].addEventListener('click', (e) => {
    clickHandler(e);
  });
}
