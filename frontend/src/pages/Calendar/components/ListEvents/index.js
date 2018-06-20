import React from 'react';
import { PropTypes } from 'prop-types';

const ListEvents = ({ events }) => (
  <div>
    {
        events && events.map(ev => (
          <div>
            {ev.title}
          </div>
        ))
    }
  </div>
);

ListEvents.prototype = {
  events: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }),
};

export default ListEvents;

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
