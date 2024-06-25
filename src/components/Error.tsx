import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>Something went wrong</h2>
        <h2>{`${error.status} : ${error.statusText}`}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Oops!</h1>
      <h2>Something went wrong</h2>
      <h2>An unexpected error occurred.</h2>
    </div>
  );
};

export default Error;
