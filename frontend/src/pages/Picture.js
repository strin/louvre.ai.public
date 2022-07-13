import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Picture() {
  const [searchParams, _] = useSearchParams();
  const pictureId = searchParams.get("id");
  console.log("picture id", pictureId);
  const localStorageKey = "museum-pic-" + pictureId;
  const [pictureURL, setPictureURL] = useState(
    localStorage.getItem(localStorageKey)
  );

  useEffect(() => {
    console.log("adding event");
    window.addEventListener("storage", () => {
      console.log("storage changed");
      const _pictureURL = localStorage.getItem(localStorageKey);
      if (_pictureURL) {
        setPictureURL(_pictureURL);
      }
      console.log("Picture URL changed for", pictureId, _pictureURL);
    });
  }, []);
  return <img src={pictureURL} />;
}

export default Picture;
