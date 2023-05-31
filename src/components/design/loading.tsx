import { STATUSES } from "../../store/commonSlice";
import { Loading } from "@nextui-org/react";

const Loader = ({ status, styled }: { status: string; styled?: boolean }) => {
  return (
    <>
      {status === STATUSES.LOADING && (
        <Loading
          type="points-opacity"
          size="xl"
          style={
            styled
              ? { position: "absolute", left: "48%", top: "48vh", zIndex: 20 }
              : {}
          }
        />
      )}
    </>
  );
};

export default Loader;
