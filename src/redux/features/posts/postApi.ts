import {api} from "../../api/apiSlice.ts";

interface IGetAllPostParams {
   searchTerm?: string;
   sortBy?:string;
   sortOrder?:string
}

const postApi = api.injectEndpoints({
   endpoints: (builder) => ({
      getPosts: builder.query({
         query: (params: IGetAllPostParams | null) => {
            const queryParams = new URLSearchParams();

            if (params?.searchTerm) {
               queryParams.append('searchTerm', params.searchTerm);
            }
            if (params?.sortBy) {
               queryParams.delete('sortBy');
               queryParams.append('sortBy', params.sortBy);
            }

            return `/posts?${queryParams.toString()}`;
         },
         providesTags: ['login', 'newPost', 'fetchAfterDelete']
      }),
      singlePost: builder.query({
         query: (id: string) => `/posts/${id}`,
         providesTags: ['comments']
      }),
      addPost: builder.mutation({
         query: (payload) => ({
            url: '/posts',
            method: 'POST',
            body: payload
         }),
         invalidatesTags: ['newPost'],
      }),
      updatePost: builder.mutation({
         query: ({id, updatedData}) => ({
            url: `/posts/${id}`,
            method: 'PATCH',
            body: updatedData
         }),
      }),
      deletePost: builder.mutation({
         query: (id) => ({
            url: `/posts/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['fetchAfterDelete'],
      }),
      postComment: builder.mutation({
         query: ({postId, comment}) => ({
            url: `/posts/${postId}/comments`,
            method: 'POST',
            body: comment
         }),
         invalidatesTags: ['comments'],
      })
   })
})

export const {
   useGetPostsQuery,
   useSinglePostQuery,
   useAddPostMutation,
   usePostCommentMutation,
   useUpdatePostMutation,
   useDeletePostMutation
} = postApi;