import {Text, Avatar, Group, TypographyStylesProvider, Paper, createStyles, rem, Divider, Flex} from '@mantine/core';
import {formatDate} from "../utils/utils.ts";
import {IconThumbDown, IconThumbUp} from "@tabler/icons-react";

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
   return (
      <Paper withBorder radius="md" my={25} className={classes.comment}>
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