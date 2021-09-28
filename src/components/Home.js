import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: []
    }
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/allData`).then(allDataResponse => {
      this.setState({
        allData: allDataResponse.data.fruits
      })
    })
  }

  handelAddToFav = (fruit) => {
    const dataForFav = {
      name: fruit.name,
      image: fruit.image,
      price: fruit.price,
      email:this.props.auth0.user.email
    }
    axios.post(`${process.env.REACT_APP_API_URL}/fruits`,dataForFav);

  }
  render() {
    return (
      <>
        {
          this.state.allData.length > 0 &&
          this.state.allData.map(fruit => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={fruit.image} />
                <Card.Body>
                  <Card.Title>{fruit.name}</Card.Title>
                  <Card.Text>price:{fruit.price}</Card.Text>
                  <Button variant="danger" onClick={() => { this.handelAddToFav(fruit) }}>Add TO Fav</Button>
                </Card.Body>
              </Card>)

          })

        }

      </>
    )
  }
}

export default withAuth0(Home);
