import {ReactNode} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../redux/hook.ts";

interface IProps {
   children: ReactNode
}

function PrivateRoute({children}: IProps) {
   const {userInfo} = useAppSelector(state => state.user)
   const {pathname} = useLocation();


   if (!userInfo?.email)
      return <Navigate to='/login' replace state={{path: pathname}}/>

   return children
}

export default PrivateRoute;