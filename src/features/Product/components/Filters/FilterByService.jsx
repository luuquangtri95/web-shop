import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'

FilterByService.propTypes = {
  onChange: PropTypes.func,
}

FilterByService.defaultProps = {
  onChange: null,
}

const useStyle = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(2),
  },
  list: {
    padding: '0',
    margin: '0',
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
    },
  },
}))

function FilterByService({ filters, onChange }) {
  const classes = useStyle()
  // const [values, setValues] = useState({
  //   isPromotion: Boolean(filters.isPromotion),
  //   isFreeShip: Boolean(filters.isFreeShip),
  // })

  const handleChange = (e) => {
    const { name, checked } = e.target

    // setValues((prevValues) => ({
    //   ...prevValues,
    //   [name]: checked,
    // }))

    onChange({
      [name]: checked,
    })
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>

      <ul className={classes.list}>
        {[
          { value: 'isPromotion', label: 'Có khuyến mãi' },
          { value: 'isFreeShip', label: 'Miễn Phí Vận Chuyển' },
        ].map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  name={service.value}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default FilterByService
