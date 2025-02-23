import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const query = new URLSearchParams(useLocation.search);
  const reference = query.get(reference);


  return (
    <>
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h4>✅ Payment Successful!</h4>
      <div className="referencediv">thanks for making payment with us</div>
      <a href="/" style={{ textDecoration: "none", color: "blue" }}>Go to Home</a>
    </div>

    {
    reference && (
      <div className="referencediv">
        <strong> reference id: </strong>{reference}
      </div>
    )
  }
  </>
  );
};

export default SuccessPage;
