import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';
import {getPosts, getSinglePost} from '../../../utils/WebAPI';

const PostWrapper = styled.div`
  padding: 10px;
  margin: 15px;
  background: #eee;
`;

const PostTitle = styled.div`
  font-weight: bold;
  font-size: 32px;
  padding: 20px;
  text-align: left;
`;

const PostInfo = styled.div`
  padding: 20px;
  text-align: left;
`;

const PostBody = styled.div`
  padding: 20px;
  text-align: left;
`;

export default function Post() {
  const {id} = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function runGetSinglePost() {
      const data = await getSinglePost(id);
      setPost(data);
    }
    runGetSinglePost();
  }, []);

  return (
    <div>
      {post.map(post => (
        <PostWrapper key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostInfo>{new Date(post.createdAt).toLocaleString()}</PostInfo>
          <PostBody>{post.body}</PostBody>
        </PostWrapper>
      ))}
    </div>
  );
}
