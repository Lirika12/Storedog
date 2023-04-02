import { createSlice } from '@reduxjs/toolkit'
import { initialUserState } from '../initialValues'


export const userSlice = createSlice({
    name: 'user',
    initialState: {
      value: initialUserState
    },
    reducers: {
      setUser: (_, action) => {
        return action.payload
      },
      removeUser: () => {
        localStorage.clear()
        return initialUserState
      }
    }
  })

  export const { setUser, removeUser } = userSlice.actions

  export const userReducer = userSlice.reducer