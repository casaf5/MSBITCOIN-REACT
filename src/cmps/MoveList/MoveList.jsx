import React from 'react';
import './MoveList.scss';

export function MoveList(props) {
  const { moves } = props;
  return (
    <section className='move-list'>
      <ul>
        {moves.map((move, idx) => {
          return (
            <li key={idx}>
              <h6 className={'col-layout ' + move.status}>
                <i className='far fa-arrow-alt-circle-up'></i>
                <span>{move.status}</span>
              </h6>
              <h3>
                <i className='fas fa-user'></i> {move.toName}
              </h3>
              <h3>
                <i className='fas fa-clock'></i>
                {move.completedAt}
              </h3>
              <h3>
                <i className='fab fa-bitcoin'></i> {move.amount}
              </h3>
              <h3 className='rate'>
                <i className='far fa-heart-rate'></i>
                {move.rateAtTransfer}
              </h3>
            </li>
          );
        })}
      </ul>
    
    </section>
  );
}
