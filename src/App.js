import Header from 'components/Header'
import ProductFeature from 'features/Product'
import { Route, Switch } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/products" component={ProductFeature} />
      </Switch>
    </div>
  )
}

export default App
