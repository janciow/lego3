import React from 'react'
import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? <div>Landing page logged</div> : <div>Landing page not logged</div>
  )
}

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/currentuser').catch((error) => {
    console.log(error)
  })

  console.log('landing page')
  return data
}

export default LandingPage