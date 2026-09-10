import RoomCard from "./RoomCard";

function RoomList({ rooms }) {
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

      <div className="room-list">
        {rooms.map((room) => (
          <RoomCard key={room.code} room={room} />
        ))}
      </div>
    </section>
  );
}

export default RoomList;
