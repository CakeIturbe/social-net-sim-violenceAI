import React from "react";

const Post = ({user = "user1", image_url = "https://placehold.co/600x400", caption} ) => {
    return (
        <div style={{ 
            width: "100%", 
            maxWidth: "600px", 
            margin: "2rem auto", 
            padding: "1rem", 
            textAlign: "left",
            boxShadow: "0 2px 4px white)" 
        }}>
        <h3 style={{ marginBottom: "1rem", paddingLeft: "1rem"}}>{user}</h3>
        <img 
            src= {image_url}
            alt="Post" 
            style={{ width: "100%", borderRadius: "10px", marginBottom: "1rem" }}
        />
        <p style={{paddingLeft: "1rem"}} >This is a sample post content. Caption placement You can add your text here.</p>
        </div>
    ); 
}

export default Post;