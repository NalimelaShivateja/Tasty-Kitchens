import {Link} from 'react-router-dom'

import Navbar from '../Navbar/navbar'
import Footer from '../Footer'
import './index.css'
import '../Cart/index.css'

const PaymentPage = () => (
  <div>
    <Navbar showHomeActive />
    <div className="payment-main-container">
      <img
        src="https://res.cloudinary.com/degbnzg10/image/upload/v1686841289/Vector_1_ltzgxk.png"
        alt=""
      />
      <h1 className="empty-cart-heading">Payment Successful</h1>
      <p className="payment-para">
        Thank you for ordering
        <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button">Go To Home Page</button>
      </Link>
    </div>
    <Footer />
  </div>
)

export default PaymentPage
