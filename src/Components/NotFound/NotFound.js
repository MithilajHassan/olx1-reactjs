import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='div-404'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/"><button className='back-button'>Go to Homepage</button></Link>
    </div>
  )
}

export default NotFound