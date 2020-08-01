`use strict`

{
  // 利用するAPI
  const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

  // クイズアプリのデータ管理用オブジェクト
  const gameState = {
    quizzes: [],
    currentIndex: 0,
    numberOfCorrects: 0
  };


  class Quiz {
    constructor(quizData) {
      this.quizzes = quizData.results;
    }

    getQuizCategory(index) {
      return this.quizzes[index - 1].category;
    }

    getQuizDifficulty(index) {
      return this.quizzes[index - 1].difficulty;
    }

    getNumOfQuiz() {
      return this.quizzes.length;
    }

    getQuizQuestion(index) {
      return this.quizzes[index - 1].question;
    }

    getCorrectAnswer(index) {
      return this.quizzes[index - 1].correct_answer;
    }

    getIncorrectAnswers(index) {
      return this.quizzes[index - 1].incorrect_answers;
    }
  }
  
  // HTMLのid値がセットされているDOMを取得する
  const titleElement = document.getElementById('title');
  const questionElement = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const startButton = document.getElementById('start-button');
  const genreElement = document.getElementById('genre');
  const difficultyElement = document.getElementById('difficulty');


  // 「開始」ボタンをクリックしたらクイズ情報を取得する
  startButton.addEventListener('click', () => {
    startButton.hidden = true;
    fetchQuizData();
  });

  // Webページ上の表示をリセットする
  // fetch APIを使い、API経由でデータを取得する
  const fetchQuizData = async () => {
    titleElement.textContent = '取得中';
    questionElement.textContent = '少々お待ち下さい';

    const response = await fetch(API_URL);
    const quizData = await response.json();
    const quizInstance = new Quiz(quizData);
    
    gameState.quizzes = quizData.results;
    gameState.currentIndex = 0;
    gameState.numberOfCorrects = 0;
    
    setNextQuiz(quizInstance);
  };

  /*
   クイズデータを元にWebページ上に問題と解答リストを表示する
   解答をクリックし、正解であれば正答数をインクリメントする
   回答する度に問題数プロパティもインクリメントする
   setNwxtQuiz関数を実行して次の問題をセットする（最後の問題の場合は結果を表示する）。
   */
  const makeQuiz = (quizInstance) => {

    const answers = buildAnswers(quizInstance);
    
    titleElement.innerHTML = `問題 ${quizInstance.getNumOfQuiz()}`;
    genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(1)}`;
    difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(1)}`;
    questionElement.innerHTML = unescapeHTML(quizInstance.getQuizQuestion(1));

    answers.forEach((answer) => {
      const answerElement = document.createElement('li');
      answersContainer.appendChild(answerElement);

      const buttonElement = document.createElement('button');
      buttonElement.innerHTML = unescapeHTML(answer);
      answerElement.appendChild(buttonElement);

      answerElement.addEventListener('click', () => {
        const correctAnswer = unescapeHTML(quizInstance.getCorrectAnswer(1));
        if (correctAnswer === answerElement.innerHTML) {
          gameState.numberOfCorrects++;
        }

        gameState.currentIndex++;
        setNextQuiz(quizInstance);
      });
    });
  }

  // 表示要素をリセットする
  // 条件に応じて、次の問題の表示 or 結果を表示する
  const setNextQuiz = (quizInstance) => {
    removeAllAnswers();

    if (gameState.currentIndex < gameState.quizzes.length) {
      makeQuiz(quizInstance);
    } else {
      finishQuiz();
    }
  };

  // クイズを解いた結果を表示する
  // 「ホームに戻る」ボタンを表示する
  const finishQuiz = () => {
    titleElement.textContent = `あなたの正答数は${gameState.numberOfCorrects}です`
    genreElement.textContent = '';
    difficultyElement.textContent = '';
    questionElement.textContent = '再チャレンジしたい場合は下をクリック';

    const restartButton = document.createElement('button');
    restartButton.textContent = 'ホームに戻る';
    answersContainer.appendChild(restartButton);
    restartButton.addEventListener('click', () => {
      location.reload();
    });
  };

  // 回答を全て削除する
  const removeAllAnswers = () => {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
  };
  
  // quizオブジェクトの中にあるcorrect_answer, incorrect_answersを結合して
  // 正解・不正解の解答をシャッフルする
  const buildAnswers = (quizInstance) => {
    const answers = [
      quizInstance.getCorrectAnswer(1),
      ...quizInstance.getIncorrectAnswers(1)
    ];
    return shuffle(answers);
  };

  // 引数で受け取った配列内の値をシャッフルする
  // 引数で渡された配列を上書きしないように、シャッフルする配列はコピーしたものを使う
  const shuffle = (array) => {
    const copiedArray = array.slice();

    for (let i = copiedArray.length - 1; i >= 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[rand]] = [copiedArray[rand], copiedArray[i]]
    }
    return copiedArray;
  };

  // &やクォーテーションマークなどが特殊文字としてセットされているので、
  // 人間が読みやすい形式に変換した文字列を取得する
  const unescapeHTML = (str) => {
    const div = document.createElement("div");
    div.innerHTML = str.replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/ /g, "&nbsp;")
      .replace(/\r/g, "&#13;")
      .replace(/\n/g, "&#10;");
    return div.textContent || div.innerText;
  };
}
