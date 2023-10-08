import {Signup} from "../components/Signup.tsx";
import {useAppSelector} from "../redux/hook.ts";


function SignupPage() {
   const {userInfo} = useAppSelector(state => state.user);

   return (
      <>
         {
            !userInfo?.email ? <Signup/> : window.location.replace('/')
         }
      </>
   );
}

export default SignupPage;