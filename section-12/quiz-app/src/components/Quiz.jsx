import { useCallback, useState } from 'react';
import QUESTIONS from '../questions.js'
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);

    // if there's 1 answer, the second question(index 1) should be displayed
    const activeQuestionIndex = userAnswers.length
    const quizIsComplete = activeQuestionIndex == QUESTIONS.length;

    console.log(userAnswers);

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevAnswers => {
            return [
                ...prevAnswers,
                selectedAnswer
            ];
        })
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        // return (
        //     <div id="summary">
        //         <img src={quizComplete} alt="quiz completed" />
        //         <h2>Quiz Completed!</h2>
        //     </div>
        // )

        return <Summary userAnswers={userAnswers} />
    }




    // other than in lists, key can also be use to destroy and recreate elements by when it's value changes
    // based on my existing knowledge, rerender vs destroy and recreate is kinda different
    // rerender will not trigger useEffect with [] as dependency to run again but destroy and recreate will
    return (
        <div id="quiz">
            <Question 
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer} 
            onSkipAnswer={handleSkipAnswer}/>
        </div>

    )
}