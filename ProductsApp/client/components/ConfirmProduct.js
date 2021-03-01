import React, {useRef, useState, useEffect, Component} from 'react'
import {Redirect, Link} from "react-router-dom"
import {Form, Button, Card, Alert} from 'react-bootstrap'
import instance from "../instance"
import {SERVER_HOST} from "../config/global_constants"

export default class ConfirmProduct extends Component 
{

    constructor(props) 
    {
        super(props)
        
        if(window.location.pathname==="/products-list"){
            this.prodList = true; 
       } else {
            this.prodList = false;
       }

        this.state = {
            redirectToDisplayAllProducts:false
        }
    }

        

    componentDidMount() 
    {  
        const prodid = {
            id: this.props.match.params.id
        }

        instance.put(`${SERVER_HOST}/confirm-product/${this.props.match.params.id}`, prodid ,{headers:{"authorization":localStorage.token}} )
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
                    console.log(res.data)
                    this.setState({redirectToDisplayAllProducts:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }
    

    render () 
    {
        return (
            <div>
                {(this.prodList==true) && this.state.redirectToDisplayAllProducts ? <Redirect to="/products-list"/> : null}
                {(this.prodList==false) && this.state.redirectToDisplayAllProducts ? <Redirect to="/confirm-product"/> : null}
            </div>
        )
    }

}