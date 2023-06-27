import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { restoreSession } from '../store/slices/authSlice';
import { getMe } from '../store/actions/authActions';

export default (WrappedComponent) => {
  const withAuthValidation = ({ ...props }) => {
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);

    if (!token) {
      const token = sessionStorage.getItem('dhb_token') || null;
      if (token) {
        dispatch(restoreSession(token));
        dispatch(getMe(token));
      } else {
        sessionStorage.removeItem('dhb_token');
      }
    }

    sessionStorage.getItem('dhb_token') == null &&
      sessionStorage.removeItem('dhb_token');

    return <WrappedComponent {...props} />;
  };

  withAuthValidation.propTypes = {
    props: PropTypes.object,
  };

  return withAuthValidation;
};
