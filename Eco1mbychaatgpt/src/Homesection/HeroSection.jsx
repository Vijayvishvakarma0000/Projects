import React from "react";

function HeroSection() {
  // Inline styles
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px 60px",
    backgroundColor: "#f5f5f5",
    animation: "fadeIn 1.5s ease forwards",
  };

  const textContainer = {
    maxWidth: "50%",
  };

  const headingStyle = {
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#222",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const subHeading = {
    fontSize: "20px",
    marginBottom: "30px",
    color: "#555",
    lineHeight: "1.5",
  };

  const btnStyle = {
    padding: "12px 28px",
    fontSize: "18px",
    color: "white",
    backgroundColor: "#ff5722",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(255, 87, 34, 0.4)",
    transition: "background-color 0.3s ease",
  };

  const btnHover = (e) => {
    e.target.style.backgroundColor = "#e64a19";
  };

  const btnLeave = (e) => {
    e.target.style.backgroundColor = "#ff5722";
  };

  const imgStyle = {
    maxWidth: "45%",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "slideInRight 1.5s ease forwards",
  };

  // Keyframes for animation (fadeIn and slideInRight)
  const styleSheet = `
    @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    @keyframes slideInRight {
      from {opacity: 0; transform: translateX(50px);}
      to {opacity: 1; transform: translateX(0);}
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>

      <section style={containerStyle}>
        <div style={textContainer}>
          <h1 style={headingStyle}>Upgrade Your Style Today</h1>
          <p style={subHeading}>
            Discover the latest trends in fashion and get your perfect look
            with our exclusive collection of men's and women's apparel.
          </p>
          <button
            style={btnStyle}
            onMouseEnter={btnHover}
            onMouseLeave={btnLeave}
          >
            Shop Now
          </button>
        </div>

        <img
          style={imgStyle}
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
          alt="Fashion Model"
        />
      </section>
    </>
  );
}

export default HeroSection;
