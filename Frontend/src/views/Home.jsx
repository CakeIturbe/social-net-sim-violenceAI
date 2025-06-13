import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Post from '../components/Post.jsx'

function Home() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts');
        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }
        const data = await response.json();
        setPosts(data);
        console.log('Posts fetched:', data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  const replaceImageUrl = (image_url) => {
    // Replace the image URL to add the "/Backend" part
    image_url = `http://localhost:3001/images/${image_url}`;;
    console.log("Image URL replaced:", image_url);
    return image_url
  };



  return (
    <>
      <div style={{paddingTop: "4rem"}}>
        <Header showPostButton={true} />
        {posts.map((post, index) => (
          <Post
            key={index}
            user={post.username}
            
            image_url={replaceImageUrl(post.image_url)}
            caption={post.caption}
          />
        ))}
      </div>
      
    </>
  )
}

export default Home