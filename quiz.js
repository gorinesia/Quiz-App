// `use strict`

// {
//   // 利用するAPI
//   const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';


//   // 「Quiz」クラスを生成し、クイズに関する情報を保持する
//   class Quiz {
//     constructor(quizData) {
//       this._quizzes = quizData.results;
//       this._correctAnswersNum = 0;
//     }

//     getQuizCategory(index) {
//       return this._quizzes[index - 1].category;
//     }

//     getQuizDifficulty(index) {
//       return this._quizzes[index - 1].difficulty;
//     }

//     getNumOfQuiz() {
//       return this._quizzes.length;
//     }

//     getQuizQuestion(index) {
//       return this._quizzes[index - 1].question;
//     }

//     getCorrectAnswer(index) {
//       return this._quizzes[index - 1].correct_answer;
//     }

//     getIncorrectAnswers(index) {
//       return this._quizzes[index - 1].incorrect_answers;
//     }

//     countCorrectAnswersNum(index, answer) {
//       const correctAnswer = this._quizzes[index - 1].correct_answer;
//       if (answer === correctAnswer) {
//         return this._correctAnswersNum++;
//       }
//     }

//     getCorrectAnswersNum() {
//       return this._correctAnswersNum;
//     }
//   }

//   // HTMLのid値がセットされているDOMを取得する
//   const titleElement = document.getElementById('title');
//   const questionElement = document.getElementById('question');
//   const answersContainer = document.getElementById('answers');
//   const startButton = document.getElementById('start-button');
//   const genreElement = document.getElementById('genre');
//   const difficultyElement = document.getElementById('difficulty');


//   // 「開始」ボタンをクリックしたらクイズ情報を取得する
//   startButton.addEventListener('click', () => {
//     startButton.hidden = true;
//     fetchQuizData(1);
//   });

//   // Webページ上の表示をリセットする
//   // fetch APIを使い、API経由でデータを取得する
//   const fetchQuizData = async (index) => {
//     titleElement.textContent = '取得中';
//     questionElement.textContent = '少々お待ち下さい';

//     const response = await fetch(API_URL);
//     const quizData = await response.json();
//     const quizInstance = new Quiz(quizData);

//     setNextQuiz(quizInstance, index);
//   };

//   // 表示要素をリセットする
//   // 条件に応じて、次の問題の表示 or 結果を表示する
//   const setNextQuiz = (quizInstance, index) => {
//     while (answersContainer.firstChild) {
//       answersContainer.removeChild(answersContainer.firstChild);
//     }

//     if (index <= quizInstance.getNumOfQuiz()) {
//       makeQuizContents(quizInstance, index);
//     } else {
//       finishQuiz(quizInstance);
//     }
//   };

//   /*
//     クイズデータを元にWebページ上に問題と解答リストを表示する
//     解答をクリックし、正解であれば正答数をインクリメントする
//     回答する度に問題数プロパティもインクリメントする
//     setNwxtQuiz関数を実行して次の問題をセットする（最後の問題の場合は結果を表示する）。
//   */
//   const makeQuizContents = (quizInstance, index) => {
//     titleElement.innerHTML = `問題 ${index}`;
//     genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
//     difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
//     questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;

//     setAnswerButtons(quizInstance, index)
//   };

//   /*
//     クイズの答えを用意する
//     4択問題の形式で解答用のボタンを表示する
//     回答を進める度に正答数をカウントする
//   */
//   const setAnswerButtons = (quizInstance, index) => {
//     const shuffledAnswers = buildAnswers(quizInstance, index);

//     shuffledAnswers.forEach((answer) => {
//       const answerElement = document.createElement('li');
//       answersContainer.appendChild(answerElement);

//       const buttonElement = document.createElement('button');
//       buttonElement.innerHTML = answer;
//       answerElement.appendChild(buttonElement);

//       buttonElement.addEventListener('click', () => {
//         quizInstance.countCorrectAnswersNum(index, answer);
//         index++;
//         setNextQuiz(quizInstance, index);
//       });
//     });
//   }

// // クイズを解いた結果を表示する
// // 「ホームに戻る」ボタンを表示する
//   const finishQuiz = (quizInstance) => {
//     titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です`
//     genreElement.textContent = '';
//     difficultyElement.textContent = '';
//     questionElement.textContent = '再チャレンジしたい場合は下をクリック';

//     const restartButton = document.createElement('button');
//     restartButton.textContent = 'ホームに戻る';
//     answersContainer.appendChild(restartButton);
//     restartButton.addEventListener('click', () => {
//       location.reload();
//     });
//   };

//   //  クイズの解答用の配列(正答(1)＆誤答(3))をシャッフルする
//   const buildAnswers = (quizInstance, index) => {
//     const answers = [
//       quizInstance.getCorrectAnswer(index),
//       ...quizInstance.getIncorrectAnswers(index)
//     ];
//     return shuffleArray(answers);
//   };

//   //  配列をシャッフルする
//   const shuffleArray = ([...array]) => {
//     for (let i = array.length - 1; i >= 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };
// }


`use strict`

