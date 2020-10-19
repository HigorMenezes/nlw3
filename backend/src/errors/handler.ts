import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  // eslint-disable-next-line no-unused-vars
  _next,
) => {
  console.error(error);

  return response.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
