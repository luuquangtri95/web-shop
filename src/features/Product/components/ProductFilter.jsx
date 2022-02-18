import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import FilterByCategory from './Filters/FilterByCategory'
import FilterByPrice from './Filters/FilterByPrice'
import FilterByService from './Filters/FilterByService'

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}

ProductFilter.defaultProps = {
  filters: {},
  onChange: null,
}

function ProductFilter({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    const newFilters = {
      ...filters,
      'category.id': newCategoryId.id,
      'category.name': newCategoryId.name,
    }

    onChange(newFilters)
  }

  const handleFiltersChange = (values) => {
    if (onChange) onChange(values)
  }

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleFiltersChange} />
      <FilterByService filters={filters} onChange={handleFiltersChange} />
    </Box>
  )
}

export default ProductFilter
