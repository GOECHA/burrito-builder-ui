

export const getOrders = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/orders' );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('error', error);
  }
};


