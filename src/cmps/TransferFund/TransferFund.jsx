import React, { Component } from 'react';
import './TransferFund.scss';
import { MoveList } from '../../cmps/MoveList/MoveList';
import { connect } from 'react-redux';
import { transferCoins } from '../../actions/usersActions';

// import {}
const [SENT, RECIEVED] = ['Sent', 'Received'];

export class _TransferFund extends Component {
  state = { errorMsg: null, coinsAmount: null };
  handleChange = ({ target }) => {
    const coinsAmount = +target.value;
    this.setState({ coinsAmount });
  };
  onTransferCoins = async (ev) => {
    ev.preventDefault();
    const { contactName } = this.props;
    const { coinsAmount } = this.state;
    await this.props.transferCoins(SENT, contactName, coinsAmount);
  };
  get moves() {
    return [];
  }
  render() {
    const { errorMsg } = this.state;
    return (
      <section className='transfer flex col'>
        <form onSubmit={this.onTransferCoins} className='flex'>
          <input type='number' placeholder='Coins to Transfer' onChange={this.handleChange} name='coinsAmount' />
          <button>Transfer</button>
        </form>
        {errorMsg && <h3 className='error'>{{ errorMsg }}</h3>}
        <MoveList moves={this.moves} />
      </section>
    );
  }
}

const mapDispatchToProps = {
  transferCoins,
};

export const TransferFund = connect(null, mapDispatchToProps)(_TransferFund);
