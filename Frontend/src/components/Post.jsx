import React from "react";

const Post = ({user = "user1", image_url = "https://placehold.co/600x400", caption} ) => {
    return (
        <div style={{ 
            width: "100%", 
            maxWidth: "600px", 
            // paddingBottom: "0.5rem", 
            textAlign: "left",
            boxShadow: "0 2px 4px white)", 
        }}>
            <h3 style={{ marginBottom: "1rem", paddingLeft: "1rem"}}>{user}</h3>
            <img 
                src= {image_url}
                alt="Post" 
                style={{ width: "400px", borderRadius: "5px", marginBottom: "1rem", display: "block", marginLeft: "auto", marginRight: "auto" }}
            />
            <p style={{paddingLeft: "1rem"}} >{caption}</p>

            <div
            style={{
                height: "2px",
                backgroundColor: " rgba(255, 255, 255, 0.29)",
                margin: "2rem 0",
                marginTop: "4rem",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5)"
            }}
            />


        </div>
    ); 
}

export default Post;