import {useGetPostsQuery} from "../redux/features/posts/postApi.ts";
import {Center, Container, Loader} from "@mantine/core";
import {PostInput} from "../components/PostInput.tsx";
import {Post} from "../components/Post.tsx";

function HomePage() {
   const {data, isLoading} = useGetPostsQuery(null)

   return (
      <Container size="xs" px="xs" pt="30px">
         <PostInput/>
         {
            data?.data?.length && data?.data.map((post)=> (
               <Post key={post._id} post={post}/>
            ))
         }
         {
            isLoading &&
             <Center>
                 <Loader/>
             </Center>
         }
         {
            !isLoading && !data?.data.length &&
             <Center>No thoughts found...</Center>
         }
      </Container>
   );
}

export default HomePage;