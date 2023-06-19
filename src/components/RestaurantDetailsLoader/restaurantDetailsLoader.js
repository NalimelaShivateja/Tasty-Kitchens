import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar/navbar'
import RestaurantCard from '../RestaurantCard/restaurantCard'
import Footer from '../Footer'
import './index.css'

class RestaurantDetailsLoader extends Component {
  state = {foodItemsDetails: [], restaurantDetails: {}, isLoading: true}

  componentDidMount() {
    this.fetchFoodData()
  }

  fetchFoodData = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const temp1 = {}
    temp1.rating = data.rating
    temp1.restaurantName = data.name
    temp1.costForTwo = data.cost_for_two
    temp1.cuisine = data.cuisine
    temp1.restaurantImage = data.image_url
    temp1.reviewsCount = data.reviews_count
    temp1.location = data.location

    const temp2 = data.food_items.map(x => ({
      name: x.name,
      cost: x.cost,
      foodType: x.food_type,
      imageUrl: x.image_url,
      foodRating: x.rating,
      id: x.id,
      showAddButton: true,
      showIncOrDecButton: false,
      quantity: 0,
    }))

    console.log(data, temp1, temp2)
    this.setState({
      restaurantDetails: temp1,
      foodItemsDetails: temp2,
      isLoading: false,
    })
  }

  hideAddFoodButton = async id => {
    const {foodItemsDetails} = this.state
    for (let i = 0; i < foodItemsDetails.length; i += 1) {
      const x = foodItemsDetails[i]
      if (x.id === id) {
        foodItemsDetails[i].quantity = 1
        foodItemsDetails[i].showAddButton = false
        foodItemsDetails[i].showIncOrDecButton = true

        let cartItems = localStorage.getItem('cartData')
        if (cartItems === null) {
          cartItems = []
          cartItems.push(foodItemsDetails[i])
          localStorage.setItem('cartData', JSON.stringify(cartItems))
        } else {
          const tempList = JSON.parse(cartItems)
          tempList.push(foodItemsDetails[i])
          localStorage.removeItem('cartData')
          localStorage.setItem('cartData', JSON.stringify(tempList))
        }
        break
      }
    }

    this.setState({foodItemsDetails})
  }

  decreaseFoodQty = id => {
    const {foodItemsDetails} = this.state
    for (let i = 0; i < foodItemsDetails.length; i += 1) {
      const x = foodItemsDetails[i]
      if (x.id === id) {
        if (x.quantity - 1 === 0) {
          foodItemsDetails[i].showAddButton = true
          foodItemsDetails[i].showIncOrDecButton = false

          let cartItems = localStorage.getItem('cartData')
          cartItems = JSON.parse(cartItems)
          for (let j = 0; j < cartItems.length; j += 1) {
            if (cartItems[j].id === id) {
              cartItems.splice(j, 1)
              localStorage.removeItem('cartData')
              localStorage.setItem('cartData', JSON.stringify(cartItems))
              break
            }
          }

          break
        } else {
          foodItemsDetails[i].quantity -= 1
          let cartItems = localStorage.getItem('cartData')
          cartItems = JSON.parse(cartItems)

          for (let j = 0; j < cartItems.length; j += 1) {
            if (cartItems[j].id === id) {
              cartItems[j].quantity -= 1
              localStorage.removeItem('cartData')
              localStorage.setItem('cartData', JSON.stringify(cartItems))
              break
            }
          }
        }
      }
    }
    this.setState({foodItemsDetails})
  }

  increaseFoodQty = id => {
    const {foodItemsDetails} = this.state
    for (let i = 0; i < foodItemsDetails.length; i += 1) {
      const x = foodItemsDetails[i]
      if (x.id === id) {
        foodItemsDetails[i].quantity += 1
        const cartItems = JSON.parse(localStorage.getItem('cartData'))
        for (let j = 0; j < cartItems.length; j += 1) {
          if (cartItems[j].id === id) {
            cartItems[j].quantity += 1
            localStorage.removeItem('cartData')
            localStorage.setItem('cartData', JSON.stringify(cartItems))
          }
        }
      }
    }
    this.setState({foodItemsDetails})
  }

  renderSpinner = () => (
    <div>
      <Navbar showHomeActive />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
      </div>
    </div>
  )

  renderFoodItems = () => {
    const {restaurantDetails, foodItemsDetails} = this.state

    return (
      <div>
        <Navbar showHomeActive />
        <div className="rest-details-container">
          <div style={{paddingRight: '10px'}}>
            <img
              className="restaurant-image"
              src={restaurantDetails.restaurantImage}
              alt="restaurant"
            />
          </div>

          <div>
            <h1 className="rest-heading">{restaurantDetails.restaurantName}</h1>
            <p className="rest-main-details">{restaurantDetails.cuisine}</p>
            <p className="rest-main-details">{restaurantDetails.location}</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h1 className="rest-rating-details">
                  {restaurantDetails.rating}
                </h1>
                <p
                  className="rest-rating-details"
                  style={{
                    fontWeight: '500',
                    color: '#E2E8F0',
                    fontSize: '12px',
                  }}
                >
                  {restaurantDetails.reviewsCount}+ Ratings
                </p>
              </div>
              <p
                className="rest-rating-details"
                style={{
                  fontSize: '40px',
                  fontWeight: 'lighter',
                  color: '#E2E8F0',
                }}
              >
                |
              </p>
              <div>
                <h1 className="rest-rating-details">
                  Rs {restaurantDetails.costForTwo}
                </h1>
                <p
                  className="rest-rating-details"
                  style={{
                    fontWeight: '500',
                    color: '#E2E8F0',
                    fontSize: '12px',
                  }}
                >
                  Cost for two
                </p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItemsDetails.map(x => (
            <RestaurantCard
              {...x}
              hideAddFoodButton={this.hideAddFoodButton}
              decreaseFoodQty={this.decreaseFoodQty}
              increaseFoodQty={this.increaseFoodQty}
            />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderSpinner() : this.renderFoodItems()}</div>
    )
  }
}

export default RestaurantDetailsLoader
