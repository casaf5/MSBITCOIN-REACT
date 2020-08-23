import React, { Component } from 'react';
import { contactService } from '../../services/contactService';
import { LoadingCmp } from '../../cmps/LoadingCmp/LoadingCmp';
import { Link } from 'react-router-dom';
import { saveContact, removeContact } from '../../actions/contactsActions';
import { connect } from 'react-redux';
import './ContactEdit.scss';

export class _ContactEdit extends Component {
  state = { contact: null };
  componentDidMount() {
    this.loadContact();
  }
  async loadContact() {
    const { id } = this.props.match.params;
    const contact = id ? await contactService.getContactById(id) : await contactService.getEmptyContact();
    this.setState({ contact });
  }
  handleChange = ({ target }) => {
    const [field, value] = [target.name, target.value];
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }));
  };
  onSubmitChanges = async (ev) => {
    ev.preventDefault();
    await this.props.saveContact({ ...this.state.contact });
    this.props.history.push('/contacts');
  };
  removeContact = async () => {
    await this.props.removeContact(this.state.contact._id);
    this.props.history.push('/contacts');
  };
  get title() {
    const { contact } = this.state;
    return contact._id ? 'Edit Contact' : 'Add New Contact';
  }
  render() {
    if (!this.state.contact) return <LoadingCmp />;
    const { _id, name, email, phone } = this.state.contact;
    return (
      <section className='edit-page'>
        <form onSubmit={this.onSubmitChanges} className='flex col'>
          <i className='remove fas fa-trash-alt' onClick={this.removeContact}></i>
          <h3>{this.title}</h3>
          <Link to='/contacts'>
            <i className='back fas fa-arrow-circle-left'></i>
          </Link>
          <img src={`https://robohash.org/${_id}?set=set5`} alt='profile-pic' />
          <input type='text' name='name' placeholder='Name' value={name} onChange={this.handleChange} />
          <input type='text' name='email' placeholder='Email@example.com' value={email} onChange={this.handleChange} />
          <input type='text' name='phone' placeholder='Phone' value={phone} onChange={this.handleChange} />
          <button>Submit</button>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = {
  saveContact,
  removeContact,
};

export const ContactEdit = connect(null, mapDispatchToProps)(_ContactEdit);
