import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalFeed from 'pages/globalFeed/globalFeed';
import Article from 'pages/article/article';
import Auth from 'pages/auth/auth';
import TagFeed from './components/tagFeed/tagFeed';
import YourFeed from './pages/yourFeed/yourFeed';
import CreateArticle from './pages/createArticle/createArticle';
import EditArticle from './components/editArticle/editArticle';
import Settings from './components/settings/settings';
import UserProfile from './pages/userProfile/userProfile';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={GlobalFeed} />
      <Route path="/profiles/:slug" component={UserProfile} />
      <Route path="/profiles/:slug/favorites" component={UserProfile} />
      <Route path="/settings" component={Settings} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/login" component={Auth} />
      <Route path="/register" component={Auth} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  )
}

export default Routes;