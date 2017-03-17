import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.sass';

const TradeRequest = ({itemName, itemPic, reqMaker, docId, reqStatus, acceptRequest, declineRequest, itemId }) => {
    let wrapper;
    return (
      <div className="trWrapper" ref={node => wrapper = node}>
        <div className="upper">
          <Link to={`/item/${itemId}`}>
            <img className="userImg" src={itemPic}/>
          </Link>
          <h4>
            <span className="name">{reqMaker}</span> wants to trade with your item- <Link to={`/item/${itemId}`}>{itemName}</Link>
          </h4>
        </div>
        <div className="tradeBtnWrapper lower">
          <button className="acceptBtn normalBtn">Accept</button>
          <button className="declineBtn normalBtn"
            onClick={() => {
              wrapper.classList.add('blacklisted');
              document.querySelector('.acceptBtn').classList.add('disabled');
              document.querySelector('.declineBtn').classList.add('disabled');
              declineRequest(itemId, docId, wrapper);
            }}
          >
            Decline
          </button>
        </div>
      </div>
    );

};

TradeRequest.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  docId: PropTypes.string.isRequired,
  itemPic: PropTypes.string.isRequired,
  reqMaker: PropTypes.string.isRequired,
  reqStatus: PropTypes.string.isRequired,
  declineRequest: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired
};

export default TradeRequest;
