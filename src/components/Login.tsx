import {
   Anchor,
   Button,
   Container,
   Loader,
   Notification,
   Paper,
   PasswordInput,
   Text,
   TextInput,
   Title,
} from '@mantine/core';
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../redux/hook.ts";
import {setCredentials} from "../redux/features/user/userSlice.ts";
import {IUser} from "../types/globalTypes.ts";
import {useLoginUserMutation} from "../redux/features/user/userApi.ts";

interface LoginFormInputs {
   email: string;
   password: string;
   user?: IUser;
}

export function Login() {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useAppDispatch()
   const [loginUser, {isError, error, isSuccess, isLoading}] = useLoginUserMutation()

   const form = useForm({
      initialValues: {
         email: '',
         password: '',
      },
      validate: {
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      },
   });

   const handleSubmit = async (values: LoginFormInputs) => {
      try {
         const response = await loginUser(values);
         // @ts-ignore
         const user: IUser = response?.data.data;
         dispatch(setCredentials(user));
         localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
         // Handle login error
      }
   }

   useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const redirectTo: string | null = searchParams.get("redirectTo");
      if (isSuccess) {
         redirectTo ?
            navigate(redirectTo) :
            navigate('/')
      }
   }, [isSuccess, navigate])

   return (
      <Container size={420} my={40}>
         <Title
            pt="35px"
            align="center"
            sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
         >
            Welcome back to <span style={{color:"#474747"}}>My Thoughts!</span>
         </Title>
         <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{' '}
            <Link to='/signup'>
               <Anchor size="sm" component="button">
                  Create account
               </Anchor>
            </Link>
         </Text>

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput {...form.getInputProps('email')} label="Email" placeholder="you@gmail.com" required/>
               <PasswordInput {...form.getInputProps('password')} label="Password" placeholder="Your password" required
                              mt="md"/>
               <Button type="submit" fullWidth mt="xl" disabled={isLoading}>
                  {
                     isLoading ? <Loader size="sm" /> :   "Sign in"
                  }
               </Button>
            </form>
            {
               isError &&
                <Notification color="red" mt="10px" withCloseButton={false}>
                   {/*@ts-ignore*/}
                    <Text color="red">{error?.data.message}</Text>
                </Notification>
            }
         </Paper>
      </Container>
   );
}