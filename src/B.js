import React, { useCallback } from "react";

const Message = React.memo(({ message }) => {
  return <p>{message}</p>;
});

const ListItems = React.memo(({ post }) => {
  return (
    <li key={post.id}>
      <p>{post.title}</p>
    </li>
  );
});

const List = React.memo(({ posts, testFunc }) => {
  console.log("List is Rendering");
  return (
    <ul>
      {posts.map((post) => (
        <ListItems key={post.id} post={post} />
      ))}
    </ul>
  );
});

const B = ({ message, posts }) => {
  console.log("B Component is Rendering");

  const testFunc = useCallback(() => {}, []);

  return (
    <div>
      <h1>B Component</h1>
      <Message message={message} />
      <List posts={posts} testFunc={testFunc} />
    </div>
  );
};

export default B;
