import Header from './components/Header'
import Result from './components/Result'
import UserInput from './components/UserInput'
import { useState } from 'react'

function App() {
  const [investInfo, setInvestInfo] = useState({initial: 1, annual: 1, expected: 1, duration: 1});

  // function handleInputChange(initial, annual, expected, duration){
  //   setInvestInfo(prevInfo => {
  //     const newInfo = {
  //       initial: initial,
  //       annual: annual,
  //       expected: expected,
  //       duration: duration
  //     }

  //     return newInfo;
  //   })

  //   console.log('CHANGED')
  //   console.log(initial + " " + annual + " " + expected + " " + duration)
  //   console.log("========================================")
  // }

  const isInputValid = investInfo.duration > 0;

  function handleInputChange(inputIdentifier, newValue){
    setInvestInfo(prevInfo => {
      const newInfo = {
        ...prevInfo,
        [inputIdentifier]: +newValue
      }

      return newInfo;
    })

  }


  return (
    <>
        <Header />

        <UserInput info={investInfo} onChangeInfo={handleInputChange} />

        {!isInputValid && <p className='center'>Please enter a duration greater than zero!</p>}
        {isInputValid && <Result info={investInfo} />}
    </>
  )
}

export default App
