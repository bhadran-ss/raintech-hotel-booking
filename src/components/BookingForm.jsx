function BookingForm() {
  return (
    <section className="panel">
      <div className="panel__heading">
        <span className="step-number">1</span>

        <div>
          <p className="section-label">Your stay</p>
          <h2>Choose booking dates</h2>
        </div>
      </div>

      <form className="booking-form">
        <label className="form-field">
          <span>Check-in date</span>
          <input type="date" name="checkIn" />
        </label>

        <label className="form-field">
          <span>Check-out date</span>
          <input type="date" name="checkOut" />
        </label>

        <label className="form-field">
          <span>Number of guests</span>

          <select name="guestCount" defaultValue="1">
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>
        </label>

        <button className="primary-button" type="button" disabled>
          Review booking
        </button>
      </form>

      <p className="form-note">
        Booking calculations and validation will be added in the next phase.
      </p>
    </section>
  );
}

export default BookingForm;
