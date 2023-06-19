import {Component} from 'react'

import './index.css'

class Counter extends Component {
  onDecrement = () => {
    const {decreaseQty, id} = this.props
    decreaseQty(id)
  }

  onIncrement = () => {
    const {increaseQty, id} = this.props
    increaseQty(id)
  }

  render() {
    const {quantity} = this.props
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          onClick={this.onDecrement}
          className="decrease-button"
        >
          -
        </button>
        <div
          className="food-rating"
          style={{fontWeight: 'normal', margin: '0 10px 0 10px'}}
        >
          {quantity}
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="decrease-button"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
