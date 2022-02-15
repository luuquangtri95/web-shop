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

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
  onSubmit: null,
}

function RegisterForm({ onSubmit }) {
  const classes = useStyles()

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full Nam là trường bắt buộc')
      .test('should has at least two words', 'Full Name phải có 2 chữ trở lên', (value) => {
        return value.split(' ').filter((x) => !!x && x.length >= 2).length > 2
      }),
    email: yup
      .string()
      .required('Email là trường bắt buộc')
      .email('email không hợp lệ, vui lòng nhập đúng định dạng abc@gmail.com'),
    password: yup
      .string()
      .required('Password là trường bắt buộc')
      .min(6, 'Password phải bắt đầu từ 6 ký tự')
      .max(12, 'Password có độ dài <= 12 ký tự'),
    retypePassword: yup
      .string()
      .required('vui lòng nhập password')
      .oneOf([yup.ref('password')], 'password không đúng, vui lòng nhập lại'),
  })

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
        Create An Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmitForm)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          fullWidth
          color="primary"
          disabled={isSubmitting}
          size="large"
        >
          Create an account
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
