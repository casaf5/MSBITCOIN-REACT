import React from "react";
import "./ContactPreview.scss";
import { Link } from "react-router-dom";

export function ContactPreview(props) {
  const { _id, name } = props.contact;
  return (
    <section className="contact-preview flex col">
      <Link to={`contacts/details/${_id}`}>
        <img src={`https://robohash.org/${_id}?set=set5`} alt="profile-pic" />
        <h3 className="contact-name">{name}</h3>
      </Link>
      <Link to={`contacts/edit/${_id}`}>
        <i className="fas fa-user-edit" title="Edit User"></i>
      </Link>
    </section>
  );
}
