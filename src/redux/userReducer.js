import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        id: null,
        name: null,
        email: null,
        surname: null,
        phone: null,
        rules: []
    }
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
      updateUser: (state, action) => {
        return {
          ...state,
          user: action.payload
        }
        
      },
    },
});

export const { updateUser } = userReducer.actions

export default userReducer.reducer
  