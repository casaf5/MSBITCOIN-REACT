import './AppHeader.scss';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/usersActions';

class _AppHeader extends Component {
  state = { loggedUser: null };
  async componentDidMount() {
  }
  logout = () => {
    this.props.logout();
    this.props.history.push('/login');
  };

  render() {
    const { loggedUser } = this.props;
    return (
      <header className='flex space-between'>
        <section className='logo '>
          <img src={`images/bitcoin.svg`} alt='logo' />
        </section>
        <nav>
          <ul className='flex clean-list'>
            <Link to='/'>
              <li>Home</li>
            </Link>
            <Link to='/contacts'>
              <li>Contacts</li>
            </Link>
            <Link to='/statistics'>
              <li>Statistics</li>
            </Link>
          </ul>
          <Link to='/login'>{!loggedUser && <button className='login-btn'>Login</button>}</Link>
          {loggedUser && (
            <button className='logout-btn' onClick={this.logout}>
              Logout
            </button>
          )}
        </nav>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedUser: state.userReducer.loggedUser,
});

const mapDispatchToProps = {
  logout,
};

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader));
