import React, {useRef, useState, useEffect} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Link, useHistory, Redirect } from "react-router-dom"
import instance from "../instance"
import {SERVER_HOST} from "../config/global_constants"
import Img from './images.png'
import Img2 from './klodka.jpg'
import Img3 from './mail.png'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [redirectToDash, setRedirectToDash] = useState(false)

   async function handleSubmit(e) {
        e.preventDefault()

        setLoading(true)
        setError('')
        const obj = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value
          }

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        instance.put(`${SERVER_HOST}/signup/${emailRef.current.value}`, obj)
        .then( res => 
          {
            if(res.data)
            {
              console.log(res.data.message)
              var mess = res.data.message
              var userEmail = res.data.name
  
              if(mess === "success")
              {
                localStorage.name = res.data.name
                localStorage.accessLevel = res.data.accessLevel
                localStorage.token = res.data.token
                
                history.push("/")
                setRedirectToDash(true)
                setLoading(false)
              }
              else
              {
                localStorage.accessLevel = 0
                localStorage.token = null 
              }
  
            } else {
              console.log("Signup failed")
              setError("Signup failed")
              localStorage.accessLevel = 0
              localStorage.token = null 
            }
          })
          .catch(error => 
            {
              console.log(error)
              setError(error)
              localStorage.accessLevel = 0
              localStorage.token = null 
            })
    }

  async function validation() {
    setLoading(true)
    var count = 0
   var re = /\S+@\S+\.\S+/;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
       setError("Passwords do not match")
     }
       
    else if(emailRef.current.value==="" || usernameRef.current.value==="" || firstNameRef.current.value==="" || lastNameRef.current.value==="")
    {
      setError("Please complete all inputs")
    }
    
    else if(!re.test(String(emailRef.current.value).toString()))
    {
        setError("Invalid email")
    }


    if((passwordRef.current.value === passwordConfirmRef.current.value) && 
        (emailRef.current.value!=="" && usernameRef.current.value!=="" && firstNameRef.current.value!=="" && lastNameRef.current.value!=="") && 
          re.test(String(emailRef.current.value).toString()) )
          {
            
            setError("")
            setLoading(false)
          }
  }



    useEffect(() => {
        let IsSubscribed = true
        return () => IsSubscribed = false
      }, []);
    

    return (
        <div>
             <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {redirectToDash ? <Redirect to="/"/> : null}
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>
                              <img src={Img3} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
                              Email <span class="text-danger">*</span>
                              </Form.Label>
                            <Form.Control type = "email" ref={emailRef} onChange={validation} required />
                        </Form.Group>
                        <Form.Group id="username">
                            <Form.Label>
                            <img src={Img} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
                              Username <span class="text-danger">*</span> </Form.Label>
                            <Form.Control ref={usernameRef} onChange={validation} required />
                        </Form.Group>
                        <Form.Group id="firstName">
                            <Form.Label>First Name <span class="text-danger">*</span> </Form.Label>
                            <Form.Control ref={firstNameRef} onChange={validation} required />
                        </Form.Group>
                        <Form.Group id="lastName">
                            <Form.Label>Last Name <span class="text-danger">*</span>  </Form.Label>
                            <Form.Control ref={lastNameRef} onChange={validation} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>
                            <img src={Img2} style={{weight: "20px", height: "20px", marginRight: "10px"}}/>
                              Password <span class="text-danger">*</span> </Form.Label>
                            <Form.Control type = "password" onChange={validation} ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>
                              Password Confirmation <span class="text-danger">*</span> </Form.Label>
                            <Form.Control type = "password" onChange={validation} ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button onClick={handleSubmit} disabled={loading} className="w-100 btn-success" type="Sumbit">Sign Up</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2" style={{marginBottom: "20px"}}>
                    Already have an account? <Link to="/login" class="text-success" >Log in</Link>
                </div>
            </Card>
        </div>
    )
}