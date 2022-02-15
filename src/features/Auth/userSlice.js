import { createSlice } from '@reduxjs/toolkit'
import StorageKeys from 'constants/storage-keys'
import { login, register } from './userThunk'

/**
 * reducers: xử lý các action bình thường (sync action)
 * extraReducers: xử lý logic các action bất đồng bộ (async action)
 */

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    loading: false,
  },
  reducers: {
    logout(state, action) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.TOKEN)

      state.current = {}
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.loading = false
      state.current = action.payload
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      state.current = action.payload
    },
  },
})

const { actions, reducer } = userSlice
export const { logout } = actions
export default reducer
