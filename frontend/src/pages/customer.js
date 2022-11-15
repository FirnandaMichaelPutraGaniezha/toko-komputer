import React from 'react'
import axios from 'axios'
import {Modal, Button, Form} from 'react-bootstrap'
import CustomerList from '../component/customerList'

export default class Customer extends React.Component {
    constructor() {
        super()
        this.state = {
            customers: [],
            isModalOpen: false,
            name: "",
            phone: "",
            address: "",
            username: "",
            image: null,
            password: "",
            action: "insert",
        }
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
        }
        // jika belum login 
        else {
            window.location = '/login'
        }
    }

    handleAdd = () => {
        this.setState({
            isModalOpen : true,
            name : "",
            phone : "",
            address : "",
            username : "",
            image : null,
            password : "",
            action : "insert",
        })
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        let form = new FormData()
        form.append("name",this.state.name)
        form.append("phone",this.state.phone)
        form.append("address",this.state.address)
        form.append("username",this.state.username)
        form.append("password",this.state.password)
        form.append("image",this.state.image)

        let url = "http://localhost:8000/customer/"

        axios.post(url, form)
        .then(res => {
            this.getCustomer()
            this.handleClose()
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
                    customers: res.data.customer
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    componentDidMount = () => {
        this.getCustomer()
    }
    render() {
        return (
            <div className="bg">
                <div className="container">
                    <div className='mb-4 mt-4'>
                        <h6>Data Customer</h6>
                    </div>
                    <div>
                        <button className='btn btn-success' onClick={() => this.handleAdd()}>
                            Tambah Cutomer
                        </button>
                        {this.state.customers.map((item, index) => {
                            return(
                            <CustomerList key={index}
                                nameImage={item.image}
                                image={"http://localhost:8000/image/customer/" + item.image}
                                name={item.name}
                                phone={item.phone}
                                address={item.address}
                                onEdit={() => this.handleEdit(item)}
                                onDrop={() => this.handleDrop(item.customer_id)}
                            />
                            )
                        })}
                    </div>
                    {/* Modal */}
                 <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Customer</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={(e) => this.handleSave(e)}>
                            <Modal.Body>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Masukkan Nama" value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>No. HP</Form.Label>
                                <Form.Control type="text" name="phone" placeholder="Masukkan No HP" value={this.state.phone} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" name="address" placeholder="Masukkan Alamat" value={this.state.address} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control type="file" name="image" placeholder="Masukkan Foto" value={this.state.Image} onChange={this.handleFile} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Masukkan Username" value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}