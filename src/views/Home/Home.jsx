import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useEffect, useState } from 'react'
import { Icon } from '@tremor/react'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import { getUserData, rooms } from 'src/utils'
import { fetchEquipments, fetchErrors, shutDownPlace } from 'src/controllers'
import { Alert, TableGlobal, Toggle } from 'src/components/index'

function Home() {
  const [roomData, setRoomData] = useState(rooms[0].hours)
  const [value, setValue] = useState(rooms[0].label)
  const [errors, setErrors] = useState([])
  const [states, setStates] = useState([])
  const [toggleValue, setToggleValue] = useState(1)
  const [userRole, setUserRole] = useState('')
  const [toggleClass, setToggleClass] = useState('')

  useEffect(() => {
    fetchEquipments()
      .then((jsonData) => {
        setStates(jsonData.message)
        const shutDownData = jsonData.message.map((data) => data.shut_down)
        setToggleValue(shutDownData.includes(true) ? 0 : 1)
      })
  }, [])

  const renderEquipementsCell = (item) => (
    <div className="table-cell-equipements">
      <div className="table-cell-equipements-icons">
        <Icon icon={LightBulbIcon} color={item.light_state ? 'yellow' : 'default'} />
        <Icon icon={FireIcon} color={item.heater_state ? 'orange' : 'default'} />
        <img src={`./public/images/icons/clim-${item.ac_state > 0 ? 'icon-blue' : 'icon'}.svg`} />
        <img src={`./public/images/icons/ventilation-${
          item.vent_state > 0 ? 'icon-blue' : 'icon'
        }.svg`}
        />
      </div>
    </div>
  )

  useEffect(() => {
    setUserRole(getUserData().roles[0])
  }, [])

  useEffect(() => {
    setToggleClass(userRole === 'ROLE_ADMIN' ? 'toggle-container' : 'toggle-container--disabled')
  }, [userRole])

  const handleShutDown = () => {
    if (userRole === 'ROLE_ADMIN') {
      const token = localStorage.getItem('token')
      const id = states.map((state) => state.place_id)
      const action = toggleValue === 0 ? 'shutdown' : 'reactive'
      shutDownPlace(action, id, token)
      setToggleValue(toggleValue === 0 ? 1 : 0)
    }
  }

  const renderOccupationCell = (item) => (
    <p onClick={() => setValue(item.place_name)}>
      {item.people_count}
    </p>
  )

  const renderSalleCell = (item) => (
    <p onClick={() => setValue(item.place_name)}>
      {item.place_name}
    </p>
  )

  const renderCells = {
    Lieux: renderSalleCell,
    Occupations: renderOccupationCell,
    Équipements: renderEquipementsCell,
  }

  useEffect(() => {
    fetchErrors()
      .then((jsonData) => {
        setErrors(jsonData.message)
      })
  }, [])

  useEffect(() => {
    setValue('A105')
  }, [])

  useEffect(() => {
    setRoomData(rooms.filter((room) => room.label === value)[0])
  }, [value])

  return (
    <div className="home-container">
      <h1>
        21 juillet 2023
      </h1>
      <div className="home-container__top">
        <div className="home-container__top--equipment container-box">
          <h2>Éteindre tous les équipements</h2>
          <div className={toggleClass}>
            <Toggle
              selectedTab={toggleValue}
              onTabChange={userRole === 'ROLE_ADMIN' ? handleShutDown : ''}
            />
          </div>
        </div>

        <div className="home-container__top--alert container-box">
          <div className="error-container-top">
            <h2>Alertes</h2>
            <p>{errors.length + 1}</p>
          </div>
          <div className="error-container-scroll">
            <Alert
              Title="co2 superieur a 700 salle A105"
              Text="2023-07-20 15:14:26"
            />
            {errors.map((error) => (
              <Alert
                key={error.data.info}
                Title={`${error.data.info} salle A104`}
                Text={error.time}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container-box home-container__bottom">
        <div className="list-rooms">
          <h2>Salles occupées</h2>
          <TableGlobal
            headers={['Lieux', 'Occupations', 'Équipements']}
            data={states}
            renderCells={renderCells}
          />
        </div>

        <div>
          <h2>
            Planning salle
            {' '}
            {value}
          </h2>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            weekends={false}
            headerToolbar={{
              left: null,
              center: null,
              right: null,
            }}
            locale="fr"
            nowIndicator="true"
            slotMinTime="08:00"
            slotMaxTime="18:00"
            slotDuration="01:00:00"
            height="653px"
            allDaySlot={false}
            events={roomData.hours}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
