import React from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'
import { useDispatch } from 'react-redux'
import { register } from 'features/Auth/userThunk'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSnackbar } from 'notistack'

Register.propTypes = {
  closeDialog: PropTypes.func,
}

Register.propTypes = {
  closeDialog: null,
}

function Register({ closeDialog }) {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    try {
      // auto set username = email
      values.username = values.email

      const action = register(values)
      const resultAction = await dispatch(action)
      const user = unwrapResult(resultAction)

      // close dialogs
      if (closeDialog) {
        closeDialog()
      }

      enqueueSnackbar('Register successfully !!!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  )
}

export default Register
