import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import UpdateForm from './UpdateForm'
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favData: [],
      showUpdateModel: false,
      fruitSelectedData: {}
    }
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/fruits?email=${this.props.auth0.user.email}`).then(favDataResponse => {
      this.setState({
        favData: favDataResponse.data
      })
    })
  }

  handeldiplayUpdateModel = (fruit) => {
    this.setState({
      showUpdateModel: !this.state.showUpdateModel,
      fruitSelectedData: fruit
    })
  }
  handelDeleteData = (fruitId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/fruits/${fruitId}`).then(deleteDataResponse => {
      if (deleteDataResponse.data.deleteCount === 1) {
        const newArr = this.state.favData.filter(fruit => fruit._id !== fruitId)
        this.setState({
          favData: newArr
        })
      }

    })
  }
  handelUpdateData = (e) => {
    e.preventDefault();
    const responseBody = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value,
    }
    axios.put(`${process.env.REACT_APP_API_URL}/fruits/${this.state.fruitSelectedData._id}`, responseBody).then(updateDataResponse => {
      const updateArr = this.state.favData.map(fruit => {
        if (this.state.fruitSelectedData._id === fruit._id) {
          fruit = updateDataResponse.data
          return fruit

        }
        return fruit
      })
      this.setState({
        favData: updateArr,
        fruitSelectedData: {}
      })
      this.handeldiplayUpdateModel();

    })

  }
  render() {
    return (
      <>
        {
          this.state.showUpdateModel &&
          <UpdateForm
            show={this.state.showUpdateModel}
            handeldiplayUpdateModel={this.handeldiplayUpdateModel}
            handelUpdateData={this.handelUpdateData}
            fruitSelectedData={this.state.fruitSelectedData}
          />
        }
        {
          this.state.favData.length > 0 &&
          this.state.favData.map(fruit => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={fruit.image} />
                <Card.Body>
                  <Card.Title>{fruit.name}</Card.Title>
                  <Card.Text>price:{fruit.price}</Card.Text>
                  <Button variant="danger" onClick={() => { this.handelDeleteData(fruit._id) }}>Delete</Button>
                  <Button variant="danger" onClick={() => { this.handeldiplayUpdateModel(fruit) }}>Update</Button>
                </Card.Body>
              </Card>)

          })

        }
      </>
    )
  }
}

export default withAuth0(FavFruit);
