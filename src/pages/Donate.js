import React, { useState } from 'react';

const Donate = () => {
  //const [donationPhotos, setDonationPhotos] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [donations, setDonations] = useState('');
  const [address, setAddress] = useState('');
  const [whereToDonate, setWhereToDonate] = useState('');
  const [message, setMessage] = useState('');

  const handleDonationPhotoChange = (e) => {
    // Handle the change of donation photos here
    // Function to handle uploading and storing the donation photos
  };

  const handleDonorNameChange = (e) => {
    setDonorName(e.target.value);
  };

  const handleDonationsChange = (e) => {
    setDonations(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleWhereToDonateChange = (e) => {
    setWhereToDonate(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic for submitting the donation form
    // donationPhotos, donorName, donations, address, whereToDonate, and message to process the donation
    // Reset the form after submission
    //setDonationPhotos([]);
    setDonorName('');
    setDonations('');
    setAddress('');
    setWhereToDonate('');
    setMessage('');
  };

  return (
    <div className="donate">
      <h2>Donate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="donation-photos">Donation Photo/s</label>
          <input
            type="file"
            id="donation-photos"
            onChange={handleDonationPhotoChange}
            multiple
          />
        </div>
        <div className="form-group">
          <label htmlFor="donor-name">Donor</label>
          <input
            type="text"
            id="donor-name"
            value={donorName}
            onChange={handleDonorNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="donations">Donation/s</label>
          <input
            type="text"
            id="donations"
            value={donations}
            onChange={handleDonationsChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="where-to-donate">Where to Donate</label>
          <input
            type="text"
            id="where-to-donate"
            value={whereToDonate}
            onChange={handleWhereToDonateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
          ></textarea>
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donate;