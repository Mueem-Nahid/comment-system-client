import {useParams} from "react-router-dom";
import {Center, Container, Loader} from "@mantine/core";
import {useSinglePostQuery} from "../redux/features/posts/postApi.ts";
import PostDetails from "../components/PostDetails.tsx";


function BookDetailsPage() {
   const {id} = useParams();
   const {data, isLoading} = useSinglePostQuery(id!)
   console.log(data)
   return (
      <Container size="xs" px="xs" pt="30px">
         {
            isLoading ?
               <Center>
                  <Loader/>
               </Center> :
               !isLoading && data?.data ?
                  <PostDetails post={data.data}/>
                  :
                  <Center>Not found</Center>
         }

      </Container>
   );
}

export default BookDetailsPage;