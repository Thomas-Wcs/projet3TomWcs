import PropTypes from "prop-types";

export default function UserPannel({ users }) {
  return (
    <>
      <div className="cupcake-name">{users.name}</div>
      <div className="cupcake-name">{users.mdp}</div>
      <div className="cupcake-name">{users.email}</div>
    </>
  );
}

UserPannel.propTypes = {
  users: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mdp: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

UserPannel.defaultProps = {
  users: {
    name: "Toto",
    mdr: "mdp",
    email: "email",
  },
};
