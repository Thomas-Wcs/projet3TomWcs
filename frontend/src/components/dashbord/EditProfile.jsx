import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAPI from "../../api/useAPI";

export default function EditProfile() {
  const { state } = useLocation();

  const api = useAPI();
  // const handleEditableChange = (e, key) => {
  //   setEditableContent({ ...editableContent, [key]: e.target.textContent });
  // };

  const [editableContent, setEditableContent] = useState(state);
  // console.log(editableContent);

  const [modifiedKeys, setModifiedKeys] = useState([]);
  // console.log(modifiedKeys);

  const handleEditableChange = (e, key) => {
    setEditableContent({ ...editableContent, [key]: e.target.textContent });
    if (!modifiedKeys.includes(key)) {
      setModifiedKeys([...modifiedKeys, key]);
    }
  };

  const editUser = async () => {
    try {
      const modifiedValues = {};
      modifiedKeys.forEach((key) => {
        modifiedValues[key] = editableContent[key];
      });
      // console.log(modifiedValues);
      await api.put(`users/${state.userInfo.id}`, modifiedValues);
    } catch (error) {
      console.error(error);
    }
  };

  // const editUser = async () => {
  //   try {
  //     const value = [
  //       editableContent.userInfo.name,
  //       editableContent.userInfo.firstname,
  //     ];
  //     await api.put(`users/${state.userInfo.id}`, value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="user-main-profile">
      <div className="user-adresse-information">
        <h3>Info Utilisateur</h3>
        <h4>FistName</h4>
        <div />
        {/* <p>
          <input
            type="text"
            style={{ backgroundColor: "white", color: "black" }}
            value={editableContent.userInfo.firstname}
            onChange={(e) =>
              setEditableContent({
                ...editableContent,
                userInfo: {
                  ...editableContent.userInfo,
                  firstname: e.target.value,
                },
              })
            }
          />
        </p> */}
        <h4>Name</h4>
        <p>
          <input
            type="text"
            style={{ backgroundColor: "white", color: "black" }}
            value={editableContent.userInfo.name}
            onChange={(e) =>
              setEditableContent({
                ...editableContent,
                userInfo: { ...editableContent.userInfo, name: e.target.value },
              })
            }
          />
        </p>

        <h4>Email </h4>
        <p
          contentEditable
          onInput={(e) => handleEditableChange(e, "userInfo.email")}
        >
          {state.userInfo.email}
        </p>
        <h4>Premium </h4>
        <p>
          {state.userInfo.isPremium === 1
            ? "Utilisateur Premium"
            : "Utilisateur Standart"}
        </p>
      </div>

      <button type="button" style={{ color: "white" }} onClick={editUser}>
        VALIDER{" "}
      </button>
    </div>
  );
}

EditProfile.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    firstname: PropTypes.string,
    email: PropTypes.string,
  }),
};
EditProfile.defaultProps = {
  userInfo: {
    name: "",
    firstname: "",
    email: "",
  },
};
