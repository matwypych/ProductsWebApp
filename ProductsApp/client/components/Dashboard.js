import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import Img from './mail.png'

export default function Dashboard() {
  const [error, setError] = useState("")
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      localStorage.accessLevel = 0
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4" style={{marginTop : "10px"}}>Profile
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <img src={Img} style={{weight: "30px", height: "30px", marginRight: "10px"}}/>{localStorage.name}
          <Link to="/update-profile" className="btn btn-success w-100 mt-3">
            Update Profile
          </Link>
          {(localStorage.name===process.env.REACT_APP_ADMIN_LOGIN_1 || localStorage.name===process.env.REACT_APP_ADMIN_LOGIN_2) && 
            <Link to="/products-list" className="btn btn-success w-100 mt-3">
            Product list
          </Link>}
          {(localStorage.name==process.env.REACT_APP_ADMIN_LOGIN_1 || localStorage.name===process.env.REACT_APP_ADMIN_LOGIN_2) && 
            <Link to="/confirm-product" className="btn btn-success w-100 mt-3">
            Confirm added products
          </Link>}
          {(localStorage.name!==process.env.REACT_APP_ADMIN_LOGIN_1 && localStorage.name!==process.env.REACT_APP_ADMIN_LOGIN_2) && 
          <Link to="/add-product" className="btn btn-success w-100 mt-3">
            Add product
          </Link>}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
        <span class="text-dark">Log Out</span>
        </Button>
      </div>
    </>
  )
}