import React, { useState } from "react";

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dynamicStyles = {
    ...styles.card,
    ...(isHovered && styles.cardHover), // Apply hover effects dynamically
  };
  

  return (
    <div
      style={dynamicStyles}
      onMouseEnter={() => setIsHovered(true)} // Trigger hover effects
      onMouseLeave={() => setIsHovered(false)} // Remove hover effects
    >
      <h2 style={styles.title}>{blog.title}</h2>
      <p style={styles.author}>        By {blog.author} on {blog.date}      </p>
      <p style={styles.body}>{blog.body}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#f4f4f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.5rem",
    color: "#000000",          
    marginBottom: "10px",
  },
  author: {
    fontSize: "0.9rem",
    color: "#292522",
    marginBottom: "15px",
  },
  body: {
    fontSize: "1rem",
    color: "#495057",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#e0e0e0",
    color: "#6baced",  // Text color changes on hover
  },
};

export default BlogCard;
