import { useLocation } from "react-router-dom";

function useCurrentPathName() {
  const location = useLocation();
  const currentPathName = location.pathname;

  return currentPathName;
}

export default useCurrentPathName;
