// 本来はパスワード生成API等で外部から生成したものを使うべきだが、
// 簡単な動作確認をしたいのでここで書いちゃう
// AWSのパスワード生成APIを使うのもありだし、自作でAPIを用意がベター
// cf. https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetRandomPassword.html

(() => {

  const wordLengthNames = document.getElementsByName('word_length');
  const createCountNames = document.getElementsByName('create_count');

  const generateBtn = document.getElementById('generateBtn');
  const passwordArea = document.getElementById('passwordArea');

  const passwordGenerator = {
    word_length: 8,
    crate_count: 2,
    outputs: [],
  };

  const getPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomValues = new Uint32Array(passwordGenerator.word_length);
    crypto.getRandomValues(randomValues);
    const result = Array.from(randomValues, (value) => chars[value % chars.length]).join('');
    return result;
  };

  generateBtn.addEventListener('click', (e) => {
    // 表示していたパスワードを削除
    while (passwordArea.firstChild) {
      passwordArea.removeChild(passwordArea.firstChild);
    }

    // 文字数のチェックの値
    wordLengthNames.forEach((wordLengthName) => {
      if (wordLengthName.checked) {
        passwordGenerator.word_length = wordLengthName.value;
      }
    });

    // 作成個数のチェックの値
    createCountNames.forEach((createCountName) => {
      if (createCountName.checked) {
        passwordGenerator.crate_count = createCountName.value;
      }
    });

    // パスワード初期化
    passwordGenerator.outputs = [];
    for (i = 0; i < passwordGenerator.crate_count; i++) {
      passwordGenerator.outputs.push(getPassword());
    }

    // パスワードを表示
    passwordGenerator.outputs.forEach((password) => {
      const divElement = document.createElement('div');
      divElement.classList.add('col');
      divElement.innerText = password;
      passwordArea.appendChild(divElement);
    });

  });

})();