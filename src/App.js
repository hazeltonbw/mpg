import './App.css'
import {
  fetchYears,
  fetchMakes,
  fetchModels,
  fetchCarData,
  selectCarStyles,
  selectYearsMenu,
  selectSubmitDisabled,
  toggleSubmitDisabled,
  selectModelsMenu,
  selectMakesMenu,
  selectUsersCar,
  updateUsersCar,
} from './store/carsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const yearsMenu = useSelector(selectYearsMenu)
  const makesMenu = useSelector(selectMakesMenu)
  const modelsMenu = useSelector(selectModelsMenu)
  const usersCar = useSelector(selectUsersCar)
  const carStyles = useSelector(selectCarStyles)
  const submitDisabled = useSelector(selectSubmitDisabled)
  console.log(carStyles)

  const handleSelectChange = ({ target }) => {
    dispatch(updateUsersCar({ menu: target.name, menuData: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchCarData(usersCar))
    dispatch(toggleSubmitDisabled())
  }

  useEffect(() => {
    dispatch(fetchYears())
  }, [dispatch])

  useEffect(() => {
    if (usersCar.year !== undefined) dispatch(fetchMakes(usersCar.year))
  }, [dispatch, usersCar.year])

  useEffect(() => {
    if (usersCar.make !== undefined)
      dispatch(fetchModels({ year: usersCar.year, make: usersCar.make }))
  }, [dispatch, usersCar.make, usersCar.year])

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
        <input type='submit' disabled={submitDisabled} />
      </form>
    </div>
  )
}

export default App
