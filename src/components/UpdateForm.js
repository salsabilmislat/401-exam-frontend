import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handeldiplayUpdateModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onClick={this.props.handelUpdateData}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"  name='name' placeholder="Enter name" defaultValue={this.props.fruitSelectedData.name}  />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text"  name='image' placeholder="Enter image" defaultValue={this.props.fruitSelectedData.image}  />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text"  name='price' placeholder="Enter price"defaultValue={this.props.fruitSelectedData.price}  />
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default UpdateForm
