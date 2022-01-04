import React, { useState, useEffect } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    // console.log("try new time,get sata", response.data);
    // data is Array object

    // if (!response.ok) {
    //   setError(true)
    //   return response;
    // }
    // setError(false);
    // // console.log("what is response", response);
    // setData(response.data);
    // return response;

    //simplify code above to below
    setError(!response.ok);
    setData(response.data);
    return response;
  };
  return { data, error, loading, request };
};
