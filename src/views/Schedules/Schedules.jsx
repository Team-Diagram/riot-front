import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  Button,
} from '@tremor/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { rooms } from '../../utils'
import { SelectInput } from '../../components'

function Schedules() {
  const [value, setValue] = useState(rooms[0].label)
  const [roomData, setRoomData] = useState(rooms[0].hours)

  useEffect(() => {
    setRoomData(rooms.filter((room) => room.label === value)[0])
  }, [value])

  return (
    <>
      <div className="schedules-top-container">
        <h1>
          Planning salle
          {' '}
          {roomData.label}
        </h1>
        <div className="schedules-top-container__buttons">
          <SelectInput data={rooms.map((room) => room.label)} onChange={setValue} firstValue={rooms[0].label} />
          <Button variant="primary" iconPosition="right" icon={PlusCircleIcon}>
            Ajouter des créneaux
          </Button>
        </div>
      </div>

      <div className="container-box">
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          weekends={false}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'timeGridDay,timeGridWeek',
          }}
          locale="fr"
          views={{
            timeGridWeek: {
              dayHeaderFormat: { weekday: 'long', day: '2-digit' },
            },
          }}
          nowIndicator="true"
          slotMinTime="08:00"
          slotMaxTime="18:00"
          slotDuration="01:00:00"
          height="653px"
          allDaySlot={false}
          events={roomData.hours}
        />
      </div>
    </>
  )
}

export default Schedules
