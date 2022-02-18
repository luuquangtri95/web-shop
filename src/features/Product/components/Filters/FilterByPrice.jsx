import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
}

FilterByPrice.defaultProps = {
  onChange: null,
}

const useStyle = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  salePrice: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),

    '& > span': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  resetButton: {
    marginBottom: theme.spacing(2),
  },
}))

function FilterByPrice({ onChange }) {
  const classes = useStyle()
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleResetPrice = () => {
    setValues({
      salePrice_gte: 0,
      salePrice_lte: 0,
    })
  }

  const handleSubmit = () => {
    if (onChange) onChange(values)
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">CHỌN KHOẢNG GIÁ</Typography>

      <Box className={classes.salePrice}>
        <TextField
          variant="outlined"
          label="Từ"
          type="number"
          size="small"
          name="salePrice_gte"
          value={values.salePrice_gte}
          onChange={handleChange}
        />
        <span> - </span>
        <TextField
          variant="outlined"
          label="Đến"
          type="number"
          size="small"
          name="salePrice_lte"
          value={values.salePrice_lte}
          onChange={handleChange}
        />
      </Box>

      <Button
        className={classes.resetButton}
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleResetPrice}
        marginBottom={2}
      >
        Đặt Lại
      </Button>
      <br />
      <Button variant="outlined" color="primary" size="small" onClick={handleSubmit}>
        Áp Dụng
      </Button>
    </Box>
  )
}

export default FilterByPrice
