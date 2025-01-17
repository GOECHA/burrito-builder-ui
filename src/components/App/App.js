import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }


   componentDidMount = () => {
    getOrders('/orders')
    .then(data=> {
      console.log(`data`, data.orders)
      this.setState({orders: data.orders})
    })   
  }

  addOrder = (newOrder) => {
    this.setState({ orders: [...this.state.orders, newOrder]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} order={this.state.orders}/>
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
