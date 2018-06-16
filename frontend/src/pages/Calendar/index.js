import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import TimePicker from 'react-time-picker';

import { add } from '../../services/calendar';

import { ContainerCalendar, ContainerTime, Input, Form } from './styles';

class Calendar extends Component {
  state = {
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
      title, location, selectedDate, selectedTime,
    } = this.state;

    const newEvent = {
      title,
      location,
      date: selectedDate,
      hour: selectedTime,
    };

    const { data } = await add(newEvent);
  };

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
        </ContainerCalendar>
        <ContainerTime>
          <TimePicker onChange={this.onChangeTime} value={this.state.selectedTime} />
        </ContainerTime>
        <Form onSubmit={this.addEvent}>
          <Input
            type="text"
            placeholder="Nome do evento"
            onChange={e => this.setState({ title: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Local"
            onChange={e => this.setState({ location: e.target.value })}
          />
          <button type="submit">Cadastrar</button>
        </Form>
      </section>
    );
  }
}

export default Calendar;
