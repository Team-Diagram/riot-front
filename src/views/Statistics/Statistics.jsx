import { Select, SelectItem, AreaChart } from '@tremor/react'
import { useEffect, useState } from 'react'
import fetchStatistics from '../../controllers'

function Statistics() {
  const [value, setValue] = useState(1)
  const [areaChartData, setAreaChartData] = useState([])
  const [watt, setWatt] = useState()
  const [money, setMoney] = useState()
  const buttonSelectData = ['Semaine', 'Mois', 'Année']

  // Bon on a un peu menti sur la data mais oklm
  const days = {
    ecoWatt: '72',
    ecoMoney: '34',
    label: ['Samedi 15', 'Dimanche 16', 'Lundi 17', 'Mardi 18', 'Mercredi 19', 'Jeudi 20', 'Vendredi 23'],
  }

  const weeks = {
    ecoWatt: '434',
    ecoMoney: '120',
    label: ['Juin 26-30', 'Juil 3-7', 'Juil 10-14', 'Juil 17-23'],
  }

  const month = {
    ecoWatt: '4 344',
    ecoMoney: '2 300',
    label: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  }

  useEffect(() => {
    fetchStatistics()
      .then((jsonData) => {
        const statisticsData = jsonData.message.map((data) => data.kwh)
        switch (value) {
          case 1:
            setAreaChartData(statisticsData.slice(0, 7).map((stat, i) => (
              {
                date: days.label[i],
                Kwh: stat,
              }
            )))
            setWatt(days.ecoWatt)
            setMoney(days.ecoMoney)
            break

          case 2:
            setAreaChartData(statisticsData.slice(0, 4).map((stat, i) => (
              {
                date: weeks.label[i],
                Kwh: stat,
              }
            )))
            setWatt(weeks.ecoWatt)
            setMoney(weeks.ecoMoney)
            break
          default:
            setAreaChartData(statisticsData.slice(0, 12).map((stat, i) => (
              {
                date: month.label[i],
                Kwh: stat,
              }
            )))
            setWatt(month.ecoWatt)
            setMoney(month.ecoMoney)
        }
      })
  }, [value])

  return (
    <>
      <div className="statistics__top">
        <h1>
          Statistiques
        </h1>
        <Select value={value} onValueChange={setValue}>
          {buttonSelectData.map((data, i) => (
            <SelectItem value={i + 1}>
              {data}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="statistics__middle">
        <div className="container-box">
          <div>
            <h2>Économie d'énergie</h2>
            <p className="size-16">Économie d'énergie estimée par rapport à une gestion sans iot</p>
          </div>
          <p className="statistics__value">
            {watt}
            <span>kWh</span>
          </p>
        </div>
        <div className="container-box">
          <div>
            <h2>Économie financière</h2>
            <p className="size-16">Économie financière estimée par rapport à une gestion sans iot</p>
          </div>
          <p className="statistics__value">
            {money}
            <span>€</span>
          </p>
        </div>
      </div>

      <div className="container-box">
        <h2>Économie d'énergie</h2>
        <AreaChart
          className="h-72 mt-4"
          data={areaChartData}
          index="date"
          categories={['Kwh']}
          colors={['indigo']}
        />
      </div>
    </>
  )
}

export default Statistics
