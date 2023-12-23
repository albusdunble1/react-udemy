import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

// IF YOU DONT WANT TO USE JSX, YOU CAN USE React.createElement instead, which is what happens behind the scenes, 
// first argument: parent element name, e.g. TabButton, Header, or 'p', 'div'
// second argument: props, such as {id: 'tab-button-wrapper'}
// third argument: nested child element
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App))
)
