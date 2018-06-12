import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';

import { ContainerCalendar } from './styles';

class Calendar extends Component {
  state = {
    date: new Date(),
  };

  onChange = date => this.setState({ date });

  render() {
    return (
      <section>
        <h1>Schedule</h1>
        <ContainerCalendar>
          <ReactCalendar onChange={this.onChange} value={this.state.date} />
        </ContainerCalendar>
      </section>
    );
  }
}

export default Calendar;
