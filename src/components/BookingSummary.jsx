import { formatDisplayDate } from "../utils/dateUtils";

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function BookingSummary({ quote, confirmedBooking }) {
  if (!quote) {
    return (
      <section className="booking-summary booking-summary--empty">
        <p className="section-label section-label--light">Booking summary</p>

        <h2>Your stay</h2>

        <p>
          Select valid dates and a room to see the number of nights and total
          price.
        </p>
      </section>
    );
  }

  return (
    <section className="booking-summary">
      <div className="booking-summary__heading">
        <div>
          <p className="section-label section-label--light">Booking summary</p>
          <h2>Your stay</h2>
        </div>

        {confirmedBooking && (
          <span className="confirmation-badge">Confirmed</span>
        )}
      </div>

      <div className="summary-room">
        <div>
          <strong>{quote.room.type}</strong>
          <span>{quote.room.code}</span>
        </div>

        <strong>
          {formatPrice(quote.room.pricePerNight)}
          <small>/night</small>
        </strong>
      </div>

      <dl className="summary-details">
        <div>
          <dt>Check-in</dt>
          <dd>{formatDisplayDate(quote.checkIn)}</dd>
        </div>

        <div>
          <dt>Check-out</dt>
          <dd>{formatDisplayDate(quote.checkOut)}</dd>
        </div>

        <div>
          <dt>Guests</dt>
          <dd>
            {quote.guestCount} {quote.guestCount === 1 ? "guest" : "guests"}
          </dd>
        </div>

        <div>
          <dt>Length of stay</dt>
          <dd>
            {quote.numberOfNights}{" "}
            {quote.numberOfNights === 1 ? "night" : "nights"}
          </dd>
        </div>
      </dl>

      <div className="summary-calculation">
        <span>
          {quote.numberOfNights}{" "}
          {quote.numberOfNights === 1 ? "night" : "nights"}
          {" × "}
          {formatPrice(quote.room.pricePerNight)}
        </span>
      </div>

      <div className="summary-total">
        <span>Total price</span>
        <strong>{formatPrice(quote.totalPrice)}</strong>
      </div>

      {confirmedBooking && (
        <div className="booking-confirmation" role="status">
          <strong>Booking created</strong>
          <span>Reference: {confirmedBooking.id}</span>
        </div>
      )}
    </section>
  );
}

export default BookingSummary;
