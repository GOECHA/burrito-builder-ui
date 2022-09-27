
import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list" >
          {order.ingredients.map(ingredient => {
            console.log(ingredient)
            return <li key={`${ingredient}+1`}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section classname="prev-orders">
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;























// import React from 'react';
// import './Orders.css';
// import Ticket from '../Ticket/Ticket';


// const Orders = ({orders}) => {


//   const orderEls = orders.map(order => {
//     console.log(`order`, order)
//     return (
//       <Ticket
//         name={order.name}
//         ingredient={order.ingredients}
//         key={order.id}
//       />
//     )
//   });

//   return (
//     <section className='order-container'>
//       { orderEls }
//     </section>
//   )
// }

// export default Orders;