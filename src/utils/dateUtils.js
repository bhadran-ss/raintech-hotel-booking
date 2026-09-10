const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function parseDateInput(dateString) {
  if (
    typeof dateString !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dateString)
  ) {
    return null;
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  const isValidDate =
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day;

  return isValidDate ? date : null;
}

export function getTodayDateString(currentDate = new Date()) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function calculateNights(checkIn, checkOut) {
  const checkInDate = parseDateInput(checkIn);
  const checkOutDate = parseDateInput(checkOut);

  if (!checkInDate || !checkOutDate) {
    throw new TypeError("Valid check-in and check-out dates are required.");
  }

  const difference = checkOutDate.getTime() - checkInDate.getTime();

  const numberOfNights = difference / MILLISECONDS_PER_DAY;

  if (numberOfNights <= 0) {
    throw new RangeError("Check-out must be after check-in.");
  }

  return numberOfNights;
}

export function formatDisplayDate(dateString) {
  const date = parseDateInput(dateString);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
