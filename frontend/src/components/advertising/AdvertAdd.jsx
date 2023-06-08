import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { Link } from "react-router-dom";

import useAPI from "../../api/useAPI";

function AdvertAdd() {
  //   const navigate = useNavigate();
  //   const api = useAPI();
  //   const [error, setError] = useState(false);
  //   const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      <Link to="/AdvertManagementWindow">Editer les publicités</Link>
      <p>Coucou</p>
    </div>
  );
}

export default AdvertAdd;
