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
import {Link} from "react-router-dom";
import {useForm} from "@mantine/form";
import {useSignupUserMutation} from "../redux/features/user/userApi.ts";
import {useState} from "react";

interface SignupFormInputs {
   name: string,
   email: string;
   password: string;
}

export function Signup() {
   const [successMessage, setSuccessMessage] = useState('')
   const [signupUser, {isError, error, isSuccess, isLoading}] = useSignupUserMutation()

   const form = useForm({
      initialValues: {
         name: '',
         email: '',
         password: '',
      },
      validate: {
         name: (value) => {
            if (value.length < 4)
               return 'Name should be at least 4 characters long';
            return null
         },
         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
         password: (value) => {
            if (value.length < 5) {
               return 'Password should be at least 5 characters long';
            }
            return null;
         },
      },
   });

   const handleSubmit = async (values: SignupFormInputs) => {
      try {
         // @ts-ignore
         const {data} = await signupUser(values);
         setSuccessMessage(data?.message)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <Container size={420} my={40}>
         <Title
            pt="35px"
            align="center"
            sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
         >
            Welcome to <span style={{color:"#474747"}}>My Thoughts!</span>
         </Title>
         <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Link to='/login'>
               <Anchor size="sm" component="button">
                  Sign in
               </Anchor>
            </Link>
         </Text>

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <TextInput {...form.getInputProps('name')} label="Name" placeholder="your name. At least 4 character"
                          required/>
               <TextInput {...form.getInputProps('email')} label="Email" placeholder="you@mantine.dev" required/>
               <PasswordInput {...form.getInputProps('password')} label="Password"
                              placeholder="Your password. At least 5 character" required mt="md"/>
               <Button type="submit" fullWidth mt="xl" disabled={isLoading}>
                  {
                     isLoading ? <Loader size="sm" /> :   "Sign up"
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
            {
               isSuccess &&
                <Notification color="green" mt="10px" withCloseButton={false}>
                    <Text color="green">{successMessage}</Text>
                </Notification>
            }
         </Paper>
      </Container>
   );
}