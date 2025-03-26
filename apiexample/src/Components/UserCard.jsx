import React, { useState, useRef } from "react";
import "../Style/UserCard.css";
import Modal from "react-modal";
import "primeicons/primeicons.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function UserCard({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ShowCopyPopup, SetShowCopyPopup] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const latitude = user?.address?.geo?.lat;
  const longitude = user?.address?.geo?.lng;

  // Reference to the copy button for positioning the popup
  const copyButtonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const handleCopy = () => {
    const userDetails = `
        Name: ${user.name}
        Username: ${user.username}
        ID: ${user.id}
        Email: ${user.email}
        Address: ${user.address.street}, ${user.address.suite}, ${
      user.address.zipcode
    }, ${user.address.city}
        Location: Latitude: ${latitude || "N/A"}, Longitude: ${
      longitude || "N/A"
    }
        Phone: ${user.phone}
        Website: ${user.website}
        Company: ${user.company.name}, ${user.company.catchPhrase}, ${
      user.company.bs
    }
      `;

    navigator.clipboard
      .writeText(userDetails)
      .then(() => {
        setIsCopied(true);
        SetShowCopyPopup(false);
        setTimeout(() => {
          setIsCopied(false);
        }, 600);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleMouseEnter = () => {
    const rect = copyButtonRef.current.getBoundingClientRect();
    setButtonPosition({ top: rect.top, left: rect.left });
    SetShowCopyPopup(true);
  };

  const handleMouseLeave = () => {
    SetShowCopyPopup(false);
  };

  return (
    <div className="user-card">
      <h3>
        Name : <br/> {user.name}
        <button onClick={openModal} className="LinktoContent">
          #
        </button>
      </h3>
      <p>
        <strong>Username : </strong>
        {user.username}
      </p>
      <p>
        Please click the link adjacent to the name of the user {user.name}, to
        access all the information about them. <br /> Thank You!!
      </p>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="User Details"
        className="ModalContent"
        overlayClassName="ModalOverlay"
      >
        <h2>{user.name}</h2>
        <button
          className="CopyButton"
          ref={copyButtonRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCopy}
        >
          <i className="pi pi-copy" style={{ display: "inline" }}></i>
        </button>

        {/* Hover popup when mouse enters the copy button */}
        {ShowCopyPopup && (
          <div
            className="copy-popup"
            style={{
              top: buttonPosition.top - 30,
              left: buttonPosition.left - 10,
            }}
          >
            Copy Text
          </div>
        )}

        {isCopied && (
          <div
            className="copy-popup"
            style={{
              top: buttonPosition.top - 30,
              left: buttonPosition.left - 10,
            }}
          >
            Copied!
          </div>
        )}

        <p>
          <strong>ID : </strong> {user.id}
        </p>
        <p>
          <strong>Username : </strong> {user.username}
        </p>
        <p>
          <strong>Email : </strong> {user.email}
        </p>
        <p>
          <strong>Address : </strong> <br />
          &nbsp;{user.address.street} ,{user.address.suite}, <br />
          &nbsp;{user.address.zipcode} ,{user.address.city}.
        </p>
        <p>
          <strong>Location : </strong> <br />
          &nbsp;<strong>Latitude : </strong> ( {latitude || "N/A"} ) <br />
          &nbsp;<strong>Longitude : </strong> ( {longitude || "N/A"} )
        </p>
        <p>
          <strong>Phone : </strong> {user.phone}
        </p>
        <p className="WebsiteLink1">
          <strong>Website : </strong>
        </p>
        <p className="WebsiteLink">
          <a
            href={`http://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </a>
        </p>
        <p>
          <strong>Company : </strong> <br />
          &nbsp;{user.company.name} <br />
          &nbsp;{user.company.catchPhrase} <br />
          &nbsp;{user.company.bs}
        </p>
        <button onClick={closeModal} className="CloseModalBtn">
          Close
        </button>
      </Modal>
    </div>
  );
}

export default UserCard;
