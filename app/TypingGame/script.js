// cf. https://www.youtube.com/watch?v=o4a_xL9w3f0

const RANDOM_SENTENCE_URL_API = 'https://api.quotable.io/random';
const typeDisplay = document.getElementById('typeDisplay');
const typeInput = document.getElementById('typeInput');
const timer = document.getElementById('timer');

const typeSound = new Audio('./audio/typing-sound.mp3');
const wrongSound = new Audio('./audio/wrong.mp3');
const correctSound = new Audio('./audio/correct.mp3');

// inputテキスト入力の判定
typeInput.addEventListener('input', () => {
  // タイプ音を鳴らす
  typeSound.play();
  typeSound.currentTime = 0;

  const sentenceArray = typeDisplay.querySelectorAll('span');
  const arrayValue = typeInput.value.split('');

  let isCorrect = true;
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      isCorrect = false;
    } else if (characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct');

      // 30%くらいの音量でタイポ音を鳴らす
      wrongSound.volume = 0.3;
      wrongSound.play();
      wrongSound.currentTime = 0;

      isCorrect = false;
    }
  });

  if (isCorrect) {
    correctSound.play();
    correctSound.currentTime = 0;
    RenderNextSentence();
  }
});

// 非同期処理でランダムな文章を取得する
const GetRandomSentence = async () => {
  const res = await fetch(RANDOM_SENTENCE_URL_API);
  const json = await res.json();
  const sentence = json.content;
  return sentence;
};

// ランダムな文章を取得して、表示する
const RenderNextSentence = async () => {
  const sentence = await GetRandomSentence();

  typeDisplay.innerText = '';

  // 文章を1文字ずつ分解して、spanタグを生成する
  const words = sentence.split('');
  words.forEach((word) => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = word;
    typeDisplay.appendChild(characterSpan);
  });

  // テキストエリアの中身を消す
  typeInput.value = '';

  startTimer();
};

let startTime;
originTime = 30;
const startTimer = () => {
  timer.innerText = originTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if (timer.innerText <= 0) {
      TimeUp();
    }
  }, 1000);
};

const getTimerTime = () => {
  return Math.floor((new Date() - startTime) / 1000)
};

const TimeUp = () => {
  RenderNextSentence();
};

RenderNextSentence();