import React, { useEffect, useState } from "react";
import useAPI from "../../api/useAPI";

export default function UserFavorite() {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-restricted-syntax
  console.log(data);
  const api = useAPI();

  const getVideoData = async () => {
    await api
      .get("videos")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <div style={{ color: "white" }}>
      <p>VIDOES FAVORITES</p>
      <div>
        <p>name : </p>
        <p>description: </p>
        <p>lien :</p>
      </div>
    </div>
  );
}