{
  // 利用するAPI
  const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';


  // 「Quiz」クラスを生成し、クイズに関する情報を保持する
  class Quiz {
    constructor(quizData) {
      this._quizzes = quizData.results;
      this._correctAnswersNum = 0;
    }

    getQuizCategory(index) {
      return this._quizzes[index - 1].category;
    }

    getQuizDifficulty(index) {
      return this._quizzes[index - 1].difficulty;
    }

    getNumOfQuiz() {
      return this._quizzes.length;
    }

    getQuizQuestion(index) {
      return this._quizzes[index - 1].question;
    }

    getCorrectAnswer(index) {
      return this._quizzes[index - 1].correct_answer;
    }

    getIncorrectAnswers(index) {
      return this._quizzes[index - 1].incorrect_answers;
    }

    countCorrectAnswersNum(index, answer) {
      const correctAnswer = this._quizzes[index - 1].correct_answer;
      if (answer === correctAnswer) {
        return this._correctAnswersNum++;
      }
    }

    getCorrectAnswersNum() {
      return this._correctAnswersNum;
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
    fetchQuizData(1);
  });

  // Webページ上の表示をリセットする
  // fetch APIを使い、API経由でデータを取得する
  const fetchQuizData = async (index) => {
    titleElement.textContent = '取得中';
    questionElement.textContent = '少々お待ち下さい';

    const response = await fetch(API_URL);
    const quizData = await response.json();
    const quizInstance = new Quiz(quizData);

    setNextQuiz(quizInstance, index);
  };

  // 表示要素をリセットする
  // 条件に応じて、次の問題の表示 or 結果を表示する
  const setNextQuiz = (quizInstance, index) => {
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }

    if (index <= quizInstance.getNumOfQuiz()) {
      makeQuizContents(quizInstance, index);
    } else {
      finishQuiz(quizInstance);
    }
  };

  /*
    クイズデータを元にWebページ上に問題と解答リストを表示する
    解答をクリックし、正解であれば正答数をインクリメントする
    回答する度に問題数プロパティもインクリメントする
    setNwxtQuiz関数を実行して次の問題をセットする（最後の問題の場合は結果を表示する）。
  */
  const makeQuizContents = (quizInstance, index) => {
    titleElement.innerHTML = `問題 ${index}`;
    genreElement.innerHTML = `【ジャンル】 ${quizInstance.getQuizCategory(index)}`;
    difficultyElement.innerHTML = `【難易度】 ${quizInstance.getQuizDifficulty(index)}`;
    questionElement.innerHTML = `【クイズ】${quizInstance.getQuizQuestion(index)}`;

    const answers = [
    quizInstance.getCorrectAnswer(index),
    ...quizInstance.getIncorrectAnswers(index)
    ];

    answers.forEach((answer) => {
      const answerElement = document.createElement('li');
      answersContainer.appendChild(answerElement);

      const buttonElement = document.createElement('button');
      buttonElement.innerHTML = answer;
      answerElement.appendChild(buttonElement);

      buttonElement.addEventListener('click', () => {
        quizInstance.countCorrectAnswersNum(index, answers);
        index++;
        setNextQuiz(quizInstance, index);
      });
    });
    // setAnswerButtons(quizInstance, index)
  };

  /*
    クイズの答えを用意する
    4択問題の形式で解答用のボタンを表示する
    回答を進める度に正答数をカウントする
  */
  // const setAnswerButtons = (quizInstance, index) => {
    // const shuffledAnswers = buildAnswers(quizInstance, index);
    // const answers = quizInstance.getCorrectAnswer(quizInstance, index);

    // // answers.forEach((answer) => {
    //   // const answerElement = document.createElement('li');
    //   // answersContainer.appendChild(answerElement);

    //   const buttonElement = document.createElement('button');
    //   buttonElement.innerHTML = answers;
    //   // answerElement.appendChild(buttonElement);
    //   answersContainer.appendChild(buttonElement);

    //   buttonElement.addEventListener('click', () => {
    //     quizInstance.countCorrectAnswersNum(index, answer);
    //     index++;
    //     setNextQuiz(quizInstance, index);
    //   });
    // });
  // }

// クイズを解いた結果を表示する
// 「ホームに戻る」ボタンを表示する
  const finishQuiz = (quizInstance) => {
    titleElement.textContent = `あなたの正答数は${quizInstance.getCorrectAnswersNum()}です`
    genreElement.textContent = '';
    difficultyElement.textContent = '';
    questionElement.textContent = '再チャレンジしたい場合は下をクリック';

    // const restartButton = document.createElement('button');
    // restartButton.textContent = 'ホームに戻る';
    // answersContainer.appendChild(restartButton);
    // restartButton.addEventListener('click', () => {
    //   location.reload();
    // });
  };

  // //  クイズの解答用の配列(正答(1)＆誤答(3))をシャッフルする
  // const buildAnswers = (quizInstance, index) => {
  //   const answers = [
  //     quizInstance.getCorrectAnswer(index),
  //     ...quizInstance.getIncorrectAnswers(index)
  //   ];
  //   return shuffleArray(answers);
  // };

  // //  配列をシャッフルする
  // const shuffleArray = ([...array]) => {
  //   for (let i = array.length - 1; i >= 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };
}
