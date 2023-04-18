import React from 'react'

const ErrorFetch = ({ handleError }) => {
  return (
    <div className="Container__Error">
      <div className='Card__Content--Error'>
        <div className="Card__Error--Image">
          <img src="../../public/icons/icon-warning.jpg" alt="icon-Warning" />
        </div>
        <div className="Card__Error--Header">
          <h1 className='Card__Error--Title'>{handleError?.message}</h1>
          <img src="/public/icons/icon-location.png" alt="icon-location" />
          <img src="./public/icons/failed.png" alt="icon-failed" />
        </div>
        <p>¡This app requires access to your location! <br />
          Your location will not be shared. <br />
          To continue you must allow access to your location</p>
      </div>
    </div>
  )
}

export default ErrorFetch