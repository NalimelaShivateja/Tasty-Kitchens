import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-conatiner">
    <img
      src="https://res.cloudinary.com/degbnzg10/image/upload/v1686923297/erroring_1_s5cx7c.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found. <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
