import { useState } from "react";

import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import Hero from "./components/Hero";
import RoomList from "./components/RoomList";
import hotelData from "./data/hotelData.json";

import { calculateNights, getTodayDateString } from "./utils/dateUtils";

import { calculateTotalPrice, validateBooking } from "./utils/bookingUtils";

import "./App.css";

function App() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [selectedRoomCode, setSelectedRoomCode] = useState("");
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const rooms = hotelData.rooms;
  const minimumCheckIn = getTodayDateString();

  const selectedRoom = rooms.find((room) => room.code === selectedRoomCode);

  const validation = validateBooking({
    checkIn,
    checkOut,
    guestCount,
    selectedRoomCode,
    maximumGuests: selectedRoom?.maxGuests,
  });

  let quote = null;

  if (validation.isValid && selectedRoom) {
    const numberOfNights = calculateNights(checkIn, checkOut);

    const totalPrice = calculateTotalPrice(
      numberOfNights,
      selectedRoom.pricePerNight,
    );

    quote = {
      room: selectedRoom,
      checkIn,
      checkOut,
      guestCount,
      numberOfNights,
      totalPrice,
    };
  }

  function clearConfirmedBooking() {
    if (confirmedBooking) {
      setConfirmedBooking(null);
    }
  }

  function handleCheckInChange(value) {
    setCheckIn(value);
    clearConfirmedBooking();
  }

  function handleCheckOutChange(value) {
    setCheckOut(value);
    clearConfirmedBooking();
  }

  function handleGuestCountChange(value) {
    setGuestCount(value);
    clearConfirmedBooking();
  }

  function handleRoomSelect(roomCode) {
    setSelectedRoomCode(roomCode);
    clearConfirmedBooking();
  }

  function handleBooking(event) {
    event.preventDefault();

    if (!quote) {
      return;
    }

    const booking = {
      id: `BK-${Date.now()}`,
      roomCode: quote.room.code,
      roomType: quote.room.type,
      checkIn: quote.checkIn,
      checkOut: quote.checkOut,
      guestCount: quote.guestCount,
      numberOfNights: quote.numberOfNights,
      pricePerNight: quote.room.pricePerNight,
      totalPrice: quote.totalPrice,
    };

    setConfirmedBooking(booking);
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand__mark">R</span>

          <span className="brand__text">
            <strong>Raintech</strong>
            <small>Hotel Booking</small>
          </span>
        </a>
      </header>

      <main className="page-container">
        <Hero />

        <div className="booking-layout">
          <div className="booking-column">
            <BookingForm
              checkIn={checkIn}
              checkOut={checkOut}
              guestCount={guestCount}
              minimumCheckIn={minimumCheckIn}
              onCheckInChange={handleCheckInChange}
              onCheckOutChange={handleCheckOutChange}
              onGuestCountChange={handleGuestCountChange}
              onSubmit={handleBooking}
              canSubmit={Boolean(quote)}
            />

            <BookingSummary quote={quote} confirmedBooking={confirmedBooking} />
          </div>

          <RoomList
            rooms={rooms}
            selectedRoomCode={selectedRoomCode}
            onRoomSelect={handleRoomSelect}
          />
        </div>
      </main>

      <footer className="site-footer">
        <p>Raintech Hotel Booking</p>
      </footer>
    </>
  );
}

export default App;
