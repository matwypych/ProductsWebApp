import React, {Component, useState} from 'react'
import instance from "../instance"
import {Card} from 'react-bootstrap'
import ProductsDisplay from './ProductsDisplay'
import { Link } from "react-router-dom"
import ConfirmProducts from "./ConfirmProducts" 
import {SERVER_HOST} from "../config/global_constants"

export default class ProductsList extends Component {

    constructor(props)
    {
        super(props)

        this.state={
            Products:[],
            counter:0,
            confirmedProd:[],
            notConfirmedProd:[]        
        }

            
    }
    

    componentDidMount() 
    {
        instance.get(`${SERVER_HOST}/products-list/`, {headers:{"authorization":localStorage.token}})
        .then(response => {

            if(response.data.errorMessage === 'User is not permitted to see this page') {
                console.log(response.data.errorMessage)
            } else {
                const fetchedResults = [];
                for (let key in response.data){
                    fetchedResults.unshift(
                        {
                            ...response.data[key],
                            id:key
                        }
                    )
                }
                this.setState({Products:fetchedResults})

                const tempConf = [];
                const tempNotConf = [];

                for (let i in this.state.Products){
                    if(this.state.Products[i].confirmed==true){
                        tempConf.push(this.state.Products[i])
                    } else {
                        tempNotConf.push(this.state.Products[i])
                    }
                }
                this.setState({confirmedProd:tempConf})
                this.setState({notConfirmedProd:tempNotConf})
            }
        
        })       
    }


    render() {
        return(
            <div>
            <Card>
            <h2 className="text-center mb-4" style={{marginTop : '10px'}}>Products list</h2>
                {(window.location.pathname==="/products-list") && <Card.Body>
                  {this.state.confirmedProd.map(Products => (
                      <ProductsDisplay
                      key = {Products.id}
                      id = {Products.id}
                      name = {Products.name}
                      weight={Products.weight}
                      confirmed = {Products.confirmed}
                      />
                  ) )}
                   <Link to="/add-product" className="btn btn-success btn-block">
                    Add product
                </Link> 
                </Card.Body>}
                {(window.location.pathname==="/confirm-product") && <Card.Body>
                  {this.state.notConfirmedProd.map(Products =>(
                      <ConfirmProducts
                      key = {Products.id}
                      id = {Products.id}
                      name = {Products.name}
                      weight={Products.weight}
                      confirmed = {Products.confirmed}
                      />
                  ) )}
                </Card.Body>}
            </Card>
            <div className="w-100 text-center mt-1">   
                <Link to="/" className="w-100 mt-1 text-dark">
                    Back to dashboard
                </Link>
            </div>
        </div>
        )  
    }
}
