import { STATUSES } from "../../store/commonSlice";
import { Loading } from "@nextui-org/react";

const Loader = ({ status }: { status: string }) => {
  return (
    <>
      {status === STATUSES.LOADING && (
        <Loading
          type="points-opacity"
          // style={{ position: "absolute", left: "48%", top: "48vh", zIndex: 20 }}
        />
      )}
    </>
  );
};

export default Loader;
