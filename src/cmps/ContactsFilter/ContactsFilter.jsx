import React, { Component } from "react";
import "./ContactsFilter.scss";

export class ContactsFilter extends Component {
  state = { filterBy: null };
  setFilter = ({ target }) => {
    const filterBy = target.value;
    this.setState({ filterBy },  () => {
       this.props.onSetFilter( {...this.state });
    });
  };

  render() {
    return (
      <section className="contacts-filter">
        <input type="text" placeholder="Search..." onChange={this.setFilter} />
      </section>
    );
  }
}
