import React from "react";

export const navigationRef = React.createRef();

const navigate = (name, params) => {
  if (!navigationRef.current) navigationRef.current.navigate(name, params);
  // short cut => navigationRef.current?.navigate(name, params), if ? yes, continue
};

export default { navigate };
