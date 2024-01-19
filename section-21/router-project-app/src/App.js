// Challenge / Exercise

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/HomePage";
import Events, { loader as eventsLoader } from "./pages/Events";
import EventDetail, { action as eventDetailsDeleteAction, loader as eventDetailsLoader } from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import Error from "./pages/Error";
import { action as eventAction } from "./components/EventForm";
import Newsletter, { action as newsletterAction } from "./pages/Newsletter";

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />, 
    errorElement: <Error />,
    children: [
      { index: true, element: <Home />},
      {
        path: 'events', 
        element: <EventsRootLayout />,
        children: [
          // can be index: true as well
          { 
            path: '', 
            element: <Events />,
            // we can use the useLoaderData to get the events data starting from this level and below (e.g. EventsList component)
            // similar to resolver in Angular, react will wait for loader to complete before executing the component/page function
            loader: eventsLoader
          },
          { 
            path: ':eventId', 
            id: 'event-detail',
            loader: eventDetailsLoader,
            children: [
              { index: true, element: <EventDetail />, action: eventDetailsDeleteAction },
              { path: 'edit', element: <EditEvent />, action: eventAction },
              // { path: ':eventId/edit', element: <EditEvent /> },
            ]
          },
          { path: 'new', element: <NewEvent />, action: eventAction }
        ]
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      // { path: '/events/:eventId', element: <EventDetail />},
      // { path: '/events/:eventId/edit', element: <EditEvent />},
      // { path: '/events/new', element: <NewEvent />},

    ]
  },

])

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
