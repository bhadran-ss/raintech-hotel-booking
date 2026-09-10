import hotelData from "./data/hotelData.json";
import BookingForm from "./components/BookingForm";
import Hero from "./components/Hero";
import RoomList from "./components/RoomList";
import "./App.css";

function App() {
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
          <BookingForm />
          <RoomList rooms={hotelData.rooms} />
        </div>
      </main>

      <footer className="site-footer">
        <p>Raintech Hotel Booking</p>
      </footer>
    </>
  );
}

export default App;
