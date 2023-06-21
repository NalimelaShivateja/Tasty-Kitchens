/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import './index.css'
import ProductsHeader from '../ProductsHeader/productHeader'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsListLoader extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    offset: 1,
    LIMIT: 9,
    selectedSortByValue: 'Lowest',
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {offset, LIMIT, selectedSortByValue} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const temp = data.restaurants.map(eachItem => ({
      restaurantName: eachItem.name,
      imageUrl: eachItem.image_url,
      cuisine: eachItem.cuisine,
      avgRating: eachItem.user_rating.rating,
      totalReviews: eachItem.user_rating.total_reviews,
      id: eachItem.id,
    }))
    this.setState({isLoading: false, restaurantsList: temp})
  }

  decreasePagination = () => {
    const {offset} = this.state
    if (offset - 1 > 0) {
      this.setState({offset: offset - 1}, this.getRestaurantsData)
    }
  }

  increasePagination = () => {
    const {offset} = this.state
    if (offset + 1 <= 20) {
      this.setState({offset: offset + 1}, this.getRestaurantsData)
    }
  }

  sortRestaurants = value => {
    this.setState({selectedSortByValue: value}, this.getRestaurantsData)
  }

  renderList = () => {
    const {restaurantsList, offset} = this.state
    return (
      <div>
        <ul className="rest-list">
          {restaurantsList.map(eachItem => (
            <li key={eachItem.id} testid="restaurant-item">
              {/* <Link to={`restaurants/${eachItem.id}`} target="_blank">
                <img
                  src={eachItem.imageUrl}
                  className="restaurant-image-details"
                  alt="restaurant-item"
                />
              </Link> */}
              <Link
                to={`/restaurants/${eachItem.id}`}
                target="_blank"
                style={{textDecoration: 'none'}}
              >
                <div className="rest-details-box">
                  <div>
                    <img
                      src={eachItem.imageUrl}
                      alt="restaurant-item"
                      className="restaurant-image-details"
                      // style={{width: '160px', height: '100px'}}
                    />
                  </div>
                  <div>
                    <h1 className="rest-name">{eachItem.restaurantName}</h1>
                    <p className="rest-insights">{eachItem.cuisine}</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <AiFillStar
                        style={{
                          color: 'orange',
                          fontSize: '20px',
                          lineHeight: '0',
                          marginRight: '5px',
                        }}
                      />
                      <p className="rest-insights">
                        <span style={{fontWeight: 'bold', color: '#000000'}}>
                          {eachItem.avgRating}{' '}
                        </span>
                        ({eachItem.totalReviews} ratings)
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pagination-info-container">
          <button
            type="button"
            className="pagination-buttons"
            onClick={this.decreasePagination}
            testid="pagination-left-button"
          >
            <GrFormPrevious style={{fontSize: '25px'}} />
          </button>
          <h1 className="rest-name" style={{margin: '0 10px 0 10px'}}>
            {offset} of 20
          </h1>
          <button
            type="button"
            className="pagination-buttons"
            onClick={this.increasePagination}
            testid="pagination-right-button"
          >
            <GrFormNext style={{fontSize: '25px'}} />
          </button>
        </div>
      </div>
    )
  }

  renderSpinner = () => (
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
  )

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          this.renderSpinner()
        ) : (
          <div>
            <ProductsHeader
              sortByOptions={sortByOptions}
              sortRestaurants={this.sortRestaurants}
            />
            {this.renderList()}
          </div>
        )}
      </div>
    )
  }
}

export default RestaurantsListLoader
