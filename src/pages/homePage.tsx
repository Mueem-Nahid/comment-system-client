import {useGetPostsQuery} from "../redux/features/posts/postApi.ts";
import {Center, Container, Flex, Loader, Pagination, Select} from "@mantine/core";
import {PostInput} from "../components/PostInput.tsx";
import {Post} from "../components/Post.tsx";
import {useState} from "react";
import {IconChevronDown} from "@tabler/icons-react";
import {IPost} from "../types/globalTypes.ts";

function HomePage() {
   const [filteringFields, setFilteringFields] = useState({
      sortBy: '',
      sortOrder: 'desc',
      limit: '5',
      page: '1'
   })
   const {data, isLoading} = useGetPostsQuery(
      {
         sortBy: filteringFields.sortBy,
         sortOrder: filteringFields.sortOrder,
         limit: filteringFields.limit,
         page: filteringFields.page
      },
      {
         refetchOnMountOrArgChange: true
      }
   );

   const handleFiltering = (name: string, value: string) => {
      if (name === 'limit') {
         setFilteringFields((prevFields) => ({
            ...prevFields,
            page: '1'
         }));
      }
      setFilteringFields((prevFields) => ({
         ...prevFields,
         [name]: value
      }));
   }

   return (
      <Container size="xs" px="xs" pt="30px">
         <PostInput/>
         <Flex mt={25} justify="space-between">
            <div></div>
            <Select
               radius="xl"
               placeholder="Pick one"
               rightSection={<IconChevronDown size="1rem"/>}
               rightSectionWidth={30}
               styles={{rightSection: {pointerEvents: 'none'}}}
               data={[
                  {
                     value: 'totalLikes', label: 'Most liked'
                  },
                  {
                     value: 'totalDislikes', label: 'Most disliked'
                  },
                  {
                     value: 'createdAt', label: 'Newest'
                  }
               ]}
               onChange={(value: string) => handleFiltering('sortBy', value)}
            />
         </Flex>
         {
            data?.data?.length && data?.data.map((post:IPost) => (
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
                 <Select
                     placeholder="Limit"
                     rightSection={<IconChevronDown size="1rem"/>}
                     rightSectionWidth={30}
                     styles={{rightSection: {pointerEvents: 'none'}}}
                     value={filteringFields.limit}
                     data={[
                        {
                           value: '2', label: '2'
                        },
                        {
                           value: '5', label: '5'
                        },
                        {
                           value: '10', label: '10'
                        }
                     ]}
                     onChange={(value: string) => handleFiltering("limit", value)}
                 />
                 <Pagination value={Number(filteringFields.page)}
                             onChange={(value) => handleFiltering("page", value.toString())}
                             total={Math.ceil(data?.meta?.total / data?.meta?.limit)}/>
             </Flex>
         }
      </Container>
   );
}

export default HomePage;