import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import { useParams } from 'react-router-dom'
import { Alert, BackLink, Toggle } from 'src/components'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import fetchEquipments from 'src/controllers/EquipmentController'
import fetchEquipmentsState from 'src/controllers/VariatorEquipment'

function Room() {
  const [equipmentsData, setEquipmentsData] = useState([])
  const [notificationData] = useState([])
  const headers = ['Température', 'Taux CO2', 'Luminosité', 'Consommation', 'Nombre de personnes']

  useEffect(() => {
    const fetchData = () => {
      fetchEquipments()
        .then((jsonData) => {
          setEquipmentsData(jsonData.message)
        })
    }
    fetchData()
    const intervalId = setInterval(fetchData, 31 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  const { id } = useParams()
  const roomData = equipmentsData.find((item) => item.place_name === id)

  if (!roomData) {
    return <p>Salle en cours de chargement</p>
  }

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)

  let isAdmin = false

  if (decodedToken.roles.includes('ROLE_ADMIN')) {
    isAdmin = true
  }

  const handleLightState = () => {
    const updatedEquipmentsData = [...equipmentsData]
    const targetPlaceId = roomData.place_id
    const targetIndex = updatedEquipmentsData.findIndex((item) => item.place_id === targetPlaceId)

    updatedEquipmentsData[targetIndex].light_state = !updatedEquipmentsData[targetIndex].light_state

    setEquipmentsData(updatedEquipmentsData)

    fetch(`${import.meta.env.VITE_API_BASE_URL}/switch/light`, {
      method: 'POST',
      body: JSON.stringify({
        place_id: targetPlaceId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
  }

  const temperatureData = roomData.measure_values
    .find((measure) => 'temperature' in measure).temperature
  const co2Data = roomData.measure_values.find((measure) => 'co2' in measure).co2
  const luminositeData = roomData.measure_values.find((measure) => 'lux' in measure).lux
  const kwhData = roomData.measure_values.find((measure) => 'kwh' in measure).kwh

  const tempeatureRound = Math.round(temperatureData)
  const luminositeRound = Math.round(luminositeData)

  const handleChangeState = (target, action) => {
    const updatedEquipmentsData = [...equipmentsData]
    const targetPlaceId = roomData.place_id
    const targetIndex = updatedEquipmentsData.findIndex((item) => item.place_id === targetPlaceId)
    let value = updatedEquipmentsData[targetIndex][`${target}_state`]

    if (action === 'increase') {
      value += 1
    } else {
      value -= 1
    }

    if (targetIndex !== -1) {
      updatedEquipmentsData[targetIndex][`${target}_state`] = value
      setEquipmentsData(updatedEquipmentsData)
      if (target === 'ac') {
        fetchEquipmentsState(
          token,
          'climatisation',
          targetPlaceId,
          updatedEquipmentsData[targetIndex][`${target}_state`],
        )
      } else {
        fetchEquipmentsState(
          token,
          target,
          targetPlaceId,
          updatedEquipmentsData[targetIndex][`${target}_state`],
        )
      }
    }
  }

  const filteredNotificationData = notificationData
    .filter((notification) => notification.data.placeId === roomData.place_id)

  const dateAlert = () => {
    const dateInput = '2023-07-12 11:28:22'
    const dateObj = new Date(dateInput)
    const addZero = (number) => (number < 10 ? `0${number}` : number)
    const date = {
      day: addZero(dateObj.getDate()),
      month: addZero(dateObj.getMonth() + 1),
      fullYear: dateObj.getFullYear(),
      hours: addZero(dateObj.getHours()),
      min: addZero(dateObj.getMinutes()),
    }

    return `${date.day}/${date.month}/${date.fullYear} à ${date.hours}h${date.min}`
  }

  return (
    <>
      <div>
        <BackLink
          url="/equipements"
        />
        <h1>
          Gestion de la salle
          {' '}
          {roomData.place_name}
        </h1>
      </div>
      {
        filteredNotificationData.length > 0 ? (
          <div className="container-page-content-row">
            {filteredNotificationData.map((notification) => (
              <Alert
                key={notification.data.info}
                Title={notification.data.info}
                Text={dateAlert}
              />
            ))}
          </div>
        )
          : null
      }
      <div className="container-page-content-row">
        <div className="container-box room-controller room-controller-toggle">
          <div className="room-controller-toggle-text">
            {
              roomData.light_state
                ? <Icon icon={LightBulbIcon} size="lg" color="yellow" />
                : <Icon icon={LightBulbIcon} size="lg" color="stone" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.light_state ? { color: '#10002B' } : null}
            >
              Lumière
            </p>
          </div>
          {
            isAdmin ? (
              <Toggle
                selectedTab={roomData.light_state ? 0 : 1}
                onTabChange={handleLightState}
              />
            ) : null
          }
        </div>
        <div className="container-box room-controller room-controller-toggle">
          <div className="room-controller-toggle-text">
            {
              roomData.heater_state > 0
                ? <Icon size="lg" icon={FireIcon} color="orange" />
                : <Icon size="lg" icon={FireIcon} color="stone" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.heater_state > 0 ? { color: '#10002B' } : null}
            >
              Chauffage
            </p>
          </div>
          <div className="room-controller-toggle-control">
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnDecreaseHeater"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('heater', 'decrease')}
                  disabled={roomData.heater_state === 0}
                >
                  <p>-</p>
                </button>
              ) : null
            }
            <p>
              <span className="room-controller-number">{roomData.heater_state}</span>
              /6
            </p>
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnIncreaseHeater"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('heater', 'increase')}
                  disabled={roomData.heater_state === 6}
                >
                  <p>+</p>
                </button>
              ) : null
            }
          </div>
        </div>
      </div>
      <div className="container-page-content-row">

        <div className="container-box room-controller room-controller-toggle">
          <div className="room-controller-toggle-text">
            {
              roomData.ac_state > 0
                ? <img className="icon-ac" src="../../public/images/icons/clim-icon-blue.svg" />
                : <img className="icon-ac" src="../../public/images/icons/clim-icon.svg" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.ac_state > 0 ? { color: '#10002B' } : null}
            >
              Climatisation
            </p>
          </div>
          <div className="room-controller-toggle-control">
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnDecreaseAc"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('ac', 'decrease')}
                  disabled={roomData.ac_state === 0}
                >
                  <p>-</p>
                </button>
              ) : null
            }
            <p>
              <span className="room-controller-number">{roomData.ac_state}</span>
              /6
            </p>
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnIncreaseAc"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('ac', 'increase')}
                  disabled={roomData.ac_state === 6}
                >
                  <p>+</p>
                </button>
              ) : null
            }
          </div>
        </div>
        <div className="container-box room-controller room-controller-toggle">
          <div className="room-controller-toggle-text">
            {
              roomData.vent_state > 0
                ? <img className="icon-ac" src="public/images/icons/ventilation-icon-blue.svg" />
                : <img className="icon-ac" src="public/images/icons/ventilation-icon.svg" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.vent_state > 0 ? { color: '#10002B' } : null}
            >
              Ventilation
            </p>
          </div>
          <div className="room-controller-toggle-control">
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnDecreaseAc"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('vent', 'decrease')}
                  disabled={roomData.vent_state === 0}
                >
                  <p>-</p>
                </button>
              ) : null
            }
            <p>
              <span className="room-controller-number">{roomData.vent_state}</span>
              /12
            </p>
            {
              isAdmin ? (
                <button
                  type="button"
                  id="btnIncreaseAc"
                  className="room-controller-toggle-control-button"
                  onClick={() => handleChangeState('vent', 'increase')}
                  disabled={roomData.vent_state === 12}
                >
                  <p>+</p>
                </button>
              ) : null
            }
          </div>
        </div>
      </div>
      <div className="container-box">
        <h2>Statistiques</h2>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeaderCell key={header}>
                  {header}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {tempeatureRound}
                °C
              </TableCell>
              <TableCell>
                {co2Data}
                ppm
              </TableCell>
              <TableCell>
                {luminositeRound}
                Lux
              </TableCell>
              <TableCell>
                {kwhData}
                KwH
              </TableCell>
              <TableCell>{roomData.people_count}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="container-box room-map">
        <img src={`../../public/images/maps/${roomData.place_name}.svg`} alt="Plan de la salle" />
      </div>
    </>
  )
}

export default Room
