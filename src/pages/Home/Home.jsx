import React, { Component } from 'react';
import './Home.scss';
import { bitcoinService } from '../../services/bitcoinService';
import { LoadingCmp } from '../../cmps/LoadingCmp/LoadingCmp';
import { MoveList } from '../../cmps/MoveList/MoveList';
import { connect } from 'react-redux';

export class _Home extends Component {
  state = { rate: null };
  async componentDidMount() {
    const rate = await bitcoinService.getRate(1);
    this.setState({ rate });
    if (!this.props.loggedUser) this.props.history.push('/login');
  }
  render() {
    const { loggedUser } = this.props;
    const { rate } = this.state;
    if (!loggedUser || !rate) return <LoadingCmp />;
    return (
      <section className='home-page flex col'>
        <section className='user-wrapper'>
          <section className='user-details flex col space-between'>
            <h4 className='user-title'>Welcome ,{loggedUser.name}</h4>
            <section className='info flex space-around'>
              <h3>
                <i className='fas fa-coins'></i>Coins: {loggedUser.coins}
              </h3>
              <h3>
                <i className='far fa-heart-rate'></i>BTC(1$): {rate}
              </h3>
              <h3>
                <i className='fas fa-sync'></i>Total Transactions: {loggedUser.moves.length}
              </h3>
            </section>
          </section>
        </section>
        <MoveList moves={loggedUser.moves} />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedUser: state.userReducer.loggedUser,
});

export const Home = connect(mapStateToProps, null)(_Home);
