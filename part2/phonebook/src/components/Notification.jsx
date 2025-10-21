const Notification = ({ message, state }) => {
  return (
    <div className={state}>
      <h1>{message}</h1>
    </div>
  );
};

export default Notification;
