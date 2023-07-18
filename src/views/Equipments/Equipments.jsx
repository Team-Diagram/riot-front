import { Icon } from '@tremor/react'
import { FireIcon, LightBulbIcon } from '@heroicons/react/outline'
import { TableGlobal, SelectInput } from 'src/components'

function Equipments() {
  const dataSalles = [
    {
      salle: 'A104',
      equipements: {
        lumiere: true,
        chauffage: false,
        climatisation: true,
      },
      type: 'salleCours',
      alert: true,
    },
    {
      salle: 'A105',
      equipements: {
        lumiere: true,
        chauffage: false,
        climatisation: true,
      },
      type: 'salleCours',
      alert: false,
    },
    {
      salle: 'A106',
      equipements: {
        lumiere: true,
        chauffage: true,
        climatisation: true,
      },
      type: 'salleCours',
      alert: true,
    },
    {
      salle: 'A107',
      equipements: {
        lumiere: false,
        chauffage: false,
        climatisation: true,
      },
      type: 'bureu',
      alert: false,
    },
    {
      salle: 'A108',
      equipements: {
        lumiere: true,
        chauffage: false,
        climatisation: true,
      },
      type: 'bureau',
      alert: false,
    },
    {
      salle: 'A109',
      equipements: {
        lumiere: false,
        chauffage: false,
        climatisation: false,
      },
      type: 'espaceCommun',
      alert: false,
    },
    {
      salle: 'A110',
      equipements: {
        lumiere: true,
        chauffage: false,
        climatisation: true,
      },
      type: 'espaceCommun',
      alert: true,
    },
  ]

  const renderEquipementsCell = (item) => (
    <div className="table-cell-equipements">
      <div className="table-cell-equipements-icons">
        {
              item.equipements.lumiere
                ? <Icon icon={LightBulbIcon} color="yellow" />
                : <Icon icon={LightBulbIcon} color="default" />
            }

        {
              item.equipements.chauffage
                ? <Icon icon={FireIcon} color="orange" />
                : <Icon icon={FireIcon} color="default" />
            }

        {
              item.equipements.climatisation
                ? <img src="./src/images/icons/clim-icon-blue.svg" />
                : <img src="./src/images/icons/clim-icon.svg" />
            }
      </div>
      {
              item.alert
                ? (
                  <div className="table-cell-equipements-alert">
                    <img src="./src/images/icons/alert-icon.svg" />
                  </div>
                )
                : null
            }
    </div>

  )

  const renderSalleCell = (item) => <p>{item.salle}</p>

  const renderCells = {
    Lieux: renderSalleCell,
    Equipements: renderEquipementsCell,
  }

  return (
    <>
      <div className="title-select title-select-equipements">
        <h1>Equipements</h1>
        <SelectInput
          placeholder="Sélectionner un type de lieu"
          data={['Salles de cours', 'Bureaux', 'Espaces communs']}
        />
      </div>
      <div className="container-page-content-row equipement-content">
        <div className="container-box equipement-content-map">
          <div className="equipement-content-map-image">
            <img id="mapAll" src="./src/images/maps/plan-batiment.svg" alt="Plan du bâtiment" />
            <img id="mapA104" src="./src/images/maps/A104.svg" alt="Plan du bâtiment" />
            <img id="mapA105" src="./src/images/maps/A105.svg" alt="Plan du bâtiment" />
            <img id="mapA106" src="./src/images/maps/A106.svg" alt="Plan du bâtiment" />
            <img id="mapA107" src="./src/images/maps/A107.svg" alt="Plan du bâtiment" />
            <img id="mapA108" src="./src/images/maps/A108.svg" alt="Plan du bâtiment" />
            <img id="mapA109" src="./src/images/maps/A109.svg" alt="Plan du bâtiment" />
            <img id="mapA110" src="./src/images/maps/A110.svg" alt="Plan du bâtiment" />
            <img id="mapA111" src="./src/images/maps/A111.svg" alt="Plan du bâtiment" />
            <img id="mapA112" src="./src/images/maps/A112.svg" alt="Plan du bâtiment" />
            <img id="mapA113" src="./src/images/maps/A113.svg" alt="Plan du bâtiment" />
            <img id="mapCAFET" src="./src/images/maps/CAFET.svg" alt="Plan du bâtiment" />
            <img id="mapTRAVAIL" src="./src/images/maps/TRAVAIL.svg" alt="Plan du bâtiment" />
          </div>
        </div>
        <div className="container-box equipement-content-salles">
          <TableGlobal
            headers={['Lieux', 'Equipements']}
            data={dataSalles}
            renderCells={renderCells}
          />
        </div>
      </div>
    </>
  )
}

export default Equipments
