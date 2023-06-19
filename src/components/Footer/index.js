import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-main-container">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img
          src="https://res.cloudinary.com/degbnzg10/image/upload/v1686843704/Group_7420_eqajyk.png"
          alt="website-footer-logo"
          className="footer-image"
        />
        <h1 className="main-heading">Tasty Kitchens </h1>
      </div>
      <p>The only thing we are serious about is food. Contact us on</p>
      <div>
        <FaPinterestSquare
          className="footer-icons"
          testid="pintrest-social-icon"
        />
        <FaFacebookSquare
          className="footer-icons"
          testid="facebook-social-icon"
        />
        <FaTwitter className="footer-icons" testid="twitter-social-icon" />
        <FaInstagram className="footer-icons" testid="instagram-social-icon" />
      </div>
    </div>
  )
}
