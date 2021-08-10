const Toast = ({ msg, bgColor }) => (
  <div
    className={`toast show text-light ${bgColor} mt-3`}
    style={{
      zIndex: 9,
      minWidth: "230px",
    }}
  >
    <div className="toast-body">{msg.msg}</div>
  </div>
);

export default Toast;
