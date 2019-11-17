
export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
export function questionsAndAnswers(level) {
  var number1, number2, answers = [];
  switch (level) {
    case 1:
      number1 = Math.floor(Math.random() * 3)
      number2 = Math.floor(Math.random() * 12) + 1
      break;
    case 2:
      number1 = Math.floor(Math.random() * 6) + 4
      number2 = Math.floor(Math.random() * 12)
      break;
    case 3:
      number1 = Math.floor(Math.random() * 9) + 7;
      number2 = Math.floor(Math.random() * 12)
      break;
    case 4:
      number1 = Math.floor(Math.random() * 12) + 10;
      number2 = Math.floor(Math.random() * 12)
      break;
    default:
  }

  let randomly;
  if (number1 || number2) {
    answers.push(number1 * number2)
    while (answers.length !== 3) {
      randomly = (number1 * number2 + Math.floor(Math.random() * 12))
      if (!answers.includes(randomly)) {
        answers.push(randomly)
      }
    }
    let final = [{ answer: answers[0], style: "correct" }, { answer: answers[1], style: "incorrect" }, { answer: answers[2], style: "incorrect" }]
    answers = shuffle(final)
  }
  return { number1, number2, answers }
}

export function groupGame(arrayOfnumber) {
  let random_num = Math.floor(Math.random() * arrayOfnumber.length);
  // console.log({arrayOfnumber});
  // console.log({random_num});
  
  let ques = arrayOfnumber[random_num];
  let number1 = ques[0] ? ques[0] : 0
  let number2 = ques[1] ? ques[1] : 1
  let final = [{ answer: number1 * number2, style: "correct" }, { answer: (number1 * number2) + 2, style: "incorrect" }, { answer: (number1 * number2) + 1, style: "incorrect" }]
  let answers = shuffle(final);
  let filterdQuestions = arrayOfnumber.filter((el, index) => index !== random_num)
  return { number1, number2, answers, filterdQuestions }
}

export function groupEqual(arrayOfnumber) {
  let random_num = Math.floor(Math.random() * arrayOfnumber.length);
  let number3 = Math.floor(Math.random() * 10);
  let ques = arrayOfnumber[random_num];
  let number1 = ques[0] ? ques[0] : 0
  let number2 = ques[1] ? ques[1] : 1
  let final = [{ answer: number1 * number2 * number3, style: "correct" }, { answer: (number1 * number2 * number3) + 2, style: "incorrect" }, { answer: (number1 * number2 * number3) + 3, style: "incorrect" }]
  let answers = shuffle(final);
  let filterdQuestions = arrayOfnumber.filter((el, index) => index !== random_num)
  return { number1, number2, answers, filterdQuestions, number3 }
}

//0  23 
//1  45
//2  67
//3  89


// let index0 =
//   [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
//   [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10]]

// let index1 =
//   [[4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
//   [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]]

// let index2 =
//   [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
//   [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10]]

// let index3 =
//   [[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
//   [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10]]