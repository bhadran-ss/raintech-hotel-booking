function BookingErrorSummary({ errors }) {
  const errorMessages = Object.values(errors).filter(Boolean);

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div className="error-summary" role="alert" aria-live="assertive">
      <strong>Please correct the following:</strong>

      <ul>
        {errorMessages.map((message, index) => (
          <li key={`${message}-${index}`}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookingErrorSummary;
