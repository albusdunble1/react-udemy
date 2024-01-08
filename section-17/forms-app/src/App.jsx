import Header from './components/Header.jsx';
// import LoginWithState from './components/LoginWithState.jsx';
import LoginWithStateCustomHook from './components/LoginWithStateCustomHook.jsx';
// import Login from './components/Login.jsx';
// import Signup from './components/SignUp.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Login /> */}
        {/* <Signup /> */}
        {/* <LoginWithState /> */}
        <LoginWithStateCustomHook />
      </main>
    </>
  );
}

export default App;
