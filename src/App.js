import './App.css'
import {
  fetchYears,
  fetchMakes,
  fetchModels,
  fetchOptions,
  selectYearsMenu,
  selectModelsMenu,
  selectMakesMenu,
  selectOptionsMenu,
  selectVehicleRecord,
  selectUsersCar,
  updateUsersCar,
  fetchVehicleRecord,
} from './store/carsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const yearsMenu = useSelector(selectYearsMenu)
  const makesMenu = useSelector(selectMakesMenu)
  const modelsMenu = useSelector(selectModelsMenu)
  const optionsMenu = useSelector(selectOptionsMenu)
  const usersCar = useSelector(selectUsersCar)
  const vehicleRecord = useSelector(selectVehicleRecord)

  const handleSelectChange = ({ target }) => {
    dispatch(updateUsersCar({ menu: target.name, menuData: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(e.target[3].options[1].id)
    const options = e.target[3].options
    const id = options[options.selectedIndex].id
    dispatch(fetchVehicleRecord(id))
  }

  useEffect(() => {
    dispatch(fetchYears())
    console.log('fetching years...')
  }, [dispatch])

  useEffect(() => {
    if (usersCar.year !== undefined) {
      dispatch(fetchMakes(usersCar.year))
      console.log('fetching makes...')
    }
  }, [dispatch, usersCar.year])

  useEffect(() => {
    if (usersCar.make !== undefined) {
      dispatch(fetchModels({ year: usersCar.year, make: usersCar.make }))
      console.log('fetching models...')
    }
  }, [dispatch, usersCar.make, usersCar.year])

  useEffect(() => {
    if (usersCar.model !== undefined) {
      console.log('fetching options...')
      dispatch(fetchOptions(usersCar))
    }
  }, [dispatch, usersCar])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='year'>Year</label>
        <select
          id='year'
          name='year'
          onChange={handleSelectChange}
          disabled={yearsMenu.disabled}
        >
          <option value='' selected hidden></option>
          {yearsMenu.years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor='make'>Make</label>
        <select
          disabled={makesMenu.disabled}
          id='make'
          name='make'
          onChange={handleSelectChange}
        >
          <option value='' selected hidden></option>
          {makesMenu.makes?.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
        <label htmlFor='model'>Model</label>
        <select
          disabled={modelsMenu.disabled}
          id='model'
          name='model'
          onChange={handleSelectChange}
        >
          <option value='' selected hidden></option>
          {modelsMenu.models?.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <label htmlFor='options'>Options</label>
        <select
          disabled={optionsMenu.disabled}
          id='options'
          name='options'
          onChange={handleSelectChange}
        >
          <option value='' selected hidden></option>
          {optionsMenu.options?.map((option) => (
            <option key={option.value} value={option.text} id={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <input type='submit' />
      </form>

      {vehicleRecord ? vehicleRecord.comb08 : null}
    </div>
  )
}

export default App
