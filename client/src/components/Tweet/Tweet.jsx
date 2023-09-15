import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";

import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState(null);

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();
  const [image, setImage] = useState('');

  // console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`http://localhost:8000/api/users/find/${tweet.userId}`);

        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  useEffect(()=>{
    if(userData !== null && userData.profilePicture.data !==null){
      // console.log(userProfile);
      const blob = new Blob([Int8Array.from(userData.profilePicture.data.data)], {type: userData.profilePicture.contentType });
      setImage(window.URL.createObjectURL(blob));
    }
  }, [userData]);

  const handleLike = async (e) => {
    e.preventDefault();

    try {
      const like = await axios.put(`http://localhost:8000/api/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      });

      if (location.includes("profile")) {
        const newData = await axios.get(`http://localhost:8000/api/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await axios.get(`http://localhost:8000/api/tweets/explore`);
        setData(newData.data);
      } else {
        const newData = await axios.get(`http://localhost:8000/api/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  function getFirstCharacterUpperCase(inputString) {
    if (typeof inputString === "string" && inputString.length > 0) {
      return inputString.charAt(0).toUpperCase();
    } else {
      return "";
    }
  }

  return (
    <div className='p-3 hover:bg-gray-100'>
      {/* <hr className="mb-2"></hr> */}
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}
            <div className="flex items-center">
              {image !== '' ?(
                <img
                  src={image}
                  alt="Profile Picture"
                  className="w-8 h-8 rounded-full mr-0 border-2 border-slate-800 border-solid"
                  style={{objectFit:'cover'}}
                />
              ):(
                <div className="w-8 h-8 bg-blue-500 border-2 border-slate-800 border-solid rounded-full flex items-center justify-center text-white font-bold text-lg mr-0" style={{fontSize:'15px'}}>
                  {getFirstCharacterUpperCase(userData.username)}
                </div>
              )}
            </div>
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>

            <span className="font-normal">@{userData.username}</span>
            <p> • {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length}
          </button>
          <div>
            {tweet.imageUrl && (<div className="flex justify-center m-2">
              <img src={tweet.imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>)}
            {tweet.videoUrl && (
              <div className="m-2">
                <video controls width="100%" height="auto">
                  <source src={tweet.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Tweet;
