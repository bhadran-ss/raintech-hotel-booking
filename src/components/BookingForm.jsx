function BookingForm({
  checkIn,
  checkOut,
  guestCount,
  minimumCheckIn,
  errors,
  onCheckInChange,
  onCheckOutChange,
  onGuestCountChange,
  onSubmit,
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
            id="check-in"
            type="date"
            name="checkIn"
            value={checkIn}
            min={minimumCheckIn}
            aria-invalid={Boolean(errors.checkIn)}
            aria-describedby={errors.checkIn ? "check-in-error" : undefined}
            onChange={(event) => onCheckInChange(event.target.value)}
          />

          {errors.checkIn && (
            <span id="check-in-error" className="field-error">
              {errors.checkIn}
            </span>
          )}
        </label>

        <label className="form-field">
          <span>Check-out date</span>

          <input
            id="check-out"
            type="date"
            name="checkOut"
            value={checkOut}
            min={checkIn || minimumCheckIn}
            aria-invalid={Boolean(errors.checkOut)}
            aria-describedby={errors.checkOut ? "check-out-error" : undefined}
            onChange={(event) => onCheckOutChange(event.target.value)}
          />

          {errors.checkOut && (
            <span id="check-out-error" className="field-error">
              {errors.checkOut}
            </span>
          )}
        </label>

        <label className="form-field">
          <span>Number of guests</span>

          <select
            id="guest-count"
            name="guestCount"
            value={guestCount}
            aria-invalid={Boolean(errors.guestCount)}
            aria-describedby={
              errors.guestCount ? "guest-count-error" : undefined
            }
            onChange={(event) => onGuestCountChange(Number(event.target.value))}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4 guests</option>
          </select>

          {errors.guestCount && (
            <span id="guest-count-error" className="field-error">
              {errors.guestCount}
            </span>
          )}
        </label>

        <button className="primary-button" type="submit">
          Confirm booking
        </button>
      </form>
    </section>
  );
}

export default BookingForm;
