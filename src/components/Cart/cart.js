import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Counter from '../Counter'
import Navbar from '../Navbar/navbar'
import Footer from '../Footer'
import './index.css'

class Cart extends Component {
  state = {cartItems: [], isLoading: true}

  componentDidMount() {
    this.getCartItems()
  }

  getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartItems, isLoading: false})
  }

  decreaseQty = id => {
    const {cartItems} = this.state
    for (let i = 0; i < cartItems.length; i += 1) {
      if (cartItems[i].id === id) {
        if (cartItems[i].quantity - 1 === 0) {
          cartItems.splice(i, 1)
          localStorage.removeItem('cartData')
          localStorage.setItem('cartData', JSON.stringify(cartItems))
          this.setState(cartItems)
          break
        } else {
          cartItems[i].quantity -= 1
          localStorage.removeItem('cartData')
          localStorage.setItem('cartData', JSON.stringify(cartItems))
          this.setState(cartItems)
          break
        }
      }
    }
  }

  increaseQty = id => {
    const {cartItems} = this.state
    for (let i = 0; i < cartItems.length; i += 1) {
      if (cartItems[i].id === id) {
        cartItems[i].quantity += 1
        localStorage.removeItem('cartData')
        localStorage.setItem('cartData', JSON.stringify(cartItems))
        this.setState({cartItems})
        break
      }
    }
  }

  renderSpinner = () => <Loader />

  renderCartView = () => {
    const {cartItems} = this.state
    if (cartItems === null || cartItems.length === 0) {
      return (
        <div>
          <Navbar showCartActive />
          <div className="empty-cart-container">
            <img
              src="https://res.cloudinary.com/degbnzg10/image/upload/v1686571967/cooking_1_vsdrlc.png"
              alt=""
              className="empty-cart-image"
            />
            <h1 className="empty-cart-heading ">No Orders Yet!</h1>
            <p>Your cart is empty. Add something from the menu.</p>
            <Link to="/">
              <button type="button" className="place-order-btn">
                Order Now
              </button>
            </Link>
          </div>
          <Footer />
        </div>
      )
    }
    let totalCartPrice = 0
    for (let i = 0; i < cartItems.length; i += 1) {
      totalCartPrice += cartItems[i].cost * cartItems[i].quantity
    }
    return (
      <div>
        <Navbar showCartActive />
        <div className="mc">
          <div
            style={{
              border: 'solid 1px #f7931e',
              backgroundColor: '#f2f2f2',
              borderRadius: '10px',
              width: '100%',
            }}
          >
            <ul className="headings-container">
              <li className="headings item-heading">Item</li>
              <li className="headings">Quantity</li>
              <li className="headings">Price</li>
            </ul>
            <div
            // style={{border: 'solid 5px #000'}}
            >
              {cartItems.map(x => (
                <ul className="cart-items-list">
                  <li>
                    <div className="ic">
                      <img
                        src={x.imageUrl}
                        alt="food-item"
                        className="food-item-img"
                      />
                      <h1 className="food-name-1">{x.name}</h1>
                    </div>
                  </li>
                  <li>
                    <div className="counter-styling">
                      <h1 className="food-name-2">{x.name}</h1>
                      <Counter
                        id={x.id}
                        decreaseQty={this.decreaseQty}
                        increaseQty={this.increaseQty}
                        quantity={x.quantity}
                      />
                      <p className="price-2">{x.cost * x.quantity}</p>
                    </div>
                  </li>
                  <li>
                    <p className="price-1">{x.cost * x.quantity}</p>
                  </li>
                </ul>
              ))}
            </div>

            <hr />
            <div className="cart-end-section">
              <h1
                className="headings"
                style={{fontSize: '24px', marginRight: '10px'}}
              >
                Order Total:
              </h1>
              <div
              //   style={{width: '30%'}}
              >
                <p className="headings" style={{fontSize: '24px'}}>
                  ₹{totalCartPrice}
                </p>
                <Link to="/payment-page">
                  <button type="button" className="place-order-btn">
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* footer section goes down */}
        <Footer />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderSpinner() : this.renderCartView()
  }
}

export default Cart
