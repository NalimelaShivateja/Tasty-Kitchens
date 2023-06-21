/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import Slider from 'react-slick'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

class RestaurantsOffersLoader extends Component {
  state = {isLoading: false, imagesList: []}

  componentDidMount() {
    this.getRestaurantsOffersImages()
  }

  getRestaurantsOffersImages = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const response = await fetch(url, options)
    const data = await response.json()

    const temp = data.offers.map(eachItem => ({
      imageUrl: eachItem.image_url,
      id: eachItem.id,
    }))
    console.log(temp)
    this.setState({imagesList: temp, isLoading: false})
  }

  renderImages = () => {
    const {imagesList} = this.state
    const settings = {
      dots: true,
    }
    return (
      <div className="container" testid="restaurants-offers-loader">
        <Slider {...settings}>
          {imagesList.map(eachImage => (
            <div id={eachImage.id}>
              <img src={eachImage.imageUrl} alt="offer" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
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
    return <div>{isLoading ? this.renderLoader() : this.renderImages()}</div>
  }
}

export default RestaurantsOffersLoader
