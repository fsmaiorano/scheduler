import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import TimePicker from 'react-time-picker';

import { add } from '../../services/calendar';

import { ContainerCalendar } from './styles';

class Calendar extends Component {
    state = {
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      selectedDate: new Date().toLocaleDateString(),
      selectedTime: new Date().toLocaleTimeString(),
      title: '',
      location: '',
    };

    onChangeDate = (date) => {
      this.setState({ selectedDate: date.toLocaleDateString() });
    };

    onChangeTime = (time) => {
      this.setState({ selectedTime: time });
    };

    addEvent = async (e) => {
      e.preventDefault();
      const {
        title,
        location,
        selectedDate,
        selectedTime,
      } = this.state;

      const newEvent = {
        title,
        location,
        date: selectedDate,
        hour: selectedTime,
      };

      const { data } = await add(newEvent);
    }

    render() {
      return (
        <section>
          <h1>Schedule</h1>
          <ContainerCalendar>
            <ReactCalendar
              onChange={this.onChangeDate}
              value={this.state.date}
              minDate={new Date()}
            />
            <TimePicker
              onChange={this.onChangeTime}
              value={this.state.time}
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
