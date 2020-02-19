import React, { useContext } from 'react';
import { CurrentUserContext } from 'contexts/currentUser';
import { NavLink } from 'react-router-dom';

const FeedToggler = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext)
  const {isLoggedIn} = currentUserState

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {isLoggedIn && (
          <li className="nav-item">
            <NavLink to="/feed" className="nav-link">
              Your Feed
        </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to="/" className="nav-link" exact>
            Global Feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagName}`} className="nav-link">
              <i className="ion-pound" />
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FeedToggler;
