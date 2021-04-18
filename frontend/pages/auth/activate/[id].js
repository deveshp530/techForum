// grab parameter from url
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';

import jwt from 'jsonwebtoken';
import axios from 'axios';

import { showSuccessMessage, showErrorMessage } from '../../../helpers/alerts';
import { API } from '../../../config';

import Layout from '../../../components/Layout';

const activateAccount = ({ router }) => {
  const [state, setState] = useState({
    name: '',
    token: '',
    buttonText: 'Activate Account',
    success: '',
    error: '',
  });
};
const { name, token, buttonText, success, error } = state;

useEffect(() => {
  let token = router.query.id;
  if (token) {
    const { name } = jwt.decode(token);
    setState({ ...state, name, token });
  }
}, [name]);

const activateSubmit = async (e) => {
  e.preventDefault();
  console.log('activata account');
  setState(...state, (buttonText: ' Activating'));
  try {
    const reponse = await axios.post(`${API}/register/activate`, { token });
    setState({
      ...state,
      name: '',
      token: '',
      buttonText: 'activated',
      success: reponse.data.message,
    });
  } catch (error) {
    setState(
      ...state,
      (buttonText: 'activate account'),
      (error: error.reponse.data.error)
    );
  }
};

return (
  <Layout>
    <div className="row">
      <div className="col-md-6 offset md-3">
        <h1>Hello{name}, Lets activate your account</h1>
        {success && showSuccessMessage(success)}
        {error && showErrorMessage(error)}
        <button
          className="btn btn-outline-warning btn-block"
          onClick={activateSubmit}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </Layout>
);

export default withRouter(activateAccount);
