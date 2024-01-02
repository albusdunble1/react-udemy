import { useRef } from "react";

// Answers has it's own component so that shuffledAnswers will always be destroyed and recreated on a new question using "key" in the parent component
export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const correctAnswerText = answers[0];
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        // add these 2 lines below the quiz is complete check so that the active question index will not go out of bounds
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((ans,index) => {
                console.log('hey')
                console.log(selectedAnswer)
                const isSelected = selectedAnswer === ans;
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected';
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                // fun bonus to highlight the correct answer if the wrong one is selected
                if ((answerState === 'wrong') && !isSelected && ans === correctAnswerText) {
                    cssClass = 'correct';
                }

                return (
                    <li key={index} className='answer'>
                        {/* two alternatives to disabled */}
                        {/* <button disabled={selectedAnswer} className={cssClass} onClick={() => onSelect(ans)}>{ans}</button> */}
                        {/* <button disabled={answerState} className={cssClass} onClick={() => onSelect(ans)}>{ans}</button> */}
                        <button disabled={answerState !== ''} className={cssClass} onClick={() => onSelect(ans)}>{ans}</button>
                    </li>
                )
            })}
        </ul>
    )
}