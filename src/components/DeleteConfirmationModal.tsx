import {Button, Center, Divider, Modal, Notification, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {useDeletePostMutation} from "../redux/features/posts/postApi.ts";

interface DeleteConfirmationModalProps {
   id: string;
   setShowModal: (isVisible: boolean) => void;
}

function DeleteConfirmationModal({id, setShowModal}: DeleteConfirmationModalProps) {
   const [opened] = useDisclosure(true);
   const [deletePost, {error, isError}] = useDeletePostMutation();

   const handleDelete = async () => {
      try {
         await deletePost(id);
         !isError && setShowModal(false);
      } catch (error) {
         console.log("Failed to delete:", error);
      }
   };

   return (
      <>
         <Modal size='auto' opened={opened} onClose={() => setShowModal(false)} withCloseButton={false} centered>
            <Text fw='bolder' size='lg' m={10}>
               Are you sure to delete this post?
            </Text>
            <Divider/>
            <Text fw='bold' size='md' m={10}>
               Click yes button to delete the post.
            </Text>
            {
               isError &&
                <Notification color="red" m={10} withCloseButton={false}>
                   {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                   {/* @ts-ignore */}
                    <Text color="red">Failed to delete. {error?.data.message}</Text>
                </Notification>
            }
            <Center>
               <Button onClick={handleDelete} m={10} size='xs' variant='outline' color='red'>Yes</Button>
            </Center>
         </Modal>
      </>
   );
}

export default DeleteConfirmationModal;