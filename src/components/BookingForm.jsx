function BookingForm({
  checkIn,
  checkOut,
  guestCount,
  minimumCheckIn,
  onCheckInChange,
  onCheckOutChange,
  onGuestCountChange,
  onSubmit,
  canSubmit,
}) {
  return (
    <section className="panel">
      <div className="panel__heading">
        <span className="step-number">1</span>

        <div>
          <p className="section-label">Your stay</p>
          <h2>Choose booking dates</h2>
        </div>
      </div>

      <form className="booking-form" onSubmit={onSubmit} noValidate>
        <label className="form-field">
          <span>Check-in date</span>
          <input
            type="date"
            name="checkIn"
            value={checkIn}
            min={minimumCheckIn}
            onChange={(event) => onCheckInChange(event.target.value)}
          />{" "}
        </label>

        <label className="form-field">
          <span>Check-out date</span>

          <input
            type="date"
            name="checkOut"
            value={checkOut}
            min={checkIn || minimumCheckIn}
            onChange={(event) => onCheckOutChange(event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Number of guests</span>

          <select
            name="guestCount"
            value={guestCount}
            onChange={(event) => onGuestCountChange(Number(event.target.value))}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>
        </label>

        <button className="primary-button" type="submit" disabled={!canSubmit}>
          Confirm booking
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
