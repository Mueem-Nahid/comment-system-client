import {useGetPostsQuery} from "../redux/features/posts/postApi.ts";
import {Center, Container, Flex, Loader, Pagination, Select} from "@mantine/core";
import {PostInput} from "../components/PostInput.tsx";
import {Post} from "../components/Post.tsx";
import {useState} from "react";
import {IconChevronDown} from "@tabler/icons-react";

function HomePage() {
   const [filteringFields, setFilteringFields] = useState({
      sortBy: '',
      sortOrder: ''
   })
   const {data, isLoading} = useGetPostsQuery(
      {
         sortOrder: filteringFields.sortOrder,
         sortBy: filteringFields.sortBy
      },
      {
         refetchOnMountOrArgChange: true
      }
   )

   return (
      <Container size="xs" px="xs" pt="30px">
         <PostInput/>
         <Flex mt={25} justify="space-between">
            <div></div>
            <Select
               radius="xl"
               placeholder="Pick one"
               rightSection={<IconChevronDown size="1rem" />}
               rightSectionWidth={30}
               styles={{ rightSection: { pointerEvents: 'none' } }}
               data={['Most liked', 'Most disliked']}
            />
         </Flex>
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
         {
            data?.data?.length &&
             <Flex my={25} justify="space-between">
                 <div></div>
                 <Pagination total={3} />
             </Flex>
         }
      </Container>
   );
}

export default HomePage;