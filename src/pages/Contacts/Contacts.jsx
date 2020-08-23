import React, { Component } from 'react';
import { ContactsList } from '../../cmps/ContactsList/ContactsList';
import { LoadingCmp } from '../../cmps/LoadingCmp/LoadingCmp';
import { ContactsFilter } from '../../cmps/ContactsFilter/ContactsFilter';
import { loadContacts, setFilter } from '../../actions/contactsActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Contacts.scss';

export class _Contacts extends Component {
  async componentDidMount() {
    await this.props.loadContacts();
  }
  onSetFilter = async ({ filterBy }) => {
    this.props.setFilter(filterBy);
    await this.props.loadContacts();
  };
  render() {
    const { contacts } = this.props;
    if (!contacts) return <LoadingCmp />;
    return (
      <section className='contacts-page flex col-layout'>
        {contacts && (
          <Link to='/contacts/edit'>
            <button>
              <i className='fas fa-plus'></i>
            </button>
          </Link>
        )}
        {contacts && <ContactsFilter onSetFilter={this.onSetFilter} />}
        {contacts && <ContactsList contacts={contacts} />}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactReducer.contacts,
    filterBy: state.contactReducer.filterBy,
  };
};

const mapDispatchToProps = {
  loadContacts,
  setFilter,
};

export const Contacts = connect(mapStateToProps, mapDispatchToProps)(_Contacts);
