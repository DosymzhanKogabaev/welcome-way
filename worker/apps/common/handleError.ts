export const handleError = (error: any): Response => {
  // Special handling for validation errors that already have a status code
  const statusCode = error?.status || error?.code;
  console.log("statusCode:", statusCode);
  const statusCodeResult =
    statusCode >= 200 && statusCode <= 599 ? statusCode : 500;
  console.log("statusCodeResult:", statusCodeResult);
  if (error && statusCode && error.message) {
    return new Response(
      JSON.stringify({
        error: error.name || "ValidationError",
        message: error.message,
        status: statusCode,
      }),
      {
        status: statusCodeResult,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Create a more detailed error object for general errors
  console.error("Handling error:", error);

  // Default to 400 for exceptions that appear to be related to validation
  if (
    error &&
    (error.name?.includes("Exception") ||
      error.message?.includes("code") ||
      error.message?.toLowerCase().includes("validation"))
  ) {
    return new Response(
      JSON.stringify({
        error: error.name || "ValidationError",
        message: error.message || "Invalid request data",
        status: 400,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Default to 500 for unhandled errors
  return new Response(
    JSON.stringify({
      error: "InternalServerError",
      message: "An internal server error occurred",
      status: 500,
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  );
};
