import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import { CurrentUserContext } from 'contexts/currentUser';
import BackendErrorMessages from './components/backendErrorMessages';

const Auth = (props) => {

  const isLogin = props.match.path === '/login'
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
  const descriptionLink = isLogin ? '/register' : '/login'
  const apiUrl = isLogin ? '/users/login' : '/users'
  //------- state-------------//
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false);
  const [, dispatch] = useContext(CurrentUserContext)
  //------- state-------------//
  //------- customHooks------------//
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl)
  const [, setToken] = useLocalStorage('token')
  //------- customHooks------------//
  const user = isLogin ? { email, password } : { email, password, username }

  const handleSubmit = e => {
    e.preventDefault()

    doFetch({
      method: 'post',
      data: {
        user
      }
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token)
    setIsSuccessfullSubmit(true)
    dispatch({
      type: "SET_AUTHORIZED",
      payload: response.user
    })
  }, [response, setToken, dispatch])

  if (isSuccessfulSubmit) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center  pt-3">{pageTitle}</h1>
            <p className="text-center">
              <Link to={descriptionLink} className="text-dark">{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendsErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input type="text"
                      className="form-control form-control-lg"
                      placeholder="username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input type="email"
                    className="form-control form-control-lg"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="password"
                    className="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <div className="text-center">
                  <button
                    className="btn btn-lg btn-primary center-block"
                    type="submit"
                    disabled={isLoading}
                  >{pageTitle}</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;