import React, {Component} from 'react'
import {Redirect} from "react-router-dom"
import { SERVER_HOST } from '../config/global_constants'
import instance from "../instance"

export default class DeleteProduct extends Component {
        
    constructor(props) 
    {
        super(props)
        

        this.state = {
            redirectToDisplayAllProducts:false
        }
    }


    componentDidMount() 
    {   
        instance.delete(`${SERVER_HOST}/delete/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                {
                    console.log("Record deleted")
                }
                this.setState({redirectToDisplayAllProducts:true})
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
    
    
    
    render()
    {
        return (
            <div>
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/products-list"/> : null}
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/confirm-product"/> : null}
            </div>
        )
    }
    
}
