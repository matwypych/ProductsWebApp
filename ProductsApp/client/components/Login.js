import React, { useRef, useState, useEffect } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, Redirect, useHistory } from "react-router-dom"
import {SERVER_HOST} from "../config/global_constants"
import instance from "../instance"
import Logo from "../Logo.png"
import Img from './images.png'
import Img2 from './klodka.jpg'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [redirectToDash, setRedirectToDash] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()

      setError("")
      setLoading(true)
    
      
      const obj = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }

      instance.put(`${SERVER_HOST}/login/${emailRef.current.value}`, obj)
      .then( res => 
        {
          if(res.data)
          {
           
            var mess = res.data.message
            var userEmail = res.data.name

            if(mess === "success")
            {
              localStorage.name = res.data.name
              localStorage.accessLevel = res.data.accessLevel
              localStorage.token = res.data.token
             
        
              setRedirectToDash(true)
              setLoading(false)
            }
            else if(mess==="auth/user-not-found")
            {
              setLoading(false)
              setError("User not found")
              localStorage.accessLevel = 0
              localStorage.token = null 
            }
            else if(mess==="auth/wrong-password")
            {
              setLoading(false)
              setError("Wrong password")
              localStorage.accessLevel = 0
              localStorage.token = null 
            }

          } else {
            console.log("Auth failed")
            localStorage.accessLevel = 0
            localStorage.token = null 
          }
        })
        .catch(error => 
          {
            console.log(error)
            localStorage.accessLevel = 0
            localStorage.token = null 
          })
    
  }

  useEffect(() => {
    let IsSubscribed = true
    return () => IsSubscribed = false
  }, []);

  return (
    <>
    <img className="d-flex justify-content-center" style={{width : '200px', height:'200px', float:'center', position:"static", marginLeft:"100px", marginBottom:"50px"}} src={Logo}></img>
    <Card>
        <Card.Body>
          <h1 className="text-center text-success mb-4" color>Log In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {redirectToDash ? <Redirect to="/"/> : null}
         
          <Form>
            <Form.Group id="email">
              <Form.Label>
              <img src={Img} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
              Email :

              </Form.Label>
             
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>
              <img src={Img2} style={{weight: "22px", height: "22px", marginRight: "8px"}}/>
                Password :</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn-success" type="submit" onClick={handleSubmit}>
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 ">
            <Link to="/forgot-password" class="text-dark">Forgot Password?</Link>
            
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Need an account? <Link to="/signup" class="text-success">Sign Up</Link>
      </div>
    </>
  )
}

