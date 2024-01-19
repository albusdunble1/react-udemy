import { NavLink } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* <a href="/events">All Events</a> */}
            <NavLink end to="/events" className={({isActive}) => isActive ? classes.active : undefined }>All Events</NavLink>
          </li>
          <li>
            {/* <a href="/events/new">New Event</a> */}
            <NavLink to="/events/new" className={({isActive}) => isActive ? classes.active : undefined }>New Events</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
