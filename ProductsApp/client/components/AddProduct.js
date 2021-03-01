import React, {useRef, useState, useEffect, Component} from 'react'
import {Redirect, Link} from "react-router-dom"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import instance from "../instance"
import { SERVER_HOST } from '../config/global_constants'
import { useAlert } from 'react-alert'

export default class AddProduct extends Component {


    constructor(props)
    {
        super(props)
        
        this.state = {
            productName:"",
            weight:"",
            confirmed:false,
            redirectToProductList:false,
            error:""
        }
        
    }
   

    componentDidMount() 
    {
        
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => 
    {
        e.preventDefault()

        if(this.state.weight>5.00 || this.state.productName==="" || this.state.weight==0)
        {
           
            this.setState({error:"Invalid input"})
            console.log(this.state.error)
            return 0;
        }

        const productObject = {
            name: this.state.productName,
            weight: this.state.weight,
            confirmed: this.state.confirmed,
            id: ""
        }

        instance.post(`${SERVER_HOST}/add-product`, productObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {   
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {   
                    console.log("Record added")
                    this.setState({redirectToProductList:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }


        render() {
            return (
                <div>
                    <Card>
                    <Card.Body>
                    {this.state.redirectToProductList && localStorage.accessLevel==1 ? <Redirect to="/products-list"/> : null}
                    {this.state.redirectToProductList && localStorage.accessLevel==2 ? <Redirect to="/"/> : null}
                     {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                            <h2 className="text-center mb-4">Add Products</h2>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group id="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="productName" value={this.state.productName} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group id="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />
                                </Form.Group>
                                <Button className="w-100 btn-success" type="Sumbit">Add product</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">   
                    {(localStorage.accessLevel==1) &&  <Link to="/products-list" className="w-100 mt-3 text-dark">
                            Back to products list
                        </Link>}
                         {(localStorage.accessLevel==2) &&  <Link to="/" className="w-100 mt-3 text-dark">
                            Back to dashboard
                        </Link>}
            </div>
                </div>
            )
        }
}
