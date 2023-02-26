import React from "react";

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

const List = React.memo(({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <ListItems key={post.id} post={post} />
      ))}
    </ul>
  );
});

const B = ({ message, posts }) => {
  return (
    <div>
      <h1>B Component</h1>
      <Message message={message} />
      <List posts={posts} />
    </div>
  );
};

export default B;
