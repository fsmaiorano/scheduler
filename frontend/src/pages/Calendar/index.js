import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import TimePicker from 'react-time-picker';

import { add, getEvents } from '../../services/calendar';
import { ContainerCalendar, ContainerTime, Input, Form } from './styles';

import ListEvents from './components/ListEvents';

class Calendar extends Component {
  state = {
    selectedDate: new Date().toLocaleDateString(),
    selectedTime: new Date().toLocaleTimeString(),
    selectedEvents: [],
    title: '',
    location: '',
    events: [],
  };

  componentDidMount() {
    this.getEvents();
  }


  onChangeDate = (date) => {
    const formatedDate = date.toLocaleDateString();

    if (this.state.events.length > 0) {
      const events = this.state.events.filter(ev => ev.date === formatedDate);
      this.setState({ selectedEvents: events });
    }

    this.setState({ selectedDate: formatedDate });
  };

  onChangeTime = (time) => {
    this.setState({ selectedTime: time });
  };

  getEvents = async () => {
    const response = await getEvents();
    if (response.data.success) {
      this.setEvents(response.data.result);
    }
  }

  setEvents = (events) => {
    this.setState({ events });
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

    await add(newEvent);
    const { events, selectedEvents } = this.state;
    events.push(newEvent);
    selectedEvents.push(newEvent);
    this.setState({ events, selectedEvents });
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
        {this.state.selectedEvents.length > 0 ? (
          <ListEvents events={this.state.selectedEvents} />
        ) : null}
      </section>
    );
  }
}

export default Calendar;
