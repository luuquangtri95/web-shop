import React from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useEffect } from 'react'
import categoryApi from 'apis/categoryApi'

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: '0',
    margin: '0',
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  },
}))

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
}

FilterByCategory.defaultProps = {
  onChange: null,
}

function FilterByCategory({ onChange }) {
  const [categoryList, setCategoryList] = useState([])
  const classes = useStyle()

  useEffect(() => {
    ;(async () => {
      try {
        const list = await categoryApi.getAll()
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        )
      } catch (error) {}
    })()
  }, [])

  const handleCategoryList = (category) => {
    if (onChange) onChange(category.id)
  }

  return (
    <Box className={classes.root}>
      <Typography component="h1" variant="subtitle2">
        DANH MỤC SẢN PHẨM
      </Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li key={category.id} onClick={() => handleCategoryList(category)}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  )
}

export default FilterByCategory
