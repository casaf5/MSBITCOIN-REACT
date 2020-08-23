import React, { Component } from 'react';
import './ContactDetails.scss';
import { LoadingCmp } from '../../cmps/LoadingCmp/LoadingCmp';
import { contactService } from '../../services/contactService';
import { TransferFund } from '../../cmps/TransferFund/TransferFund';
import { MoveList } from '../../cmps/MoveList/MoveList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class _ContactDetails extends Component {
  state = { contact: null };
  async componentDidMount() {
    await this.loadContact();
  }
  loadContact = async () => {
    const { id } = this.props.match.params;
    const contact = await contactService.getContactById(id);
    this.setState({ contact });
  };
  render() {
    const { contact } = this.state;
    if (!contact) return <LoadingCmp />;
    const { _id, name, email, phone } = contact;
    const { loggedUser } = this.props;
    return (
      <section className='contact-details flex col'>
        <img src={`https://robohash.org/${_id}?set=set5`} alt='profile-pic' />
        <section className='contact-actions flex'>
          <Link to='/contacts'>
            <i className='fas fa-arrow-circle-left'></i>
          </Link>
          <Link to={`/contacts/edit/${_id}`}>
            <i className='fas fa-user-edit' title='Edit User'></i>
          </Link>
        </section>
        <section className='details flex col-layout'>
          <h4> {name}</h4>
          <h4> {email}</h4>
          <h4> {phone}</h4>
        </section>
        <TransferFund contactName={name} />
        <MoveList moves={loggedUser.moves.filter((move) => move.toName === name)} />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUser: state.userReducer.loggedUser,
});

export const ContactDetails = connect(mapStateToProps, null)(_ContactDetails);
