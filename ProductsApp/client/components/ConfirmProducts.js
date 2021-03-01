import React, {useState, Component} from 'react'
import { Link, useHistory } from "react-router-dom"
import { Card, Button, Alert } from "react-bootstrap"
import UpdateProduct from "./UpdateProduct"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import DeleteProduct from './DeleteProduct'
import ConfirmProduct from './ConfirmProduct'

export default class ProductsDisplay extends Component 
{
    render () 
    {
        return (
            <div>
            {(this.props.confirmed===false) && <Card>
                <h6 text-center><strong>{this.props.name} : </strong> {this.props.weight} kg {' '}
                <Link onClick={()=> <UpdateProduct prodId={this.props.id} /> } to={"/update-product/" + this.props.id} className="btn btn-outline-primary btn-sm" style={{float : 'right'}}>
                    Update
                </Link>
              
                {'    '} 
                <Link onClick={()=> <DeleteProduct prodId={this.props.id}  /> } to={"/delete/" + this.props.id} className="btn btn-outline-danger btn-sm" style={{float : 'right',
                                                                             marginRight : '5px',
                                                                             marginTop: '0px'}}>
                    Delete
                </Link>
                <Link onClick={()=> <ConfirmProduct prodId={this.props.id} /> } to={"/confirm-product/" + this.props.id} className="btn btn-outline-success btn-sm" style={{float : 'right',
                                                                             marginRight : '5px',
                                                                             marginTop: '0px'}}>
                    Confirm
                </Link>
                </h6>
            </Card>}
        <br/>
    </div>
        )
    }

}
   
    
