import React, { useState, useEffect} from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import Search from './components/Search'
import axios from 'axios';
import './App.css';

const App = () => {
  const ITEMS_PER_PAGE = 20;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [postsPerPage] = useState(ITEMS_PER_PAGE);


  useEffect(() => {
    const updateStream = async () => {
      setLoading(true);
      const res = await axios.get('https://7ba3dbe5f8b0.ngrok.io/fetch/stream/'+search);
      console.log("res::"+JSON.stringify(res))
    };

    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://7ba3dbe5f8b0.ngrok.io/fetch/tweets');
      console.log("response==>"+JSON.stringify(res.data.data.data));
      setPosts(res.data.data.data);
      setLoading(false);
    };
    if(search !== ''){
      updateStream();
    }
    fetchPosts();
  }, [search]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Tweets</h1>
      <Search
          onSearch={value => {
              setSearch(value);
              setCurrentPage(1);
          }}
      />
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;