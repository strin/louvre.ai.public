import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { get_pic_url, set_pic_url } from "../state";

const ImageContainer = styled.div`
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

function Picture() {
  const [searchParams, _] = useSearchParams();
  const pictureId = searchParams.get("id");
  console.log("picture id", pictureId);
  const [pictureURL, setPictureURL] = useState("");

  useEffect(() => {
    window.addEventListener("click", () => {
      const elem = document.documentElement;
      elem.requestFullscreen();
    });
    const fetchPictureURL = async () => {
      const _pictureURL = await get_pic_url(pictureId);
      console.log("pictureURL for id", pictureId, _pictureURL);
      if (_pictureURL) {
        setPictureURL(_pictureURL);
      }
    };
    window.setInterval(fetchPictureURL, 3000);
  }, []);
  return (
    <div>
      <ImageContainer url={pictureURL} />
    </div>
  );
}

export default Picture;
