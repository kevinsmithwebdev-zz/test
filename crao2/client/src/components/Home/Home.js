import React from 'react'


const handleDash = () => {
  fetch('http://localhost:8080/api/auth/dashboard', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      credentials: "same-origin"
    }
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    console.log('back from dash check')
    console.log(response)
  })
}

const Home = () => {
  return (
    <div>
      <h1>Home!!!</h1>
      <div onClick={handleDash}>Check Dash!</div>
    </div>
  )
}

export default Home
