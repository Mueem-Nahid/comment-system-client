import {ActionIcon, Loader, Notification, rem, Text, TextInput, TextInputProps, useMantineTheme} from '@mantine/core';
import {IconArrowRight, IconSearch} from '@tabler/icons-react';
import {useAddPostMutation} from "../redux/features/posts/postApi.ts";
import {useForm} from "@mantine/form";
import {useState} from "react";
import {useAppSelector} from "../redux/hook.ts";

interface AddPostFormInput {
   post: string;
}

export function PostInput(props: TextInputProps) {
   const theme = useMantineTheme();
   const [addPost, {isError, error, isLoading}] = useAddPostMutation();
   const {userInfo} = useAppSelector(state => state.user);
   const [successMessage, setSuccessMessage] = useState('');

   const form = useForm({
      initialValues: {
         post: ''
      },
      validate: {
         post: (value) => {
            if (!value.trim()) {
               return 'Type anything';
            }
            return null;
         }
      }
   });

   const handleSubmit = async (values: AddPostFormInput) => {
      try {
         const payload = {
            user: userInfo?.id,
            post: values.post
         }
         // @ts-ignore
         const {data} = await addPost(payload);
         form.reset();
         setSuccessMessage(data?.message)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <>
         <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
               {...form.getInputProps('post')}
               radius="xl"
               size="md"
               placeholder="Share your thoughts ..."
               rightSectionWidth={42}
               // @ts-ignore
               leftsection={<IconSearch style={{width: rem(18), height: rem(18)}} stroke={1.5}/>}
               rightSection={
                  <ActionIcon type="submit" size={32} radius="xl" color={theme.primaryColor} variant="filled">
                     {
                        isLoading ? <Loader size='sm' color="white"/> : <IconArrowRight style={{width: rem(18), height: rem(18)}} stroke={1.5}/>
                     }
                  </ActionIcon>
               }
               {...props}
            />
         </form>
         {
            isError &&
             <Notification color="red" mt="15px" mx="px" withCloseButton={false}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore*/}
                 <Text color="red">{error?.data.message}</Text>
             </Notification>
         }
         {
            successMessage &&
             <Notification color="green" mt="15px" mx="5px" withCloseButton={false}>
                 <Text color="green">{successMessage}</Text>
             </Notification>
         }
      </>
   );
}