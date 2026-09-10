import { getTodayDateString, parseDateInput } from "./dateUtils";

export function calculateTotalPrice(numberOfNights, pricePerNight) {
  if (!Number.isInteger(numberOfNights) || numberOfNights <= 0) {
    throw new RangeError("Number of nights must be a positive whole number.");
  }

  if (
    typeof pricePerNight !== "number" ||
    !Number.isFinite(pricePerNight) ||
    pricePerNight < 0
  ) {
    throw new RangeError(
      "Price per night must be a valid non-negative number.",
    );
  }

  return numberOfNights * pricePerNight;
}

export function validateBooking({
  checkIn,
  checkOut,
  selectedRoomCode,
  today = getTodayDateString(),
}) {
  const errors = {};

  const checkInDate = parseDateInput(checkIn);
  const checkOutDate = parseDateInput(checkOut);
  const todayDate = parseDateInput(today);

  if (!todayDate) {
    throw new TypeError("The current date is invalid.");
  }

  if (!checkIn) {
    errors.checkIn = "Select a check-in date.";
  } else if (!checkInDate) {
    errors.checkIn = "Select a valid check-in date.";
  } else if (checkInDate < todayDate) {
    errors.checkIn = "Check-in date cannot be in the past.";
  }

  if (!checkOut) {
    errors.checkOut = "Select a check-out date.";
  } else if (!checkOutDate) {
    errors.checkOut = "Select a valid check-out date.";
  }

  if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
    errors.checkOut = "Check-out date must be after check-in date.";
  }

  if (!selectedRoomCode) {
    errors.room = "Select a room before booking.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
