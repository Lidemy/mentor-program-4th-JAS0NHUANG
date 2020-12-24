import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {getPosts} from '../../../utils/WebAPI';

const PostWrapper = styled.div`
  padding: 10px;
  margin: 15px;
  display: flex;
  justify-content: space-around;
  background: #eee;
`;

const PostTitle = styled(Link)`
  font-weight: bold;
  text-align: left;
  flex: 0 0 768px;
`;

const PostInfo = styled.div`
  flex: 0 0 200px;
`;

const PaginationWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Page = styled.div`
  margin: 5px;
  padding: 10px;
  height: 45px;
  line-height: 35px;
  background: #eee;
  cursor: pointer;
  border-radius: 5px;
`;

function Pagination({currentPage, totalPage, handlePagination}) {
  const totalPages = Math.ceil(totalPage / 10);
  let pagesArray = [];
  for (let i = 0; i < totalPages; i++) {
    pagesArray.push(i + 1);
  }

  return (
    <PaginationWrapper>
      {pagesArray.map(pageNumber => {
        return (
          <Page key={pageNumber} onClick={handlePagination}>
            {pageNumber}
          </Page>
        );
      })}
    </PaginationWrapper>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState({});

  function handlePagination(event) {
    async function runGetPosts(currentPage) {
      const data = await getPosts(currentPage);
      setPosts(data);
      console.log('page' + JSON.stringify(data));
      setPage({...data[data.length - 1], handlePagination});
    }
    runGetPosts(parseInt(event.target.innerText));
  }

  useEffect(() => {
    async function runGetPosts() {
      const data = await getPosts();
      setPosts(data);
      setPage({...data[data.length - 1], handlePagination});
    }
    runGetPosts();
  }, []);

  return (
    <div>
      {posts.map(
        post =>
          post.id && (
            <PostWrapper key={post.id}>
              <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
              <PostInfo>{new Date(post.createdAt).toLocaleString()}</PostInfo>
            </PostWrapper>
          )
      )}
      {console.log(page)}
      <Pagination {...page} />
    </div>
  );
}
