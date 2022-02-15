import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/form-controls/InputField'
import { useForm } from 'react-hook-form'
import { Avatar, makeStyles, Typography, Button, LinearProgress } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PasswordField from 'components/form-controls/PasswordField'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
    margin: theme.spacing(2, 0, 3, 0),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}))

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
  onSubmit: null,
}

function LoginForm({ onSubmit }) {
  const classes = useStyles()

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Email là trường bắt buộc')
      .email('email không hợp lệ, vui lòng nhập đúng định dạng abc@gmail.com'),
    password: yup.string().required('Password là trường bắt buộc'),
  })

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const { isSubmitting } = form.formState

  const handleSubmitForm = async (values) => {
    if (onSubmit) {
      await onSubmit(values)
    }
  }

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>

      <Typography className={classes.title} component="h3" variant="h5">
        Sign in
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />

        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
          color="primary"
          disabled={isSubmitting}
          size="large"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
