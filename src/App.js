/* eslint-disable import/no-named-as-default-member */
import {Route, Switch} from 'react-router-dom'
import './App.css'
import Login from './components/Login/login'
import Home from './components/Home/home'
import ProtectedRoute from './components/ProtectedRoute/protected'
import RestaurantDetailsLoader from './components/RestaurantDetailsLoader/restaurantDetailsLoader'
import Cart from './components/Cart/cart'
import PaymentPage from './components/PaymentPage/paymentPage'
import NotFound from './components/NotFound/notFound'

// const sortByOptions = [
//   {
//     id: 0,
//     displayText: 'Highest',
//     value: 'Highest',
//   },
//   {
//     id: 2,
//     displayText: 'Lowest',
//     value: 'Lowest',
//   },
// ]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurants/:id"
      component={RestaurantDetailsLoader}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/payment-page" component={PaymentPage} />
    <Route component={NotFound} />
  </Switch>
)

export default App
