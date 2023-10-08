import {Login} from "../components/Login.tsx";
import {useAppSelector} from "../redux/hook.ts";

function LoginPage() {
   const {userInfo} = useAppSelector(state => state.user);

   return (
      <>
         {
            !userInfo?.email ? <Login/> : window.location.replace('/')
         }
      </>
   );
}

export default LoginPage;