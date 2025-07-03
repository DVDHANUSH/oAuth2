import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      // code
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  // handle payment
  const handlePayment = async () => {
    console.log("payment handled");
    // create order api
    const createOrderApi = `http://localhost:9098/api/v1/orders`;
    const verifyUrl = "http://localhost:9098/api/v1/orders/verify";
    const response = await axios.post(createOrderApi, {
      amount: 1400,
      courseId: "fcb39cb1-a8ec-4dbb-81de-7058fa6202d9",
      userId: "current_user_123456789",
      userName: "DVD",
    });
    toast.success("Order created successfully");
    const createdOrder = response.data;
    console.log("createdOrder", createdOrder);
    console.log("amount", createdOrder.amount);
    console.log("Full API response:", response);

    const options = {
      key: "rzp_test_x3kfrKJUPAQ811", // Enter the Key ID generated from the Dashboard
      amount: createdOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Adhithya Chemicals", //your business name
      description: "Test Transaction",
      image: "https://picsum.photos/536/354",
      order_id: createdOrder.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        //payment success hone par ye call
        toast.success("payment successful");
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        // varify paymentapi call//
        const vResponse = await axios.post(verifyUrl, {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
        toast.success(vResponse.data);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Logged in user", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9899989899", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      toast.error("payment failed");
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    paymentObject.open();
  };
  // starting
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
      .then((result) => {
        console.log("script loaded", result);
      })
      .catch((error) => {
        console.log("error in loading script", error);
      });
  }, []);
  return (
    <div>
      <h1>Spring boot Live batch</h1>
      <p>This batch is going to start from 29t Dec 2025</p>
      <p>Please join us for the exiciting event</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, enim
        expedita magnam consequuntur debitis ab quo accusamus quisquam sequi
        ipsum et. At reiciendis corporis nam molestiae officiis ad quam,
        consequatur doloribus minima nisi ipsa natus quo beatae cumque officia
        illo ab architecto soluta voluptatibus. Repellendus possimus temporibus
        hic minima aperiam?
      </p>
      <button onClick={handlePayment}>Buy Now</button>
    </div>
  );
};
export default Home;
