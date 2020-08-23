import React, { Component } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { login, signup } from '../../actions/usersActions';

export class _Login extends Component {
  state = {
    name: null,
    phone: null,
    email: null,
    userToLog: null,
    errorMsg: null,
  };

  handleChange = ({ target }) => {
    const [value, field] = [target.value, target.name];
    this.setState({ [field]: value });
  };

  login = async (ev) => {
    ev.preventDefault();
    await this.props.login(this.state.userToLog);
    if (this.props.loggedUser) {
      this.props.history.push('/');
    } else {
      this.setState((prevState) => ({ ...prevState, errorMsg: 'Invaild Username' }));
    }
  };
  signup = async (ev) => {
    ev.preventDefault();
    const { name, email, phone } = this.state;
    if (!name || !email || !phone) return;
    await this.props.signup({ name, email, phone });
    this.props.login(name);
    this.props.history.push('/');
  };
  render() {
    const { errorMsg } = this.state;
    return (
      <section className='auth-page flex justify-center '>
        <section className='signup-form flex col'>
          <h4 className='form-title'>Sign Up</h4>
          <form className='flex col'>
            <input type='text' placeholder='Username' name='name' onChange={this.handleChange} />
            <input type='text' placeholder='Email' name='email' onChange={this.handleChange} />
            <input type='text' placeholder='Phone' name='phone' onChange={this.handleChange} />
            <button onClick={this.signup}>Sign Up</button>
          </form>
        </section>
        <span className='seperator'>OR</span>
        <section className='login-form '>
          <h4 className='form-title'>Login</h4>
          <form className='flex col'>
            <input type='text' placeholder='Username' name='userToLog' onChange={this.handleChange} />
            <button onClick={this.login}>Login</button>
          </form>
          {errorMsg && <h4 className='error'>{this.errorMsg}</h4>}
        </section>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedUser: state.userReducer.loggedUser,
});
const mapDispatchToProps = {
  login,
  signup,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
