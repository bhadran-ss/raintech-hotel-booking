import RoomCard from "./RoomCard";

function RoomList({ rooms, selectedRoomCode, onRoomSelect, error }) {
  return (
    <section className="panel">
      <div className="panel__heading room-list-heading">
        <div className="panel__heading-content">
          <span className="step-number">2</span>

          <div>
            <p className="section-label">Available options</p>
            <h2>Select a room</h2>
          </div>
        </div>

        <span className="room-count">
          {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
        </span>
      </div>

      {error && (
        <p id="room-selection-error" className="room-list-error" role="alert">
          {error}
        </p>
      )}

      <div
        className="room-list"
        role="radiogroup"
        aria-label="Hotel rooms"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "room-selection-error" : undefined}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.code}
            room={room}
            isSelected={selectedRoomCode === room.code}
            onSelect={onRoomSelect}
          />
        ))}
      </div>
    </section>
  );
}

export default RoomList;
