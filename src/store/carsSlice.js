import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getVehicleRecord,
  getMakes,
  getYears,
  getModels,
  getOptions,
} from '../api/fetchCarData'
const initialState = {
  error: false,
  isLoading: false,
  yearsMenu: { disabled: false, isLoading: false, error: false },
  makesMenu: { disabled: true, isLoading: false, error: false },
  modelsMenu: { disabled: true, isLoading: false, error: false },
  optionsMenu: { disabled: true, isLoading: false, error: false },
  usersCar: {},
  carStyles: [],
  vehicleRecord: {},
}

export const fetchOptions = createAsyncThunk(
  'carsSlice/fetchOptions',
  async (usersCar) => {
    let options
    try {
      options = await getOptions(usersCar)
    } catch (err) {
      console.log(err)
    }
    return options
  }
)

export const fetchYears = createAsyncThunk('carsSlice/fetchYears', async () => {
  let years
  try {
    years = await getYears()
  } catch (err) {
    console.log(err)
  }
  return years
})

export const fetchMakes = createAsyncThunk(
  'carsSlice/fetchMakes',
  async (year) => {
    let makes
    try {
      makes = await getMakes(year)
    } catch (err) {
      console.log(err)
    }
    return makes
  }
)

export const fetchModels = createAsyncThunk(
  'carsSlice/fetchModels',
  async ({ year, make }) => {
    let models
    try {
      models = await getModels(year, make)
    } catch (err) {
      console.log(err)
    }
    return models
  }
)

export const fetchVehicleRecord = createAsyncThunk(
  'carsSlice/fetchVehicleRecord',
  async (id) => {
    let vehicleRecord
    try {
      vehicleRecord = await getVehicleRecord(id)
    } catch (err) {
      console.log(err)
    }
    console.log(vehicleRecord)
    return vehicleRecord
  }
)

const { actions, reducer } = createSlice({
  name: 'carsSlice',
  initialState: initialState,
  reducers: {
    updateUsersCar: (state, action) => {
      // if user changes year, we have to reset make and model
      if (action.payload.menu === 'year' && state.usersCar.year !== undefined) {
        state.usersCar.make = undefined
        state.usersCar.model = undefined
        state.makesMenu.makes = []
        state.modelsMenu.models = []
        state.modelsMenu.disabled = true
      }

      state.usersCar[action.payload.menu] = action.payload.menuData
    },
  },
  extraReducers: (builder) => {
    // fetchProducts lifecycle
    builder.addCase(fetchYears.fulfilled, (state, action) => {
      state.yearsMenu.years = action.payload
      state.yearsMenu.isLoading = false
    })
    builder.addCase(fetchYears.pending, (state) => {
      state.yearsMenu.isLoading = true
      state.yearsMenu.error = false
    })
    builder.addCase(fetchYears.rejected, (state) => {
      state.yearsMenu.error = true
      state.yearsMenu.isLoading = false
    })
    builder.addCase(fetchMakes.fulfilled, (state, action) => {
      state.makesMenu.makes = action.payload
      state.makesMenu.isLoading = false
      state.makesMenu.disabled = false
    })
    builder.addCase(fetchMakes.pending, (state) => {
      state.makesMenu.isLoading = true
      state.makesMenu.error = false
    })
    builder.addCase(fetchMakes.rejected, (state) => {
      state.makesMenu.error = true
      state.makesMenu.isLoading = false
    })
    builder.addCase(fetchModels.fulfilled, (state, action) => {
      state.modelsMenu.models = action.payload
      state.modelsMenu.isLoading = false
      state.modelsMenu.disabled = false
    })
    builder.addCase(fetchModels.pending, (state) => {
      state.modelsMenu.isLoading = true
      state.modelsMenu.error = false
    })
    builder.addCase(fetchModels.rejected, (state) => {
      state.modelsMenu.error = true
      state.modelsMenu.isLoading = false
    })
    builder.addCase(fetchOptions.fulfilled, (state, action) => {
      Array.isArray(action.payload)
        ? (state.optionsMenu.options = action.payload)
        : (state.optionsMenu.options = new Array(action.payload))
      state.optionsMenu.disabled = false
      state.isLoading = false
    })
    builder.addCase(fetchOptions.pending, (state) => {
      state.optionsMenu.isLoading = true
      state.optionsMenu.error = false
    })
    builder.addCase(fetchOptions.rejected, (state) => {
      state.optionsMenu.error = true
      state.optionsMenu.isLoading = false
    })
    builder.addCase(fetchVehicleRecord.fulfilled, (state, action) => {
      state.vehicleRecord = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchVehicleRecord.pending, (state) => {
      state.isLoading = true
      state.error = false
    })
    builder.addCase(fetchVehicleRecord.rejected, (state) => {
      state.error = true
      state.isLoading = false
    })
  },
})

export const { updateUsersCar } = actions

export const selectYearsMenu = (state) => state.carsSlice.yearsMenu
export const selectMakesMenu = (state) => state.carsSlice.makesMenu
export const selectModelsMenu = (state) => state.carsSlice.modelsMenu
export const selectOptionsMenu = (state) => state.carsSlice.optionsMenu
export const selectUsersCar = (state) => state.carsSlice.usersCar
export const selectVehicleRecord = (state) => state.carsSlice.vehicleRecord

export default reducer
