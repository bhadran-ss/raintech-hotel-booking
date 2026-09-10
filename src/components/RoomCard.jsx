function RoomCard({ room }) {
  const formattedPrice = room.pricePerNight.toLocaleString("en-IN");

  return (
    <label className="room-card">
      <input
        className="room-card__radio"
        type="radio"
        name="selectedRoom"
        value={room.code}
      />

      <div className="room-card__details">
        <span className="room-card__code">{room.code}</span>
        <h3>{room.type}</h3>
        <p>
          Maximum {room.maxGuests} {room.maxGuests === 1 ? "guest" : "guests"}
        </p>
      </div>

      <div className="room-card__price">
        <strong>₹{formattedPrice}</strong>
        <span>per night</span>
      </div>
    </label>
  );
}

export default RoomCard;
