import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes';
import TopBar from 'components/topbar/topbar';
import { CurrentUserProvider } from 'contexts/currentUser';
import CurrentUserChecker from 'components/currentUserChecker/currentUserChecker';


const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <BrowserRouter>
          <TopBar />
          <Routes />
        </BrowserRouter>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
