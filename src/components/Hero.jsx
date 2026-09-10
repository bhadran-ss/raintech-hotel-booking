function Hero() {
  return (
    <section className="hero">
      <img
        className="hero__image"
        src="/hotel-room.jpg"
        alt="Comfortable modern hotel room"
      />

      <div className="hero__overlay">
        <p className="hero__eyebrow">Raintech Hotel</p>
        <h1>Find the right room for your stay</h1>
        <p className="hero__description">
          Select your dates, compare rooms and review the complete stay price.
        </p>
      </div>
    </section>
  );
}

export default Hero;
