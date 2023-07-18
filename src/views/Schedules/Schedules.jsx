import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import {
  Select,
  SelectItem,
  Button,
} from '@tremor/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import rooms from '../../utils'

function Schedules() {
  const [selectedRoomId, setSelectedRoomId] = useState(1)
  const [selectedRoomLabel, setSelectedRoomLabel] = useState(rooms[0].label)
  const [roomHours, setRoomHours] = useState(rooms[0].hours)

  useEffect(() => {
    setSelectedRoomLabel(rooms[selectedRoomId - 1].label)
    setRoomHours(rooms[selectedRoomId - 1].hours)
  }, [selectedRoomId])

  return (
    <>
      <div className="schedules-top-container">
        <h1>
          Planning salle
          {' '}
          {selectedRoomLabel}
        </h1>
        <div className="schedules-top-container__buttons">
          <Select value={selectedRoomId}>
            {rooms.map((room, i) => (
              <SelectItem value={i + 1} onClick={() => setSelectedRoomId(i + 1)}>
                {room.label}
              </SelectItem>
            ))}
          </Select>
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
          events={roomHours}
        />
      </div>
    </>
  )
}

export default Schedules
