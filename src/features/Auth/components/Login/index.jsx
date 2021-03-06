import { unwrapResult } from '@reduxjs/toolkit'
import { login } from 'features/Auth/userThunk'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import LoginForm from '../LoginForm'

Login.propTypes = {
  closeDialog: PropTypes.func,
}

Login.defaultProps = {
  closeDialog: null,
}

function Login({ closeDialog }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    try {
      const action = login(values)
      const resultAction = await dispatch(action)

      unwrapResult(resultAction)

      if (closeDialog) {
        closeDialog()
      }

      enqueueSnackbar('login successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Login
