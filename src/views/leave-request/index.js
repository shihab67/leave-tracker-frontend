import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

export default function LeaveRequest() {
  return (
    <>
      <Calendar localizer={localizer} startAccessor="start" endAccessor="end" style={{ height: 500 }} />
    </>
  );
}
