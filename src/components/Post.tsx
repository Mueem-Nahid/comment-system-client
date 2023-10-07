import {
   Text,
   Avatar,
   Group,
   TypographyStylesProvider,
   Paper,
   createStyles,
   rem,
   Divider,
   Flex,
   ActionIcon, Tooltip
} from '@mantine/core';
import {formatDate} from "../utils/utils.ts";
import {IconThumbDown, IconThumbUp, IconTrash} from "@tabler/icons-react";
import {useAppSelector} from "../redux/hook.ts";
import {useState} from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal.tsx";

const useStyles = createStyles((theme) => ({
   comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
   },

   body: {
      paddingLeft: rem(54),
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
   },

   content: {
      '& > p:last-child': {
         marginBottom: 0,
      },
   },
}));

export function Post({post}) {
   const {classes} = useStyles();
   const {userInfo} = useAppSelector(state => state.user);
   const [showModal, setShowModal] = useState(false);

   return (
      <Paper withBorder radius="md" my={25} className={classes.comment}>
         <Flex justify="space-between">
            <Group>
               <Avatar alt={post?.user.name} color="cyan"
                       radius="xl">{post?.user.name.substring(0, 1)}</Avatar>
               <div>
                  <Text fz="sm">{post?.user.name}</Text>
                  <Text fz="xs" c="dimmed">
                     {formatDate(post?.createdAt)}
                  </Text>
               </div>
            </Group>
            {
               post?.user?._id === userInfo?.id &&
                <Group mt="xs" mb="md" noWrap spacing="xs">
                   {/*<Link to={`/edit-book/${id}`}>
                        <ActionIcon>
                            <Tooltip label="Edit">
                                <IconPencilPlus color="green" size="1.2rem"/>
                            </Tooltip>
                        </ActionIcon>
                    </Link>*/}
                    <ActionIcon onClick={() => setShowModal(true)}>
                        <Tooltip label="Delete">
                            <IconTrash color='red' size="1.1rem"/>
                        </Tooltip>
                    </ActionIcon>
                </Group>
            }
         </Flex>
         {
            showModal && <DeleteConfirmationModal id={post?._id} setShowModal={setShowModal}/>
         }
         <TypographyStylesProvider className={classes.body}>
            {post?.post}
         </TypographyStylesProvider>
         <Divider my="xs" />
         <Flex justify='space-between' mx={10}>
            <Flex gap={15}>
               <Flex justify='center' align='center' gap={1}>
                  <IconThumbUp cursor='pointer' size={18} color='blue'/>
                  <Text size='sm'>{post.totalLikes}</Text>
               </Flex>
               <Flex justify='center' align='center' gap={1}>
                  <IconThumbDown cursor='pointer' size={18} color='blue'/>
                  <Text size='sm'>{post.totalDislikes}</Text>
               </Flex>
            </Flex>
            <Text size='sm' style={{cursor:'pointer'}}>Comment</Text>
         </Flex>
      </Paper>
   );
}