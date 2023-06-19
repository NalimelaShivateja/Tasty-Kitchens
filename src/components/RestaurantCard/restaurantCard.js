import './index.css'
import {AiFillStar} from 'react-icons/ai'

const RestaurantCard = props => {
  const {
    name,
    cost,
    imageUrl,
    foodRating,
    id,
    showAddButton,
    showIncOrDecButton,
    quantity,
    hideAddFoodButton,
    decreaseFoodQty,
    increaseFoodQty,
  } = props

  console.log(id)

  const triggerAddFunctionality = () => {
    hideAddFoodButton(id)
  }

  const triggerDecFunctionality = () => {
    decreaseFoodQty(id)
  }

  const triggerIncFunctionality = () => {
    increaseFoodQty(id)
  }

  return (
    <li key={id} className="food-item-details">
      <div style={{paddingRight: '20px'}}>
        <img src={imageUrl} alt="food-item" className="food-image" />
      </div>
      <div>
        <h1 className="food-name">{name}</h1>
        <p className="food-cost">₹{cost}</p>
        <div
          style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}
        >
          <AiFillStar
            style={{
              color: 'orange',
              fontSize: '20px',
              lineHeight: '0',
              marginRight: '5px',
            }}
          />
          <p className="food-rating">{foodRating}</p>
        </div>

        {showAddButton ? (
          <button
            type="button"
            onClick={triggerAddFunctionality}
            className="add-button"
          >
            Add
          </button>
        ) : null}
        {showIncOrDecButton ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <button
              type="button"
              onClick={triggerDecFunctionality}
              className="decrease-button"
            >
              -
            </button>
            <p
              className="food-rating"
              style={{fontWeight: 'normal', margin: '0 10px 0 10px'}}
            >
              {quantity}
            </p>
            <button
              type="button"
              onClick={triggerIncFunctionality}
              className="decrease-button"
            >
              +
            </button>
          </div>
        ) : null}
      </div>
    </li>
  )
}

export default RestaurantCard
