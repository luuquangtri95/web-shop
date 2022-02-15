import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
}

function InputField({ form, name, label }) {
  const { formState, errors } = form
  const hasError = errors[name]
  return (
    <Controller
      control={form.control}
      name={name}
      as={TextField}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      error={!!hasError}
      helperText={errors[name]?.message}
    />
  )
}

export default InputField
