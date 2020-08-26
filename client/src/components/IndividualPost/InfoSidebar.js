import React, { useState, useEffect } from 'react';
import './InfoSidebar.css';
import PersonIcon from '@material-ui/icons/Person';

function InfoSidebar({ data }) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data.description.length === 0) return

    let str = data.description.substring(0, 300) + "..."
    setDescription(str)

  }, [data.description]);

  const croppingDescription = () => {
    console.log(description.length)
    if (description.length > 304) {
      let str = data.description.substring(0, 300) + "..."
      setDescription(str)
    } else {
      setDescription(data.description);
    }
  }

  return (
    <div className="info-sidebar-container">
      <h3 style={{ marginBottom: '2px' }}>{data.title}</h3>
      <p style={{ fontSize: '17px', marginBottom: '0' }}>{data.price} €</p>
      <small>{data.category[0]}</small>
      <hr></hr>
      {data.description ? (
        <>
          <h5>Description</h5>
          {description.length > 304 ? (
            <small style={{ textAlign: 'start' }} className="mb-2 ml-1">{description} <div className="description-button" onClick={e => croppingDescription()}>Less</div></small>
          ) : (
              <small style={{ textAlign: 'start' }} className="mb-2 ml-1">{description} <div className="description-button" onClick={e => croppingDescription()}>More</div></small>
            )}
        </>
      ) : null}
      <p style={{ fontWeight: '600', marginBottom: '0' }}>{data.location}</p>
      <hr></hr>
      <div className="user-display">
        {data.user.profileImageUrl ? (
          <img src={data.user.profileImageUrl} alt="err" />
        ) : (
            <div className="profile-image-container">
              <PersonIcon />
            </div>
          )}
        <p>{data.user.username}</p>
      </div>
      <hr></hr>
    </div>
  )
}

export default InfoSidebar
