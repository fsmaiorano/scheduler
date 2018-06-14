import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';

import { add } from '../../services/calendar';

import { ContainerCalendar } from './styles';

class Calendar extends Component {
    state = {
      date: new Date(),
      selectedDate: new Date().toLocaleDateString(),
      title: '',
      location: '',
    };

    onChange = (date) => {
      this.setState({ selectedDate: date.toLocaleDateString() });
    };

    addEvent = async (e) => {
      e.preventDefault();
      const { title, location, selectedDate } = this.state;
      const newEvent = {
        title,
        location,
        selectedDate,
      };

      const { data } = await add(newEvent);
      debugger;
    }

    render() {
      return (
        <section>
          <h1>Schedule</h1>
          <ContainerCalendar>
            <ReactCalendar
              onChange={this.onChange}
              value={this.state.date}
              minDate={new Date()}
            />
            <form onSubmit={this.addEvent}>
              <input type="text" placeholder="Nome do evento" onChange={e => this.setState({ title: e.target.value })} />
              <input type="text" placeholder="Local" onChange={e => this.setState({ location: e.target.value })} />
              <button type="submit">Cadastrar</button>
            </form>
          </ContainerCalendar>
        </section>
      );
    }
}

export default Calendar;
