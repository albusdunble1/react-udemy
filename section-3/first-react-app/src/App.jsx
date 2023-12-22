import { useState } from 'react'
import './App.css'
import './components/ListItems/ListItem.css'

import reactLogo from './assets/react.svg'
import { listData, EXAMPLES } from './data'

import Header from './components/Header/Header';
import ListItem from './components/ListItems/ListItem'
import ListItem2 from './components/ListItems/ListItem2'
import ListItem3 from './components/ListItems/ListItem3'
import ListItem4 from './components/ListItems/ListItem4'
import TabButton from './components/TabButton/TabButton';

// const jsFrameworks = ['Angular', 'Vue', 'React'];
// let currentFramework = 'Test';

// function generateRandomFramework(){
//   return Math.floor(Math.random() * 3);
// }

function App() {
  const jsFrameworks = ['Angular', 'Vue', 'React'];
  let [selectedTopic, setSelectedTopic] = useState();
  let [currentFramework, setCurrentFramework] = useState('Test');

  // let [selectedTabContent, setSelectedTabContent] = useState({});

  let testIndex = 0;


  const [count, setCount] = useState(0)
  
  let topicTitle1 = null;

  if (selectedTopic){
    topicTitle1 = <h2>{selectedTopic}</h2>;
    console.log('HELLO')
    console.log(topicTitle1)
  }


  // console.log('APP COMPONENT EXECUTED ONLY ONCE');

  // *ANOMALY* 
  // THIS WORKS SOMEHOW EVERYTIME A CLICK EVENT IS TRIGGERED, IT REFRESHES ITS VALUE EVEN WITHOUT USESTATE 
  // const generatedFrameworkOnInit = jsFrameworks[generateRandomFramework()];

  //  ==================  WONT WORK  ==================
  const generatedFrameworkOnInit = jsFrameworks[testIndex];

  function changeTestIndex(){
    testIndex = Math.floor(Math.random() * 3);
    console.log(testIndex)
  }
  //  ==================  WONT WORK  ==================


  function handleSelect(event, buttonName){
      console.log(buttonName + " " + "SELECTED!");
      // console.log(event)
      setSelectedTopic(buttonName);

      // setSelectedTabContent(EXAMPLES[buttonName.toLowerCase()]);
      // console.log(selectedTabContent)



      // if (buttonName == "Components"){

      // }else if (buttonName == "JSX") {

      // } else if (buttonName == "Props"){

      // } else{

      // }
  }

  
  function changeFramework(){
    let randomIndex = Math.floor(Math.random() * 3);
    console.log('HI')
    console.log(randomIndex)
    currentFramework = jsFrameworks[randomIndex];
    console.log(currentFramework)
    setCurrentFramework(currentFramework)
  }

  
  // changeFramework = () => {
  //   let randomIndex = Math.floor(Math.random() * 3);
  //   console.log('HI')
  //   console.log(randomIndex)
  //   currentFramework = jsFrameworks[randomIndex];
  //   console.log(currentFramework)
  // }
  

  return (
    <>
      <Header></Header>

      <section id="examples">
        <h2>Examples</h2>
        <menu>
          <TabButton isSelected={selectedTopic == "Components"} onSelect={(event) => handleSelect(event, "Components")}><i>Components</i></TabButton>
          <TabButton isSelected={selectedTopic == "JSX"} onSelect={(event) => handleSelect(event, "JSX")}><i>JSX</i></TabButton>
          <TabButton isSelected={selectedTopic == "Props"} onSelect={(event) => handleSelect(event, "Props")}><i>Props</i></TabButton>
          <TabButton isSelected={selectedTopic == "State"} onSelect={(event) => handleSelect(event, "State")}>State</TabButton>
        </menu>

        {/* alternative to ternary operator if you dont have else */}
        {/* {selectedTopic && <h2>{selectedTopic}</h2>} */}

        {topicTitle1}

        {selectedTopic? (
          <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic.toLowerCase()].title}</h3>
            <p>{EXAMPLES[selectedTopic.toLowerCase()].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic.toLowerCase()].code}</code>
            </pre>
          </div>
        )
        : <h3>Please select a topic!</h3>
        }


      </section>

      <section id='list-items-using-map'>
        <ul>
          {listData.map(x => {
            return (
              // key is needed by react to optimize the rendering of lists
              <ListItem2 key={x.title} {...x}></ListItem2>
            )
          })}
        </ul>
      </section>


      <section id='list-items'>
        <ul>
          <ListItem image={reactLogo} title="Title 1" subtitle="Subtitle 1" hobbies={['Badminton', 'Swimming', 'Gym']} address={{ state: "Penang", country: "Malaysia"}} />
          {/* <ListItem image={viteLogo} title="Title 2" subtitle="Subtitle 2" hobbies={['Badminton', 'Swimming', 'Gym', 'lalala']} address={{ state: "Kedah", country: "Malaysia"}} /> */}
          
          {/* with company provided */}
          <ListItem2 {...listData[1]} company={"Intel IDK"} address={{state: "test state1", country: "test country1"}}/>
          
          {/* no company provided, default value is used */}
          <ListItem2 {...listData[1]}/>
          
          <ListItem address={{ state: "State 3", country: "Country 3"}}/>
          
          {/* <ListItem /> wont work because address is null so cant access state/country */}
          
          <ListItem image={listData[2].image} title={listData[2].title} subtitle={listData[2].subtitle} hobbies={listData[2].hobbies} address={listData[2].address} job={listData[2].job}></ListItem>
          
          {/* props key must be the same as the listData object keys to use this shortcut (e.g. listData[3].img wont be mapped to props.image) */}
          <ListItem {...listData[3]}></ListItem>
          
          <ListItem3 info={listData[4]} />
          
          <ListItem4 title={listData[5].title} address={listData[5].address} />
        </ul>
      </section>


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
      <button onClick={() => changeTestIndex()}>Change testIndex</button>
      {/* WONT WORK */}
    </>
  )
}



export default App
