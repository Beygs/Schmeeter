import { useGetPostsQuery } from "features/api/apiSlice";
import { useMemo } from "react";
import PostExcerpt from "./components/PostExcerpt";

const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return sortedPosts;
  }, [posts]);

  let content;

  if (isLoading) {
    content = "loading";
  } else if (isSuccess) {
    console.log(posts);
    content = sortedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="PostsLists">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
