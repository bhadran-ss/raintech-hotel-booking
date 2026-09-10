import { describe, expect, it } from "vitest";

import { calculateTotalPrice, validateBooking } from "../utils/bookingUtils";

describe("calculateTotalPrice", () => {
  it("calculates the total price", () => {
    expect(calculateTotalPrice(3, 3500)).toBe(10500);
  });

  it("calculates the Executive Suite price", () => {
    expect(calculateTotalPrice(2, 5800)).toBe(11600);
  });

  it("rejects zero nights", () => {
    expect(() => calculateTotalPrice(0, 3500)).toThrow(
      "Number of nights must be a positive whole number.",
    );
  });

  it("rejects a negative price", () => {
    expect(() => calculateTotalPrice(2, -3500)).toThrow(
      "Price per night must be a valid non-negative number.",
    );
  });
});

describe("validateBooking", () => {
  const today = "2026-09-10";

  it("accepts a valid booking selection", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-13",
      guestCount: 2,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result).toEqual({
      isValid: true,
      errors: {},
    });
  });

  it("requires all mandatory fields", () => {
    const result = validateBooking({
      checkIn: "",
      checkOut: "",
      guestCount: undefined,
      selectedRoomCode: "",
      maximumGuests: undefined,
      today,
    });

    expect(result).toEqual({
      isValid: false,
      errors: {
        checkIn: "Select a check-in date.",
        checkOut: "Select a check-out date.",
        room: "Select a room before booking.",
        guestCount: "Enter a valid number of guests.",
      },
    });
  });

  it("rejects a past check-in date", () => {
    const result = validateBooking({
      checkIn: "2026-09-09",
      checkOut: "2026-09-12",
      guestCount: 2,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.checkIn).toBe("Check-in date cannot be in the past.");
  });

  it("rejects a same-day booking", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-10",
      guestCount: 2,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.checkOut).toBe(
      "Check-out date must be after check-in date.",
    );
  });

  it("rejects check-out before check-in", () => {
    const result = validateBooking({
      checkIn: "2026-09-15",
      checkOut: "2026-09-12",
      guestCount: 2,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.checkOut).toBe(
      "Check-out date must be after check-in date.",
    );
  });

  it("requires a room selection", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guestCount: 2,
      selectedRoomCode: "",
      maximumGuests: undefined,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.room).toBe("Select a room before booking.");
  });

  it("rejects zero guests", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guestCount: 0,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.guestCount).toBe("Enter a valid number of guests.");
  });

  it("rejects a non-integer guest count", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guestCount: 1.5,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.guestCount).toBe("Enter a valid number of guests.");
  });

  it("rejects a guest count above room capacity", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guestCount: 3,
      selectedRoomCode: "R101",
      maximumGuests: 2,
      today,
    });

    expect(result.isValid).toBe(false);

    expect(result.errors.guestCount).toBe(
      "This room allows a maximum of 2 guests.",
    );
  });

  it("accepts a guest count equal to room capacity", () => {
    const result = validateBooking({
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guestCount: 4,
      selectedRoomCode: "R301",
      maximumGuests: 4,
      today,
    });

    expect(result).toEqual({
      isValid: true,
      errors: {},
    });
  });
});
