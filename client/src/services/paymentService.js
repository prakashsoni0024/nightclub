export const createOrder = async (amount) => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        amount,
      }),
    }
  );

  return response.json();
};



export const verifyPayment = async (data) => {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  return response.json();
};