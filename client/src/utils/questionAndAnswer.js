
function shuffle(array) {
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
    // if (number1 || number2) {
    //   answers.push({ answer: number1 * number2, style: "correct" })
    //   while (answers.length !== 3) {
    //     let randomly = ({ answer: (number1 * number2) + Math.floor(Math.random() * 12), style: "incorrect" })
    //     if (!answers.every((el) => el.answer === randomly.answer)) {
    //       answers.push(randomly)
    //     }
    //   }
    //   answers = shuffle(answers)
    // }
    let randomly;
    if (number1 || number2) {
      answers.push(number1 * number2)
      while (answers.length !== 3) {
        randomly = (number1 * number2 + Math.floor(Math.random() * 12))
        if (!answers.includes(randomly)) {
          answers.push(randomly)
        }
      }
      let final = [{answer:answers[0],style: "correct"},{answer:answers[1],style: "incorrect"},{answer:answers[2],style: "incorrect"}]
      answers = shuffle(final)
    }
    return { number1, number2, answers }
  }