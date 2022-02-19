import React from 'react'
import PropTypes from 'prop-types'
import { Box, Chip, makeStyles } from '@material-ui/core'
import { useMemo } from 'react'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    padding: 0,
    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}))

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
}

const FILTER_LIST = [
  {
    id: 1,
    getLabel: (filters) => 'Miễn Phí Giao Hàng',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters }
      if (filters.isFreeShip) {
        delete newFilters.isFreeShip
      } else {
        newFilters.isFreeShip = true
      }

      return newFilters
    },
  },
  {
    id: 2,
    getLabel: (filters) => 'Có Khuyến Mãi',
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }

      delete newFilters.isPromotion

      return newFilters
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_gte}đ Đến ${filters.salePrice_lte}đ`,
    isActive: () => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters.salePrice_lte
      delete newFilters.salePrice_gte

      return newFilters
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => `Danh Mục : ${filters['category.name']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.name'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters }
      delete newFilters['category.id']
      delete newFilters['category.name']

      return newFilters
    },
    onToggle: () => {},
  },
]

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyle()

  const visibleFilter = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters))
  }, [filters])

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilter.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return

                    const newFilters = x.onToggle(filters)
                    onChange(newFilters)
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return

                    const newFilters = x.onRemove(filters)
                    onChange(newFilters)
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  )
}

export default FilterViewer
