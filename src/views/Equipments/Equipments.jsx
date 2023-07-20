import { Icon } from '@tremor/react'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import {TableGlobal, SelectInput, Alert} from 'src/components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fetchEquipments from '../../controllers/EquipmentController'
import fetchNotifications from "../../controllers/NotificationController.js";

function Equipments() {
  const [equipmentsData, setEquipmentsData] = useState([])
  const [notificationData, setNotificationData] = useState([])

  useEffect(() => {
    fetchEquipments()
      .then((jsonData) => {
        setEquipmentsData(jsonData.message)
      })

    fetchNotifications()
      .then((jsonData) => {
        setNotificationData(jsonData.message)
      })
  }, [])

  const navigate = useNavigate()

  // eslint-disable-next-line camelcase
  const handleRoomClick = (item) => {
    // eslint-disable-next-line camelcase
    navigate(`/equipements/salle/${item.place_name}`)
  }

  const handleMapShow = (item) => {
    const mapOver = window.document.getElementById(`map${item.place_name}`)
    const mapGeneral = window.document.getElementById('mapAll')
    mapOver.style.opacity = '1'
    mapGeneral.style.opacity = '0'
  }
  const handleMapLeave = (item) => {
    const mapOver = window.document.getElementById(`map${item.place_name}`)
    const mapGeneral = window.document.getElementById('mapAll')
    mapOver.style.opacity = '0'
    mapGeneral.style.opacity = '1'
  }

  const filteredNotificationData = notificationData.filter((notification) => notification.data.placeId === equipmentsData.place_id)

  const renderEquipementsCell = (item) => (
    <div className="table-cell-equipements">
      <div className="table-cell-equipements-icons">
        {
          item.light_state
            ? <Icon icon={LightBulbIcon} color="yellow" />
            : <Icon icon={LightBulbIcon} color="default" />
        }

        {
          item.heater_state > 0
            ? <Icon icon={FireIcon} color="orange" />
            : <Icon icon={FireIcon} color="default" />
        }

        {
          item.ac_state > 0
            ? <img src="./public/images/icons/clim-icon-blue.svg" />
            : <img src="./public/images/icons/clim-icon.svg" />
        }

        {
          item.vent_state > 0
            ? <img src="./public/images/icons/ventilation-icon-blue.svg" />
            : <img src="./public/images/icons/ventilation-icon.svg" />
        }
      </div>
      {
        filteredNotificationData.length > 0 ? (
          <div className="table-cell-equipements-alert">
            <img src="./public/images/icons/alert-icon.svg" />
          </div>
        )
          : null
      }
    </div>

  )
  const renderSalleCell = (item) => <p onClick={() => handleRoomClick(item)}>{item.place_name}</p>

  const renderCells = {
    Lieux: renderSalleCell,
    Equipements: renderEquipementsCell,
  }

  return (
    <>
      <h1>Equipements</h1>
      <div className="container-page-content-row equipement-content">
        <div className="container-box equipement-content-map">
          <div className="equipement-content-map-image">
            <img id="mapAll" src="./public/images/maps/plan-batiment.svg" alt="Plan du bâtiment" />
            <img id="mapA104" src="./public/images/maps/A104.svg" alt="Plan du bâtiment" />
            <img id="mapA105" src="./public/images/maps/A105.svg" alt="Plan du bâtiment" />
            <img id="mapA106" src="./public/images/maps/A106.svg" alt="Plan du bâtiment" />
            <img id="mapA107" src="./public/images/maps/A107.svg" alt="Plan du bâtiment" />
            <img id="mapA108" src="./public/images/maps/A108.svg" alt="Plan du bâtiment" />
            <img id="mapA109" src="./public/images/maps/A109.svg" alt="Plan du bâtiment" />
            <img id="mapA110" src="./public/images/maps/A110.svg" alt="Plan du bâtiment" />
            <img id="mapA111" src="./public/images/maps/A111.svg" alt="Plan du bâtiment" />
            <img id="mapA112" src="./public/images/maps/A112.svg" alt="Plan du bâtiment" />
            <img id="mapA113" src="./public/images/maps/A113.svg" alt="Plan du bâtiment" />
            <img id="mapCAFET" src="./public/images/maps/CAFET.svg" alt="Plan du bâtiment" />
            <img id="mapTRAVAIL" src="./public/images/maps/TRAVAIL.svg" alt="Plan du bâtiment" />
          </div>
        </div>
        <div className="container-box equipement-content-salles">
          <TableGlobal
            headers={['Lieux', 'Equipements']}
            data={equipmentsData}
            renderCells={renderCells}
            onClickNavigate={handleRoomClick}
            onOverRow={handleMapShow}
            onLeaveRow={handleMapLeave}
          />
        </div>
      </div>
    </>
  )
}

export default Equipments
