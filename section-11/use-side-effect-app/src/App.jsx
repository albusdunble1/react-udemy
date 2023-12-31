import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'


const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id));

function App() {
  // const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // const [pickedPlaces, setPickedPlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  // useEffect is mainly used to prevent infinite loops
  // useEffect hook will only execute after everything in the component has finished executing (when the jsx code is returned)
  // second argument is the dependency array which will be checked by React if the values in it has changed
  // if it doesnt change it will only execute it once, otherwise useEffect will execute everytime it changes
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
  
      setAvailablePlaces(sortedPlaces);
      console.log('EXECUTED POSITION USE EFFECT')

    });
  }, []);

  // REDUNDANT BECAUSE LOCAL STORAGE CODE IS SYNCHRONOUS, IT EXECUTES LINE BY LINE AND DOES REQUIRE ANY WAITING UNLIKE getCurrentPosition
  // JUST MOVE THE CODE BEFORE USESTATE AND INITIALIZE THE STATE WITH THE RETRIEVED LOCALS STORAGE VALUE
  // useEffect(() => {
  //   const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  //   const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id))

  //   setPickedPlaces(storedPlaces)
  //   console.log('POPULATE FROM LOCAL STORAGE USE EFFECT')
  // }, []);


  // console.log('EXECUTED APP')

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    // modal.current.close();
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1){
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]))
    }
  }

  // useCallback will ensure that handleRemovePlace reference address will be the same 
  // this is so that the onConfirm dependency in DeleteConfirmation's useEffect hook will not be changed everytime the App component function is reexecuted

  // similar to useEffects second dependency argument
  // second argument is the dependency array which will be checked by React if the values in it has changed
  // if it doesnt change it will only execute it once, otherwise useCallback will execute everytime it changes
  // creating a new function object with a new reference address in the process (not sure when to apply this yet)
  // empty array is to tell React that nothing will be changed so this useCallback hook does not need to recreate the handleRemove place function
  const handleRemovePlace = useCallback(function handleRemovePlace() {
    console.log('handleRemovePlace CALLED')
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    // modal.current.close();
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter(id => id !== selectedPlace.current)));
  }, []);


  // // dummy function to simulate the infinite loop if useCallback(function above) is not used to prevent the component reexecution from recreating the handleRemovePlace function object 
  // // because the function object will always have a different reference address even though the function recreated is the exact same
  // // the setModalIsOpen is commented out to prevent the DeleteConfirmation component from being removed from the DOM to showcase the infinite loop
  // function handleRemovePlace2() {
  //   console.log('handleRemovePlace CALLED')
  //   setPickedPlaces((prevPickedPlaces) =>
  //     prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
  //   );
  //   // modal.current.close();
  //   // setModalIsOpen(false);

  //   const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  //   localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter(id => id !== selectedPlace.current)));
  // }

  return (
    <>
      {/* <Modal ref={modal}> */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
