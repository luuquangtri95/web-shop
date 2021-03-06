import React from 'react'
import PropTypes from 'prop-types'
import { Box, Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useEffect } from 'react'
import productApi from 'apis/productApi'
import { useState } from 'react'
import ProductSkeletonList from '../components/ProductSkeletonList'
import ProductList from '../components/ProductList'
import { Pagination } from '@material-ui/lab'
import ProductSort from '../components/ProductSort'
import ProductFilter from '../components/ProductFilter'
import FilterViewer from '../components/FilterViewer'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

ListPage.propTypes = {}

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0', // flex grow , flex shrink, flex basis
  },

  pagination: {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row nowrap',
    paddingBottom: '24px',
  },
}))

function ListPage(props) {
  const classes = useStyle()

  const history = useHistory()
  const location = useLocation()
  const queryParams = queryString.parse(location.search)

  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  })
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  //   _sort: 'salePrice:ASC',
  // })

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: Number.parseInt(queryParams._page) || 1,
    _limit: Number.parseInt(queryParams._limit) || 9,
    _sort: queryParams._sort || 'salePrice:ASC',
  }))

  useEffect(() => {
    ;(async () => {
      try {
        const response = await productApi.getAll(filters)
        const { data, pagination } = response

        setProductList(data)
        setPagination(pagination)
      } catch (error) {}

      // d?? th??nh c??ng hay th???t b???i ?????u set loading l???i v??? false
      setLoading(false)
    })()
  }, [filters])

  useEffect(() => {
    // Todo: sync filters to url
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    })
  }, [history, filters])

  const handlePageChange = (e, newPage) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: newPage,
    }))
  }

  const handleSortChange = (newSortValue) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _sort: newSortValue,
    }))
  }

  const handleFilterChange = (newFilter) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }))
  }

  const handleViewerChange = (newFilters) => {
    setFilters(newFilters)
  }

  console.log(filters)
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            {/* filter (price, category...vv)*/}
            <Paper elevation={0}>
              <ProductFilter filters={filters} onChange={handleFilterChange} />
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            {/* list page: re-render when state filters changed */}
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
              <FilterViewer filters={filters} onChange={handleViewerChange} />
              {loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  color="primary"
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ListPage
