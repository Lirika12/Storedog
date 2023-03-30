import { createSlice } from '@reduxjs/toolkit'
import { initialFilterState } from '../initialValues'
// import { initialUserState } from '../initialValues'


export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
      value: initialFilterState
    },
    reducers: {
      changeSearchValue: (state, action) => {
        state.search = action.payload
      },
      removeUser: () => {
        localStorage.clear()
        return initialFilterState
      }
    }
  })

  export const { changeSearchValue } = filterSlice.actions

  export const filterReducer = filterSlice.reducer