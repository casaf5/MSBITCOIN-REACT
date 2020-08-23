import React from "react";
// import "./ContactsList.scss";
import { ContactPreview } from "../ContactPreview/ContactPreview";

export function ContactsList(props) {
  return (
    <section className="contacts-list flex wrap justify-center">
      {props.contacts.map((contact) => (
        <ContactPreview key={contact._id} contact={contact} />
      ))}
    </section>
  );
}
