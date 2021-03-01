import React, {useRef, useState, useEffect, Component} from 'react'
import {Redirect, Link} from "react-router-dom"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import instance from "../instance"
import {SERVER_HOST} from "../config/global_constants"

export default class UpdateProduct extends Component {

    constructor(props) 
    {
        super(props)

        this.ref = React.createRef()

        this.state = {
            name: ``,
            confirmed:false,
            weight: 0.0,
            redirectToProductList:false,
            error:""
        }
    }


    componentDidMount(){
        
        instance.get(`${SERVER_HOST}/update-product/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}}).then(res => {
          
            
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    this.setState({
                        name: res.data.name,
                        confirmed: res.data.confirmed,
                        weight: res.data.weight,
                        id: res.data.id
                
                    })

                   
                }
            }
            else
            {
                console.log(`Record not found`)
            }
        }
        )
        
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
            return 0;
        }

        const productObject = {
            name: this.ref.current.value,
            weight: this.state.weight,
            confirmed: this.state.confirmed,
            id:this.state.id
        }

        instance.put(`${SERVER_HOST}/update-product/${this.props.match.params.id}`, productObject, {headers:{"authorization":localStorage.token}} )
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
                {this.state.redirectToProductList && this.state.confirmed ? <Redirect to="/products-list"/> : null}
                {this.state.redirectToProductList && !this.state.confirmed ? <Redirect to="/confirm-product"/> : null}
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                        <h2 className="text-center mb-4">Update Product</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group id="Name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="productName" defaultValue={this.state.name} ref={this.ref} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group id="weight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />
                            </Form.Group>
                            <Button className="w-100" type="Sumbit">Update product</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">   
                   {this.state.confirmed && <Link to="/products-list" className="w-100 mt-3">
                        Back to products list
                    </Link>}
                    {!this.state.confirmed && <Link to="/confirm-product" className="w-100 mt-3">
                        Back to products list
                    </Link>}
                </div>

            </div>
        )
    }
}


