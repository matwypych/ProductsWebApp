import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, Redirect} from "react-router-dom"
import instance from "../instance"
import { SERVER_HOST } from '../config/global_constants'
import Img from './mail.png'
import Img2 from './klodka.jpg'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirectToDash, setRedirectToDash] = useState(false)


  function validation() {
     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       setError("Passwords do not match")
       setLoading(true)
     }
       else {
           setError("")
           setLoading(false)
       }
  }


  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    setLoading(true)
    setError("")

    if (emailRef.current.value !== localStorage.name) {
      const obj = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        oldMail: localStorage.name
      }

    

      instance.put(`${SERVER_HOST}/update-profile`, obj)
      .then( res => 
        {
          if(res.data)
          {
            console.log(res.data.message)
            var mess = res.data.message
            var newuserEmail = res.data.newMail

            if(mess === "success")
            {
              localStorage.name = newuserEmail
              
              setRedirectToDash(true)
              setLoading(false)
            }
            else
            {
            
            }

          } else {
            console.log("Auth failed")
            
          }
        })
        .catch(error => 
          {
            console.log(error)
           
          })
    
    }
    if (passwordRef.current.value) {
     
    }
  }

  return (
    <>
  <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {redirectToDash ? <Redirect to="/"/> : null}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>
                <img src={Img} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
                Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={localStorage.name}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
              <img src={Img2} style={{weight: "20px", height: "20px", marginRight: "10px"}}/> 
                Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                onChange={validation}
               
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                onChange={validation}
              
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-success" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/" className="text-dark">Cancel</Link>
      </div>
    </>
  )
}