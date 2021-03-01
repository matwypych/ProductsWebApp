import React, {Component} from 'react'
import { Link, useHistory } from "react-router-dom"
import { Card, Button, Alert } from "react-bootstrap"
import UpdateProduct from "./UpdateProduct"
import DeleteProduct from './DeleteProduct'



export default class ProductsDisplay extends Component 
{

    render() 
    {
        return (
            <div class="container p-3 my-3  text-dark">
            {(this.props.confirmed===true) && <Card>
                <h5 style={{ alignItems: 'center', display: 'flex', marginLeft: '10px'}}><strong>{this.props.name} : </strong> {this.props.weight} kg {' '}
                <Link onClick={()=> <UpdateProduct prodId={this.props.id} /> } to={"/update-product/" + this.props.id} className="btn btn-outline-primary" style={{float : 'right',  marginRight : '10px', marginTop:'10px', marginLeft: '10px'}}>
                    Update
                </Link>
                {'    '} 
                <Link onClick={()=> <DeleteProduct prodId={this.props.id} /> } to={"/delete/" + this.props.id} className="btn btn-outline-danger" style={{float : 'right',
                                                                             marginRight : '10px',
                                                                             marginTop: '10px',
                                                                        }}>
                    Delete
                </Link>
                </h5>
            </Card>}
            <br/>
        </div>
        )
    }
}

