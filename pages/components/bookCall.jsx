import React, { useState } from "react";

const CTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore body scrolling
  };

  return (
    <section style={styles.container}>
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <span style={styles.icon}>🚀</span>
          <span style={styles.icon}>💡</span>
          <span style={styles.icon}>�Star</span>
        </div>

        <h2 style={styles.heading}>Unlock Your Extraordinary Potential!</h2>

        <p style={styles.subheading}>
          Get ready to break through barriers, crush your goals, and design the
          life you've always dreamed of!
        </p>

        <div style={styles.benefitsContainer}>
          <div style={styles.benefitItem}>
            <span style={styles.checkmark}>✓</span>
            Personalized Success Roadmap
          </div>
          <div style={styles.benefitItem}>
            <span style={styles.checkmark}>✓</span>
            Breakthrough Strategies
          </div>
          <div style={styles.benefitItem}>
            <span style={styles.checkmark}>✓</span>
            Limitless Potential Unleashed
          </div>
        </div>

        <div style={styles.callToActionWrapper}>
          <button
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={openModal}
          >
            {isHovered
              ? "YES, TRANSFORM MY LIFE!"
              : "Book Your Breakthrough Session"}
          </button>
        </div>

        <p style={styles.guarantee}>
          🔒 100% Confidential | Limited Spots Available
        </p>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal}>
            <h2 style={styles.modalHeading}>📞 Book Your Free Session</h2>
            <p style={styles.modalText}>
              Ready to take the next step? Send me a message on WhatsApp to book your session!
            </p>
            <button
              style={styles.whatsappButton}
              onClick={() => {
                const phoneNumber = "96181107752";
                const message = encodeURIComponent(
                  "Hello! I'm interested in booking a breakthrough session."
                );
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
                window.open(whatsappURL, "_blank");
              }}
            >
              📲 Message Me on WhatsApp
            </button>
            <button style={styles.closeButton} onClick={closeModal}>
              ❌ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const styles = {
  container: {
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    padding: "40px 20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 123, 255, 0.15)",
    maxWidth: "600px",
    margin: "50px auto",
    fontFamily: "'Montserrat', sans-serif",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "15px",
  },
  icon: {
    fontSize: "40px",
    transform: "rotate(0deg)",
    transition: "transform 0.3s ease",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#2c3e50",
    marginBottom: "15px",
    background: "linear-gradient(45deg, #007bff, #6f42c1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: "1.2",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  benefitsContainer: {
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "25px",
  },
  benefitItem: {
    fontSize: "16px",
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    padding: "12px 0",
    display: "flex",
    alignItems: "center",
    width: "270px",
    margin: "0 auto",
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  checkmark: {
    color: "#28a745",
    marginRight: "10px",
    marginLeft: "10px",
    fontSize: "20px",
  },
  callToActionWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "15px 30px",
    fontSize: "18px",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "700",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
  },
  buttonHover: {
    backgroundColor: "#6f42c1",
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(111, 66, 193, 0.4)",
  },
  guarantee: {
    fontSize: "14px",
    color: "#6c757d",
    marginTop: "15px",
    fontWeight: "500",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)", // Add blur effect
    WebkitBackdropFilter: "blur(10px)", // For Safari support
    zIndex: 1000,
    overflowY: "hidden", // Prevent vertical scrolling
  },
  modal: {
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    padding: "25px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    position: "relative",
    zIndex: 1001,
  },
  modalHeading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  modalText: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    color: "white",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
    border: "none",
  },
  closeButton: {
    backgroundColor: "#e63946",
    color: "white",
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
};

export default CTA;