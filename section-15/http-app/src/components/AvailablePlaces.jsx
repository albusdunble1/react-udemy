import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {

  // based on the lecture, apparently this is very common(when fetching data) to have 1 state for loading, 1 state for data and 1 state for error
  const [isFetching, setIsFetching] = useState(false);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    // NON-ASYNC-AWAIT ALTERNATIVE
    // fetch('http://localhost:3000/places').then(response => {
    //   return response.json();
    // }).then(placesData => {
    //   setPlaces(placesData.places)
    // })



    async function fetchPlaces() {
      setIsFetching(true);

      try {
        // const response = await fetch('http://localhost:3000/places');
        // const resData = await response.json();

        // if (!response.ok) {
        //   throw new Error('Failed to fetch places!');
        // }

        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setPlaces(sortedPlaces);
          setIsFetching(false);
        })

      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, [])


  if (error) {
    return <Error title="An error occured" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={places}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
