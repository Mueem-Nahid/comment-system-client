import {
   Avatar,
   Container,
   createStyles,
   Divider,
   Flex,
   Group,
   Paper,
   rem,
   Text,
   TypographyStylesProvider
} from '@mantine/core';
import {formatDate} from "../utils/utils.ts";
import Comments from "./Comments.tsx";
import {IconThumbDown, IconThumbDownFilled, IconThumbUp, IconThumbUpFilled} from "@tabler/icons-react";

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

function PostDetails({post}) {
   console.log(post)
   const {classes} = useStyles();
   return (
      <>
         <Paper withBorder radius="md" className={classes.comment}>
            <Group>
               <Avatar color="cyan"
                       alt={post?.user.name}
                       radius="xl"
               >{post?.user.name.substring(0, 1)}</Avatar>
               <div>
                  <Text fz="sm">{post?.user.name}</Text>
                  <Text fz="xs" c="dimmed">
                     {formatDate(post?.createdAt)}
                  </Text>
               </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
               {post?.post}
            </TypographyStylesProvider>
            <Divider my="xs"/>
            <Flex gap={15} mx={50}>
               <Flex justify='center' align='center' gap={1}>
                  <IconThumbUp cursor='pointer' size={18} color='blue'/>
                  <Text size='sm'>{post.totalLikes}</Text>
               </Flex>
               <Flex justify='center' align='center' gap={1}>
                  <IconThumbDown cursor='pointer' size={18} color='blue'/>
                  <Text size='sm'>{post.totalDislikes}</Text>
               </Flex>
            </Flex>
            <Container size='sm'>
               <Comments comments={post?.comments} id={post?._id}/>
            </Container>
         </Paper>
      </>
   )
}

export default PostDetails