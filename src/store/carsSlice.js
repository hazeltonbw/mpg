import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMakes, getYears, getModels, getCarData } from '../api/fetchCarData'
const initialState = {
  error: false,
  isLoading: false,
  yearsMenu: { disabled: false, isLoading: false, error: false },
  makesMenu: { disabled: true, isLoading: false, error: false },
  modelsMenu: { disabled: true, isLoading: false, error: false },
  submitDisabled: false,
  usersCar: {},
  carStyles: [],
}

export const fetchCarData = createAsyncThunk(
  'carsSlice/fetchCarData',
  async (usersCar) => {
    let carData
    try {
      carData = await getCarData(usersCar)
    } catch (err) {
      console.log(err)
    }
    return carData
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
    toggleSubmitDisabled: (state) => {
      state.submitDisabled = !state.submitDisabled
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
      state.submitDisabled = false
    })
    builder.addCase(fetchModels.pending, (state) => {
      state.modelsMenu.isLoading = true
      state.modelsMenu.error = false
    })
    builder.addCase(fetchModels.rejected, (state) => {
      state.modelsMenu.error = true
      state.modelsMenu.isLoading = false
    })
    builder.addCase(fetchCarData.fulfilled, (state, action) => {
      state.carStyles = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCarData.pending, (state) => {
      state.isLoading = true
      state.error = false
    })
    builder.addCase(fetchCarData.rejected, (state) => {
      state.error = true
      state.isLoading = false
    })
  },
})

export const { updateUsersCar, toggleSubmitDisabled } = actions

export const selectYearsMenu = (state) => state.carsSlice.yearsMenu
export const selectMakesMenu = (state) => state.carsSlice.makesMenu
export const selectModelsMenu = (state) => state.carsSlice.modelsMenu
export const selectUsersCar = (state) => state.carsSlice.usersCar
export const selectCarStyles = (state) => state.carsSlice.carStyles
export const selectSubmitDisabled = (state) => state.carsSlice.submitDisabled

export default reducer
