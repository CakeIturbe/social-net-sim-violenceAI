import React from "react";
import { FiUpload } from "react-icons/fi";

const Header = ({showPostButton}) => {
  return (
    <header style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        color: "white",
        zIndex: 1000,
    }}>
      <nav style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="/" style={{ color: "white", marginLeft: "2rem", display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img className="logo react" src="/LOGO.png" alt="Logo" style={{ height: "40px",filter: "drop-shadow(0 0 4px #0C0C0C)"}} />
            <span style={{ marginLeft: "0.5rem", fontSize: "1.5rem", fontWeight: "bold",  textShadow: `0 0 2px #0C0C0C,0 0 4px #0C0C0C`}}>SocialNet</span>
        </a>
        {showPostButton && (
        <a href="/post">
          <button style={{  display: "flex", alignItems: "center", gap: "0.5rem", marginRight: "2rem", padding: "0.5rem 1rem", backgroundColor: "white" , border: "none", borderRadius: "10px", cursor: "pointer", color: "black", boxShadow: "0 0 2px #0C0C0C, 0 0 4px #0C0C0C" }}>
            <FiUpload size={18} /> Post
          </button>
        </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
