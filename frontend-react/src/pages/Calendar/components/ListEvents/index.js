import React, {Fragment} from 'react';
import { PropTypes } from 'prop-types';

const ListEvents = ({ events, destroy, share }) => (
    <Fragment>
    {
        events && events.map(ev => (
          <div key={ev._id} className="calendar-item">
            {ev.title}
            <button className="calendar-item__delete" onClick={() => destroy(ev)}> x</button>
            <button className="calendar-item__share" onClick={() => share(ev)}> compartilhar</button>
          </div>
        ))
    }
    </Fragment>
);

ListEvents.prototype = {
  events: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  destroy: PropTypes.func.isRequired,
  share: PropTypes.func.isRequired,
};

export default ListEvents;

