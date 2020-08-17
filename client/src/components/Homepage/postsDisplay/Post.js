import React from 'react';
import './Post.css';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function Post({ data }) {
  console.log(data)
  if (!data.imageUrl) {
    data.imageUrl = 'https://748073e22e8db794416a-cc51ef6b37841580002827d4d94d19b6.ssl.cf3.rackcdn.com/not-found.png'
  }

  return (
    <div className="card post-container" style={{ width: '100%' }}>
      <img src={data.imageUrl} className="card-img-top" alt="err" />
      <div className="img-overlay card-img-top" >
        <button className="save-button-on-img"><BookmarkIcon /></button>
      </div>
      <div className="card-body">
        <h5 className="card-title">{data.price}</h5>
        <p className="card-text">{data.title}</p>
        <p className="location">{data.location}</p>
      </div>
    </div>
  )
}

export default Post;