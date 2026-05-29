import API from "./api";

export const createOrder = async (amount) => {
  try {
    const { data } = await API.post(
      "/payment/create-order",
      {
        amount,
      }
    );

    return data;

  } catch (error) {
    console.error("Create Order Error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to create order",
    };
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const { data } = await API.post(
      "/payment/verify-payment",
      paymentData
    );

    return data;

  } catch (error) {
    console.error("Verify Payment Error:", error);

    return {
      success: false,
      message: error.response?.data?.message || "Payment verification failed",
    };
  }
};