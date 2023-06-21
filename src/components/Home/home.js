import Navbar from '../Navbar/navbar'
import RestaurantsOffersLoader from '../RestaurantsOffersLoader/restaurantsOfferLoader'
import RestaurantsListLoader from '../RestaurantsListLoader/restaurantsListLoader'
import Footer from '../Footer'
import '../paddingStyles.css'

const Home = () => (
  <div>
    <Navbar showHomeActive />
    <RestaurantsOffersLoader />
    <div className="padding-styles-for-containers">
      <RestaurantsListLoader testid="restaurants-list-loader" />
    </div>
    <Footer />
  </div>
)

export default Home
