import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkButton = ({ link, text, primary }) => {
  return (
    <Link
      to={link}
      className={`btn btn-${primary ? 'primary' : 'secondary'}`}
      style={{
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'end',
        justifySelf: 'auto',
        marginLeft: 0,
      }}
    >
      {text}
    </Link>
  );
};

LinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  primary: PropTypes.bool,
};

export default LinkButton;
