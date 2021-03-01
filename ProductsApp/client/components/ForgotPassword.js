import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import instance from "../instance"
import { SERVER_HOST } from '../config/global_constants'
import Img from './mail.png'

export default function ForgotPassword() {
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const obj = {
      email: emailRef.current.value
    }

    console.log(obj)

    instance.put(`${SERVER_HOST}/forgot-password`, obj)
      .then( res => 
        {
          setMessage("")
          setError("")
          setLoading(true)

          if(res.data)
          {
            var mess = res.data.message

            if(mess === "success")
            {
              setMessage("Check your inbox for further instructions")
              
              setLoading(false)
            }
            else
            {
              setError("Failed to reset password")
            }

          } else {
            setError("Failed to reset password")
            
          }
        })
        .catch(error => 
          {
            console.log(error)
            setError("Failed to reset password")
          })
  
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>
              <img src={Img} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
                Email  

              </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-success" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" class="text-dark">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup" class="text-success">Sign Up</Link>
      </div>
    </>
  )
}