import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import ProductsList from "./ProductsList"
import AddProduct from "./AddProduct"
import UpdateProduct from './UpdateProduct'
import ConfirmProduct from './ConfirmProduct'
import DeleteProduct from './DeleteProduct'

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/products-list" component={ProductsList} />
              <PrivateRoute exact path="/add-product" component={AddProduct} />
              <PrivateRoute exact path="/update-product/:id" component={UpdateProduct} />
              <PrivateRoute exact path="/confirm-product" component={ProductsList} />
              <PrivateRoute exact path="/delete/:id" component={DeleteProduct} />
              <PrivateRoute exact path="/confirm-product/:id" component={ConfirmProduct} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </Router>
      </div>
    </Container>
  )
}

export default App