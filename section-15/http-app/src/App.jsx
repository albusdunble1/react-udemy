import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isFetching, setIsFetching] = useState(false);
  const [errorFetchingUserPlaces, setErrorFetchingUserPlaces] = useState();



  useEffect(() => {
    async function fetchUserPlacesFromServer() {
      setIsFetching(true);

      try {
        const userPlaces = await fetchUserPlaces();
        setUserPlaces(userPlaces);
      } catch (error) {
        setErrorFetchingUserPlaces({message: error.message || 'Could not fetch user places, please try again later.'});
      }

      setIsFetching(false);
    }

    fetchUserPlacesFromServer();
  }, [])



  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // optimistic updating, updating the ui without waiting for the response from the server to know if it's successful or not
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      let updatedMessage = '';
      if (!userPlaces.some((place) => place.id === selectedPlace.id)) {
        updatedMessage = await updateUserPlaces([selectedPlace, ...userPlaces]);
        console.log('SUCCESSFULLY UPDATED')
        console.log(updatedMessage)
      }

      // updatedMessage = await updateUserPlaces([selectedPlace, ...userPlaces]);
      // console.log('SUCCESSFULLY UPDATED')
      // console.log(updatedMessage)
    } catch (error) {
      console.log(error)
      // reset the user places if the update fails, because we updated the UI first before sending the http put request
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to update places.'})
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      const deleteMessage = await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
      console.log('SUCCESSFULLY DELETED')
      console.log(deleteMessage)
    } catch (error) {
      console.log(error)
      // reset the user places if the update fails, because we updated the UI first before sending the http put request
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to delete selected place.'})
    }

    setModalIsOpen(false);
  }, [userPlaces]);

  
  function handleError() {
      setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error has occured!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}

      </Modal>

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

        {errorFetchingUserPlaces && <Error title="An error occured while fetching user places" message={errorFetchingUserPlaces.message}/>}
        {!errorFetchingUserPlaces && (
          <Places
            title="I'd like to visit ..."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
