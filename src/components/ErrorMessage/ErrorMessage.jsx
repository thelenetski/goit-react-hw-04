const ErrorMessage = ({ text }) => {
  return <>{text !== '' && <p style={{ fontSize: '20px' }}>{text}</p>}</>;
};

export default ErrorMessage;
