import {api} from "../../api/apiSlice.ts";

interface IGetAllPostParams {
   searchTerm?: string;
   sortBy?:string;
   sortOrder?:string;
   limit?:string;
   page?:string
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
            if (params?.limit) {
               queryParams.delete('limit');
               queryParams.append('limit', params.limit);
            }
            if (params?.page) {
               queryParams.delete('page');
               queryParams.append('page', params.page);
            }

            return `/posts?${queryParams.toString()}`;
         },
         providesTags: ['login', 'newPost', 'fetchAfterDelete', 'fetchAfterReact']
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
      }),
      reactToPost: builder.mutation({
         query:({postId, payload})=> ({
            url: `/posts/${postId}/reaction`,
            method: 'POST',
            body: payload
         }),
         invalidatesTags: ['fetchAfterReact'],
      })
   })
})

export const {
   useGetPostsQuery,
   useSinglePostQuery,
   useAddPostMutation,
   usePostCommentMutation,
   useUpdatePostMutation,
   useDeletePostMutation,
   useReactToPostMutation
} = postApi;