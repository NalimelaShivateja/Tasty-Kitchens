import {MdOutlineSort} from 'react-icons/md'
import './index.css'

const ProductsHeader = props => {
  const {sortByOptions, sortRestaurants} = props
  const updateSortValue = event => {
    sortRestaurants(event.target.value)
  }
  return (
    <div>
      <h1 className="rest-title">Popular Restaurants</h1>
      <div className="para-and-drop-down">
        <p className="rest-tagline">
          Select Your favorite restaurant special dish and make your day
          happy...
        </p>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <MdOutlineSort className="sort-icon" />
          <p className="sort-by-heading">Sort by </p>
          <select onChange={updateSortValue} className="sorting-element">
            {sortByOptions.map(eachItem => (
              <option
                id={eachItem.value}
                key={eachItem.value}
                value={eachItem.value}
                selected
              >
                {eachItem.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr />
    </div>
  )
}

export default ProductsHeader
