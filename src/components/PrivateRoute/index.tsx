
import { useAppSelector } from "@/store";
import { selectUserInfo } from "@/store/slices/userSlice";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";


type Props = {
    element: ReactElement
}

const PrivateRoute = ({ element }: Props) => {
    const userInfo = useAppSelector(selectUserInfo)
    return userInfo.role ? element : <Navigate to="/login" />;
};

export default PrivateRoute;