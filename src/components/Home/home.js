import Navbar from '../Navbar/navbar'
import RestaurantsOffersLoader from '../RestaurantsOffersLoader/restaurantsOfferLoader'
import RestaurantsListLoader from '../RestaurantsListLoader/restaurantsListLoader'
import Footer from '../Footer'

const Home = () => (
  <div>
    <Navbar showHomeActive />
    <RestaurantsOffersLoader />
    <RestaurantsListLoader testid="restaurants-list-loader" />
    <Footer />
  </div>
)

export default Home
