import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import './SubmitButton.scss';

const SubmitButton = ({ loading, text }) => {
  return (
    <button className='submit-button' type='submit'>
      {loading ? <Spinner /> : text}
    </button>
  );
};

SubmitButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string,
};

export default SubmitButton;
