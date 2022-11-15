import React from 'react'
import axios from "axios"
import './home.css'

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            token : '',
            adminName : '',
            adminCount : 0,
            customerCount : 0,
            productCount : 0,
            transaksiCount : 0
        }
        if (localStorage.getItem('token')){
            this.state.token = localStorage.getItem('token')
        }
        else {
            window.location = "/login"
        }
    }
    getAdmin = () => {
        let admin = localStorage.getItem('name')
        let url = "http://localhost:8000/admin/"
        
        axios.get(url)
        .then(res => {
            this.setState({
                adminName : admin,
                adminCount : res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getCustomer = () => {
        let url = "http://localhost:8000/customer/"

        axios.get(url)
        .then(res => {
            this.setState({
                customerCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getProduct = () => {
        let url = "http://localhost:8000/product/"

        axios.get(url)
        .then(res => {
            this.setState({
                productCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    getTransaksi = () => {
        let url = "http://localhost:8000/transaksi/"

        axios.get(url)
        .then(res => {
            this.setState({
                transaksiCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    componentDidMount = () =>{
        this.getAdmin();
        this.getCustomer();
        this.getProduct();
        this.getTransaksi();
    }

    render(){ 
        return(
            <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
              <div className="container text-center">
                 Selamat Datang {this.state.adminName}
             </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                            <img src="https://iconarchive.com/download/i91958/icons8/windows-8/Users-Administrator-2.ico"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Total Admin</h4>
                            <h2>{this.state.adminCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                        <img src="https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Total Customer</h4>
                            <h2>{this.state.customerCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>
        
                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridethree">
                            <img src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Total Product</h4>
                            <h2>{this.state.productCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                    <div className="inforide">
                      <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                            <img src="https://uxwing.com/wp-content/themes/uxwing/download/19-e-commerce-currency-shopping/checkout.png"/>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                            <h4>Total Checkout</h4>
                            <h2>{this.state.transaksiCount}</h2>
                        </div>
                      </div>
                    </div>
                </div>

            </div>
          </div>
        </div>
        );
    }
}