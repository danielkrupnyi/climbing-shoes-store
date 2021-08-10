import { useAppSelector } from "../../hooks";
import Loader from "../Loader";

const Notify = () => {
  const notify = useAppSelector((state) => state.notifySlice);

  return (
    <div className="my-2">
      {notify.value.loading && <Loader />}
      {notify.value.error && (
        <strong className="text-danger">{notify.value.error}</strong>
      )}
      {notify.value.success && (
        <strong className="text-success">{notify.value.success}</strong>
      )}
    </div>
  );
};

export default Notify;
