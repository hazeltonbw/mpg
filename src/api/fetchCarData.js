const API_ROOT = 'https://www.fueleconomy.gov'

export const getYears = async () => {
  let params = '/ws/rest/vehicle/menu/year'
  const url = API_ROOT + params
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })
  const json = await response.json()
  return json.menuItem.map((obj) => obj.text)
}

export const getMakes = async (year) => {
  let params = `/ws/rest/vehicle/menu/make?year=${year}`
  const url = API_ROOT + params
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })
  const json = await response.json()
  return json.menuItem.map((obj) => obj.text)
}

export const getModels = async (year, make) => {
  let params = `/ws/rest/vehicle/menu/model?year=${year}&make=${make}`
  const url = API_ROOT + params
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })
  const json = await response.json()
  return json.menuItem.map((obj) => obj.text)
}

export const getCarData = async (usersCar) => {
  // ws/rest/vehicle/menu/options?year=2012&make=mmmm&model=nnnn
  let params = `/ws/rest/vehicle/menu/options?year=${usersCar.year}&make=${usersCar.make}&model=${usersCar.model}`
  const url = API_ROOT + params
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  })
  const json = await response.json()
  return json.menuItem
}
