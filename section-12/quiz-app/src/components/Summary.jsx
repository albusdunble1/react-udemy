import quizComplete from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'


export default function Summary({userAnswers}) {

    // const skippedPercentage = (userAnswers.filter(a => a == null).length) / userAnswers.length * 100;




    let skipped = 0;
    let correct = 0;
    let wrong = 0;

    for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] == null) {
            skipped += 1;
        } else if (userAnswers[i] === QUESTIONS[i].answers[0]){
            correct += 1;
        } else if (userAnswers[i] !== QUESTIONS[i].answers[0]){
            wrong += 1;
        }
    }


    return (
        <div id="summary">
            <img src={quizComplete} alt="quiz completed" />
            <h2>Quiz Completed!</h2>

            <div id="summary-stats">
                <p>
                    <span className='number'>{Math.round(skipped/userAnswers.length * 100)}%</span>
                    <span className='text'>skipped</span>
                </p>
                <p>
                    <span className='number'>{Math.round(correct/userAnswers.length * 100)}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{Math.round(wrong/userAnswers.length * 100)}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>

            <ol>
                {userAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if (answer === null) {
                        cssClass += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else if (answer !== QUESTIONS[index].answers[0]) {
                        cssClass += ' wrong';
                    }

                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
               
            </ol>
        </div>
    )
}