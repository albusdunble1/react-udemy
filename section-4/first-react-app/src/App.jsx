import { useState, Fragment } from 'react'
import './App.css'
import './components/ListItems/ListItem.css'

import Header from './components/Header/Header';
import Examples from './components/Examples/Examples'
import ListItems from './components/ListItems/ListItems'
import ListItemsMap from './components/ListItems/ListItemsMap'

function generateRandomFramework(){
  return Math.floor(Math.random() * 3);
}


function App() {
  const jsFrameworks = ['Angular', 'Vue', 'React'];
  let [currentFramework, setCurrentFramework] = useState('Test');

  // let testIndex = 0;
  const [count, setCount] = useState(0)
  
  // console.log('APP COMPONENT EXECUTED ONLY ONCE');

  // *ANOMALY* 
  // THIS WORKS SOMEHOW EVERYTIME A CLICK EVENT IS TRIGGERED, IT REFRESHES ITS VALUE EVEN WITHOUT USESTATE 
  // I UNDERSTAND NOW, BECAUSE NO STATE IS STORED BUT generateRandomFramework PROVIDES A NEW VALUE EVERYTIME THE App FUNCTION IS REEVALUATED WHEN ANOTHER STATE IS CHANGED
  const generatedFrameworkOnInit = jsFrameworks[generateRandomFramework()];

  //  ==================  WONT WORK  ==================
  // const generatedFrameworkOnInit = jsFrameworks[testIndex];

  // function changeTestIndex(){
  //   testIndex = Math.floor(Math.random() * 3);
  //   console.log(testIndex)
  // }
  //  ==================  WONT WORK  ==================


  
  function changeFramework(){
    let randomIndex = Math.floor(Math.random() * 3);
    console.log('HI')
    console.log(randomIndex)
    currentFramework = jsFrameworks[randomIndex];
    console.log(currentFramework)
    setCurrentFramework(currentFramework)
  }

  return (

    // fragment allows you to wrap multiple sibling elements, so you don't end up with extra elements like div or section that you might otherwise use to wrap the siblings elements with
    // <Fragment>

    // this is the new and shorter syntax for Fragment, which wraps the multiple sibling elements to make sure it only returns one big element
    <>
  
      <Header></Header>

      <Examples />

      <ListItemsMap />

      <ListItems />

      <div className="card">
        <button onClick={() => setCount((count) => count == 0? count =1 : count * 2)}>
        {/* <button onClick={() => setCount((count) => count = count == 0 ? 1 : count * 2)}> */}
          count is {count} asdasd 
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs" onClick={() => setCount((count) => count / 2)}>
        Click on the Vite and { generatedFrameworkOnInit } logos to learn more
      </p>

      <h2>        
        this should change lol == { currentFramework } 
      </h2>

      {/* <button onClick={() => setCount((count) => (count = 0))}>Reset Count Baby!</button> */}
      {/* or */}
      <button onClick={() => setCount((count) => 0)}>Reset Count Baby!</button>
      <button onClick={() => changeFramework()}>Change to a random Javascript Framework</button>

      {/* WONT WORK */}
      {/* <button onClick={() => changeTestIndex()}>Change testIndex</button> */}
      {/* WONT WORK */}
    </>
  )
}



export default App
