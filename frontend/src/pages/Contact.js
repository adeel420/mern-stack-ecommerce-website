import React from 'react'
import Layout from './../component/Layout'
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";

function Contact() {
  return (
    <Layout>
      <div className='contact-cont'>
        <h3>Contact</h3>
        <div className='container'>
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.5094353472564!2d74.30693357430732!3d31.592497843577267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191c82d226153f%3A0x8ff01f8c10380d79!2sMinar-e-Pakistan%2C%20Ahmed%20Ali%20Rd%2C%20Walled%20City%20of%20Lahore%2C%20Lahore%2C%20Punjab%2054000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1729276507105!5m2!1sen!2s" style={{ "border": 0 }} allowfullscreen="" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className='text'>
            Feel free to contact us anytime for any product queries or information. We are available 24/7 to assist you.
            <div className='text-and-icon'>
              <h5><IoMdMail /> <span className='icon'>www.ecommerce.com</span></h5>
              <h5><FaPhoneAlt /> <span className='icon'>0300-123456-7</span></h5>
              <h5><FaAddressBook /> <span className='icon'>Lahore Pakistan</span></h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
