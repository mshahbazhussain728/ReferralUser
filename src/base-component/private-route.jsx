import React from "react";
import { Navigate } from "react-router-dom";
import { isJSON } from "../utils/function";
import { getUser } from "../utils/auth";

const PrivateRoute = ({ element }) => {
  const user = isJSON(getUser());

  return user ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;
