export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      {/* ---- Desktop ---- */}
      <div className="container desktop-visible">
        <div className="counter-box fade-up top-row">
          <div>
            <img src="images/hotel.webp" alt="" />
          </div>
          <div className="counter-text pink-box">
            <h4>
              305 <span>(Residential) +</span> <br />2 <span>(Commercial)</span>
            </h4>
            <p>Plots</p>
          </div>
        </div>

        <div className="counter-grid">
          <div className="counter-box heading-block grid-heading">
            <h3>Designed for life.</h3>
            <p>Experience the luxury of ease.</p>
          </div>

          <div className="counter-box fade-up grid-green">
            <div>
              <img src="images/islands.webp" alt="" />
            </div>
            <div className="counter-text">
              <h4>6</h4>
              <p>Parks</p>
            </div>
          </div>

          <div className="counter-box fade-up grid-acres">
            <div>
              <img src="images/acres.webp" alt="" />
            </div>
            <div className="counter-text">
              <h4>~23.5</h4>
              <p>Acres</p>
            </div>
          </div>

          <div className="counter-box fade-up grid-clubhouse">
            <div>
              <img src="images/club-day.webp" alt="" />
            </div>
            <div className="counter-text green-box">
              <h4>10%</h4>
              <p>Open Space</p>
            </div>
          </div>

          <div className="counter-box fade-up grid-amenities">
            <div>
              <img src="images/swimming-pool-top-view.webp" alt="" />
            </div>
            <div className="counter-text brown-box">
              <h4>30+</h4>
              <p>Amenities</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Mobile ---- */}
      <div className="mobile-visible">
        <h3>Designed for life.</h3>
        <p>Experience the luxury of ease.</p>
        <div className="counter-box fade-up">
          <div>
            <img src="images/hotel.webp" alt="" />
          </div>
          <div className="counter-text pink-box">
            <h4>
              305 <span>(Residential) +</span> <br />2 <span>(Commercial)</span>
            </h4>
            <p>Plots</p>
          </div>
        </div>

        <div className="counter-box fade-up">
          <div className="counter-text">
            <h4>6</h4>
            <p>Parks</p>
          </div>
          <div>
            <img src="images/islands.webp" alt="" />
          </div>
        </div>

        <div className="counter-box fade-up">
          <div className="counter-text green-box">
            <h4>10%</h4>
            <p>Open Space</p>
          </div>
          <div>
            <img src="images/acres.webp" alt="" />
          </div>
        </div>

        <div className="counter-box fade-up">
          <div className="counter-text">
            <h4>~23.5</h4>
            <p>Acres</p>
          </div>
          <div>
            <img src="images/swimming-pool-top-view.webp" alt="" />
          </div>
        </div>

        <div className="counter-box fade-up">
          <div>
            <img src="images/club-day.webp" alt="" />
          </div>
          <div className="counter-text brown-box">
            <h4>30+</h4>
            <p>Amenities</p>
          </div>
        </div>
      </div>
    </section>
  )
}
