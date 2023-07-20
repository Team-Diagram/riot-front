import {
  Callout,
  Icon, MarkerBar, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow,
} from '@tremor/react'
import { useParams } from 'react-router-dom'
import { Alert, BackLink, Toggle } from 'src/components'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import fetchEquipments from '../../controllers/EquipmentController.js'
import fetchEquipmentsState from "../../controllers/VariatorEquipment.js";

function Room() {
  const [equipmentsData, setEquipmentsData] = useState([])

  const headers = ['Température', 'Taux CO2', 'Luminosité', 'Consommation', 'Nombre de personnes']

  useEffect(() => {
    fetchEquipments()
      .then((jsonData) => {
        setEquipmentsData(jsonData.message)
      })
  }, [])

  const { id } = useParams()
  const roomData = equipmentsData.find((item) => item.place_name === id)

  if (!roomData) {
    return <p>Salle en cours de chargement</p>
  }

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)

  let isAdmin = false

  if (decodedToken.roles.includes('ROLE_ADMIN')) {
    isAdmin = true
  }

  const handleLightState = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/switch/light`, {
      method: 'POST',
      body: JSON.stringify({
        place_id: roomData.place_id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const tempeatureRound = Math.round(roomData.measure_values[1].temperature)
  const luminositeRound = Math.round(roomData.measure_values[2].lux)

  const increaseHeater = () => {
    fetchEquipmentsState(token, 'heater', roomData.place_id, roomData.heater_state +1 )
  }
  const decreaseHeater = () => {
    console.log('decreaseHeater')
  }
  const increaseAc = () => {
    console.log('increaseAc')
  }
  const decreaseAc = () => {
    console.log('decreaseAc')
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
        roomData.alert
          ? (
            <div className="container-page-content-row">
              <Alert
                Title="Titre de l'alerte"
                Text="Texte assez long de l'alerte lalala"
              />
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
                : <Icon icon={LightBulbIcon} size="lg" color="default" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.light_state ? { color: '#10002B' } : null}
            >
              Lumière
            </p>
          </div>
          <Toggle
            selectedTab={roomData.light_state ? '0' : '1'}
            onTabChange={handleLightState}
          />
        </div>
        <div className="container-box room-controller room-controller-toggle">
          <div className="room-controller-toggle-text">
            {
              roomData.heater_state > 0
                ? <Icon size="lg" icon={FireIcon} color="orange" />
                : <Icon size="lg" icon={FireIcon} color="default" />
            }
            <p
              className="room-controller-bar-text-title size-18 font-bold"
              style={roomData.heater_state > 0 ? { color: '#10002B' } : null}
            >
              Chauffage
            </p>
          </div>
          <div className="room-controller-toggle-control">
            <button
              id="btnDecreaseHeater"
              className="room-controller-toggle-control-button"
              onClick={decreaseHeater}
              disabled={roomData.heater_state === 0}
            >
              <p>-</p>
            </button>
            <p>
              <span className="room-controller-number">{roomData.heater_state}</span>
              /6
            </p>
            <button
              id="btnIncreaseHeater"
              className="room-controller-toggle-control-button"
              onClick={increaseHeater}
              disabled={roomData.heater_state === 6}
            >
              <p>+</p>
            </button>
          </div>
        </div>
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
            <button
              id="btnDecreaseAc"
              className="room-controller-toggle-control-button"
              onClick={decreaseAc}
              disabled={roomData.ac_state === 0}
            >
              <p>-</p>
            </button>
            <p>
              <span className="room-controller-number">{roomData.ac_state}</span>
              /6
            </p>
            <button
              id="btnIncreaseAc"
              className="room-controller-toggle-control-button"
              onClick={increaseAc}
              disabled={roomData.ac_state === 6}
            >
              <p>+</p>
            </button>
          </div>
        </div>
      </div>
      <div className="container-box">
        <h2>Statistiques</h2>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableHeaderCell key={index}>
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
                {roomData.measure_values[0].co2}
                ppm
              </TableCell>
              <TableCell>
                {luminositeRound}
                Lux
              </TableCell>
              <TableCell>
                {roomData.measure_values[9].kwh}
                KwH
              </TableCell>
              <TableCell>{roomData.measure_values[11].persons}</TableCell>
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
