import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BlogCard from "./BlogCard";
import './BlogPage.css'; // Import the CSS file

function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "CDAC: Pioneering Advanced Computing in India",
      author: "Admin",
      date: "2024-11-12",
      body: "CDAC is India's premier organization for R&D in IT, electronics, and computing. Learn about its pivotal role in advancing supercomputing in the country.",
      link: "#"
    },
    {
      id: 2,
      title: "How CDAC's Training Programs Shape IT Professionals",
      author: "John Smith",
      date: "2024-11-10",
      body: "Discover how CDAC's extensive courses, such as PG-DAC and PG-DMC, empower students with industry-ready skills and real-world expertise.",
      link: "#"
    },
    {
      id: 3,
      title: "Param Supercomputers: A Revolution by CDAC",
      author: "Alice Brown",
      date: "2024-11-08",
      body: "The Param series of supercomputers by CDAC has revolutionized high-performance computing in India. Explore its journey and impact.",
      link: "#"
    },
    {
      id: 4,
      title: "CDAC's Contribution to Digital India",
      author: "Jane Doe",
      date: "2024-11-07",
      body: "CDAC's initiatives in e-Governance, e-Learning, and healthcare technology have been instrumental in transforming India into a digital economy.",
      link: "#"
    },
  ];

  const newsItems = [
    "Breaking News: CDAC announces new AI research initiative!",
    "Tech Update: CDAC partners with global leaders for supercomputing!",
    "Events: CDAC launches new IoT training program for professionals.",
    "Research: CDAC's advancements in cybersecurity for digital India.",
    "Tech: CDAC's supercomputing technology boosts national grid efficiency."
  ];

  return (
    <Container fluid style={styles.container}>
      <h1 className="gallery-title" style={{ textAlign: "center" }}>Blogs</h1>
      <Row>
        {/* Left side - Blog Cards */}
        <Col md={8} style={styles.blogCards}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </Col>

        {/* Right side - News Container with Upward Motion */}
        <Col md={4} style={styles.textContainer}>
          <Card className="text-center" style={styles.card}>
            <Card.Body style={styles.cardBody}>
              <h2 style={styles.heading}>Latest News</h2>
              <div className="newsList"> 
                {newsItems.map((news, index) => (
                  <div key={index} style={styles.newsItem}>
                    {news}
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// Custom styles with Bootstrap
const styles = {
  container: {
    padding: "20px",
  },
  blogCards: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flexGrow: 1,  // This allows the blog section to grow naturally
    flexShrink: 0,  // Prevents the blog section from shrinking
  },
  textContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    flexGrow: 1,  // Ensure both left and right side sections share space equally
    overflow: "hidden",  // No overflow to avoid scrollbars
  },
  card: {
    width: "100%",
    height: "100%",  // Ensure card takes the full height
  },
  cardBody: {
    padding: "30px",
  },
  heading: {
    fontSize: "2rem",
    color: "#343a40",
    marginBottom: "15px",
    textAlign: "center", // Ensures heading is centered
  },
  newsItem: {
    fontSize: "1rem",
    color: "black",
    opacity: 0.8,
  },
};

export default BlogPage;
