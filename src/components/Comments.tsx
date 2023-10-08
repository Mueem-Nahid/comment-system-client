import {
   Avatar,
   Box,
   Button,
   createStyles,
   Divider,
   Group,
   Notification,
   Paper,
   rem,
   Text,
   Textarea,
   TypographyStylesProvider,
} from "@mantine/core";
import {IComment} from "../types/globalTypes.ts";
import {useForm} from "@mantine/form";
import {usePostCommentMutation} from "../redux/features/posts/postApi.ts";
import {useAppSelector} from "../redux/hook.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {formatDate} from "../utils/utils.ts";

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

type CommentsProp = IComment[] | undefined;

function Comments({comments, id}: { comments: CommentsProp, id: string }) {
   const [postComment, {isError, error}] = usePostCommentMutation();
   const {classes} = useStyles();
   const {userInfo} = useAppSelector(state => state.user)
   const previousLocation = useNavigate();
   const {pathname} = useLocation();

   const form = useForm({
      initialValues: {comment: ''},

      validate: {
         comment: (value) => (value.length < 10 ? 'Comment must have at least 20 letters' : null),
      },
   });

   const handleSubmit = async (comment: { comment: string }) => {
      if (!userInfo?.id) {
         return previousLocation(`/login?redirectTo=${pathname}`);
      }
      try {
         const postId: string = id;
         postComment({postId, comment});
         form.reset();
      } catch (e) {
         // nothing
      }
   }

   return (
      <Box>
         <Paper px={30} py={15} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <Textarea
                  {...form.getInputProps('comment')}
                  placeholder="Post your comment..."
                  label="Your comment"
                  autosize
                  minRows={2}
                  required
               />
               {
                  isError &&
                   <Notification color="red" mt="10px" withCloseButton={false}>
                      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                      {/*@ts-ignore*/}
                       <Text color="red">{error?.data.message}</Text>
                   </Notification>
               }
               <Button type="submit" fullWidth mt="xl">
                  Post
               </Button>
            </form>
         </Paper>
         {
            comments && comments.length ?
               comments.map((comment: IComment) => (
                  <Paper key={comment._id} radius="md" className={classes.comment}>
                     <Group>
                        <Avatar alt={comment.commentedBy.name} color="cyan"
                                radius="xl">{comment.commentedBy.name.substring(0, 1)}</Avatar>
                        <div>
                           <Text fz="sm">{comment.commentedBy.name}</Text>
                           <Text fz="xs" c="dimmed">
                              {formatDate(comment.createdAt)}
                           </Text>
                        </div>
                     </Group>
                     <TypographyStylesProvider className={classes.body}>
                        <div className={classes.content} dangerouslySetInnerHTML={{__html: comment.comment}}/>
                     </TypographyStylesProvider>
                     <Divider my="sm"/>
                  </Paper>
               )) : ''
         }
      </Box>
   );
}

export default Comments;