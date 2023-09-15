import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";

import { useSelector } from "react-redux";
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import PermMediaSharpIcon from '@mui/icons-material/PermMediaSharp';

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [fileType, setFileType] = useState('');
  const [msg, setmsg] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith('image/')) {
          setSelectedImage(reader.result);
          setImage(file);
          setFileType('image');
          // setmsg(file.name);
          setVideo(null);
          setSelectedVideo(null);
        } else if (file.type.startsWith('video/')) {
          setSelectedVideo(reader.result);
          setVideo(file);
          setFileType('video');
          // setmsg(file.name);
          setImage(null);
          setSelectedImage(null);
        } else {
          setmsg('unsupported file type');
          event.target = null;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  
  const uploadFile = () => {
    if (!fileType) return;
    const fileRef = ref(storage, `${fileType}/${currentUser._id + new Date().toString()}`);
    uploadBytes(fileRef, fileType=='image'?image:video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log('image uploaded, url: ', url);
        setFileURL(url);
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!tweetText && !image && !video){
      console.log('nothing selected');
      return;
    } 
    try {
      uploadFile();
      console.log('file url',fileURL);
      const submitTweet = axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
        url: fileURL,
        type: fileType,
      }, {
        withCredentials: true,
      });
      console.log('after file url', fileURL);
      // window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-120px)] scrollbar-hidden">
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={300}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        {/* <div className="flex-inline" style={{maxWidth:'60%', border:'1px solid'}}> */}

        <label htmlFor="media" className="cursor-pointer mr-4">
          <PermMediaSharpIcon fontSize="small"/>
        </label>
        <input
          id='media'
          type="file"
          style={{ display: 'none' }}
          className="display-none bg-transparent border border-slate-500 rounded p-2"
          accept="image/*, video/*"
          onChange={handleFileChange}
        />
          {msg !=='' && <div className="m-2">{msg}</div>}
          {/* </div> */}
          
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <div>
        {selectedImage && (<div className="flex justify-center m-2">
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>)}
        {selectedVideo && (
          <div className="m-2">
            <video controls width="100%" height="auto">
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
        <TimelineTweet />

    </div>
  );
};

export default MainTweet;
