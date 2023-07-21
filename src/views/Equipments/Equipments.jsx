import { Icon } from '@tremor/react'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import { TableGlobal } from 'src/components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fetchEquipments from 'src/controllers/EquipmentController'
import fetchNotifications from 'src/controllers/NotificationController'
import climIconBlue from 'src/assets/images/icons/clim-icon-blue.svg'
import climIcon from 'src/assets/images/icons/clim-icon.svg'
import planBatiment from 'src/assets/images/maps/plan-batiment.svg'
import ventilationIconBlue from 'src/assets/images/icons/ventilation-icon-blue.svg'
import ventilationIcon from 'src/assets/images/icons/ventilation-icon.svg'
import A104 from 'src/assets/images/maps/A104.svg'
import A105 from 'src/assets/images/maps/A105.svg'
import A106 from 'src/assets/images/maps/A106.svg'
import A107 from 'src/assets/images/maps/A107.svg'
import A108 from 'src/assets/images/maps/A108.svg'
import A109 from 'src/assets/images/maps/A109.svg'
import A110 from 'src/assets/images/maps/A110.svg'
import A111 from 'src/assets/images/maps/A111.svg'
import A112 from 'src/assets/images/maps/A112.svg'
import A113 from 'src/assets/images/maps/A113.svg'
import alertIcon from 'src/assets/images/icons/alert-icon.svg'
import CAFET from 'src/assets/images/maps/CAFET.svg'
import TRAVAIL from 'src/assets/images/maps/TRAVAIL.svg'

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

  const handleRoomClick = (item) => {
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

  const filteredNotificationData = notificationData
    .filter((notification) => notification.data.placeId === equipmentsData.place_id)

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
            ? <img src={climIconBlue} />
            : <img src={climIcon} />
        }

        {
          item.vent_state > 0
            ? <img src={ventilationIconBlue} />
            : <img src={ventilationIcon} />
        }
      </div>
      {
        filteredNotificationData.length > 0 ? (
          <div className="table-cell-equipements-alert">
            <img src={alertIcon} />
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
            <img id="mapAll" src={planBatiment} />
            <img id="mapA104" src={A104} />
            <img id="mapA105" src={A105} />
            <img id="mapA106" src={A106} />
            <img id="mapA107" src={A107} />
            <img id="mapA108" src={A108} />
            <img id="mapA109" src={A109} />
            <img id="mapA110" src={A110} />
            <img id="mapA111" src={A111} />
            <img id="mapA112" src={A112} />
            <img id="mapA113" src={A113} />
            <img id="mapCAFET" src={CAFET} />
            <img id="mapTRAVAIL" src={TRAVAIL} />
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
