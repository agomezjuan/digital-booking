import './Spinner.scss';
import PropTypes from 'prop-types';

const Spinner = ({ mode }) => {
  return <div className={`lds-dual-ring ${mode}`}></div>;
};

Spinner.defaultProps = {
  mode: 'light',
};

Spinner.propTypes = {
  mode: PropTypes.string,
};

export default Spinner;
