import React, { Component } from 'react';


class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleNameChange = e => {
     this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    console.log(`e.target.value`, e.target.value)
    this.setState({ ingredients: [...this.state.ingredients, e.target.value] });
  }

postOrder = () => {
  console.log(`this.name`, this.state.name)
  console.log(`this.ingredients`, this.state.ingredients)
return  fetch(`http://localhost:3001/api/v1/orders`,{
             method: "POST",
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({name: this.state.name, ingredients: this.state.ingredients}),
           })
         .then((response) => response.json())
       
}

  handleSubmit = e => {
    let missingInfo = !this.state.name ? 'name' : 'ingredient'
    e.preventDefault();
    this.state.name && this.state.ingredients.length ? this.postOrder()
    && this.props.addOrder({name: this.state.name, ingredients: this.state.ingredients}):
    this.setState({error: `You're missing ${missingInfo}, please fill out missing info`})  
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      console.log(ingredient)
      return (
        <button className='ing-btn'  key={`${ingredient}+1`} name={ingredient} value={ingredient} onClick={e=> this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form className='order-form'>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
       
        <button className='submit-btn'
        onClick={e => this.handleSubmit(e)} >
          Submit Order
        </button>
        <p className="error">{this.state.error}</p>
      </form>
    )
  }
}

export default OrderForm;
