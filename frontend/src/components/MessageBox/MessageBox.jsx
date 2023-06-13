import PropTypes from 'prop-types';

const MessageBox = ({ message, image }) => {
  return (
    <div className='box'>
      <img src={image} alt='error' />
      <p>{message}</p>
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.string,
  image: PropTypes.string,
};

export default MessageBox;
