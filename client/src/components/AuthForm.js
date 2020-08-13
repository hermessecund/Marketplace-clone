import React, { useState, useEffect } from 'react';
import './AuthForm.css';
import IsEmail from 'validator/lib/isEmail';
import axios from 'axios';
import { setCurrentUser } from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_USER } from '../store/actionTypes';

function AuthForm(props) {

  const [formData, setFormData] = useState({});
  const [errMessages, setErrMessages] = useState({});
  const [errOutline, setErrOutline] = useState({})
  const [takenData, setTakenData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = await axios.get('/api/auth/otherRegisterData');
        setTakenData(results.data);
      } catch (error) {
        console.log(error, 'error')
      }
    }

    setFormData({ email: '', password: '' });
    setErrOutline({});
    setErrMessages({});
    fetchData();
  }, [props.signup]);



  const passwordsDontMach = () => {
    setErrMessages({ ...errMessages, password: "Passwords don't match", repeatPassword: "Passwords don't match" });
    setErrOutline({ ...errOutline, password: 'is-invalid', repeatPassword: 'is-invalid' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (props.signup) {
      if (formData.password !== formData.repeatPassword) return passwordsDontMach();
      data = formData;
      setFormData({ ...formData, email: '' })
    } else {
      data = {
        email: formData.email,
        password: formData.password
      }
    }
    console.log(data);
    setFormData({ ...formData, username: '', password: '', repeatPassword: '', imageUrl: '' });
    setErrOutline({});
    setErrMessages({});

    if (props.signup) {
      signingupUser(data);
    } else {
      loginginUser(data);
    }
  }

  const signingupUser = async (data) => {
    try {
      const user = await axios.post('/api/auth/signup', data);
      console.log(user);
      dispatch({
        type: SET_CURRENT_USER,
        user: user.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  const loginginUser = async (data) => {
    try {
      const user = await axios.post('/api/auth/signin', data);
      console.log(user.data)
      dispatch({
        type: SET_CURRENT_USER,
        user: user.data
      })
    } catch (error) {
      console.log(error)
    }

  }

  const emailOnChange = (e) => {
    let email = e.target.value
    setFormData({ ...formData, email: e.target.value });

    if (!IsEmail(email) && email) {
      setErrMessages({ ...errMessages, email: 'This email is not valid' });
      setErrOutline({ ...errOutline, email: 'is-invalid' });
      return
    } else if (IsEmail(email)) {
      let isTaken = takenData.emails.filter((val) => val === email).length > 0;
      if (isTaken && props.signup) {
        setErrMessages({ ...errMessages, email: 'This email is already taken' });
        setErrOutline({ ...errOutline, email: 'is-invalid' });
        return
      }
      setErrMessages({ ...errMessages, email: '' });
      setErrOutline({ ...errOutline, email: 'is-valid' });
      return
    }
    setErrMessages({ ...setErrMessages, email: '' });
    setErrOutline({ ...errOutline, email: '' });
  }

  const changingRepeatPasswords = (e) => {
    let pass = e.target.value;
    setFormData({ ...formData, repeatPassword: e.target.value });
    if (pass === '') {
      setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
      setErrOutline({ ...errOutline, password: '', repeatPassword: '' });
      return
    }
    if (formData.password === pass) {
      setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
      setErrOutline({ ...errOutline, password: 'is-valid', repeatPassword: 'is-valid' });
      return
    }
    passwordsDontMach();
  }

  const changingPassword = (e) => {
    setFormData({ ...formData, password: e.target.value, repeatPassword: '' });
    setErrMessages({ ...errMessages, password: '', repeatPassword: '' });
    setErrOutline({ ...errOutline, password: '', repeatPassword: '' });
  }

  const onChangeUsername = (e) => {
    let username = e.target.value;
    setFormData({ ...formData, username: e.target.value })
    if (username === '') {
      setErrMessages({ ...errMessages, username: '' });
      setErrOutline({ ...errOutline, username: '' });
      return
    }
    let isTaken = takenData.usernames.filter((val) => val === username).length > 0;
    if (isTaken) {
      setErrMessages({ ...errMessages, username: 'This username is already taken' });
      setErrOutline({ ...errOutline, username: 'is-invalid' });
      return
    }
    setErrMessages({ ...errMessages, username: '' });
    setErrOutline({ ...errOutline, username: 'is-valid' });
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {props.signup ? (
          <div className="form-group">
            <label htmlFor="username-label">Username</label>
            <input type="text" className={`form-control ${errOutline.username}`} id="username-label" value={formData.username} onChange={e => onChangeUsername(e)} />
            <small id="usernameHelp" className="form-text text-muted">{errMessages.username}</small>
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email-label">Email address</label>
          <input type="email" className={`form-control ${errOutline.email}`} id="email-label" aria-describedby="emailHelp" value={formData.email} onChange={emailOnChange} />
          <small id="emailHelp" className="form-text text-muted">{errMessages.email}</small>
        </div>
        <div className="form-group">
          <label htmlFor="password-label">Password</label>
          <input type="password" className={`form-control ${errOutline.password}`} id="password-label" value={formData.password} onChange={e => changingPassword(e)} />
          <small id="passwordHelp" className="form-text text-muted">{errMessages.password}</small>
        </div>
        {props.signup ? (
          <>
            <div className="form-group">
              <label htmlFor="password-label">Repeat Password</label>
              <input type="password" className={`form-control ${errOutline.repeatPassword}`} id="password-label" value={formData.repeatPassword} onChange={e => changingRepeatPasswords(e)} />
              <small id="emailHelp" className="form-text text-muted">{errMessages.repeatPassword}</small>
            </div>
            <div className="form-group">
              <label htmlFor="imageUrl-label">Image Url</label>
              <input type="text" className="form-control" id="imageUrl-label" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
              <small id="imageUrlHelp" className="form-text text-muted"> </small>
            </div>
          </>
        ) : null}
        <button id="auth-submit" type="submit" className="btn btn-primary mt-2">{props.buttonText}</button>
      </form>
    </div>
  )
}

export default AuthForm;
