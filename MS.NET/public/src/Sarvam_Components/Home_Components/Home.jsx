import React from 'react';
import HomeCarousel from './HomeCarousel';
import HomeAbout from './HomeAbout';
import HomeTeam from './HomeTeam';
import {HomeGallery}  from './HomeGallery';
import HomeTabbedNavigation from './HomeTabbedNavigation';
import HomeCenters from './HomeCenters';
import BlogPage from './BlogPage';
import TestimonialSlider from './TestimonialSlider';

const Home = () => {
  return (
  <div style={{ padding: '80px 20px' }}>
    <HomeCarousel />
    <HomeAbout />
    <BlogPage/>
    <HomeGallery />
    <HomeTabbedNavigation />
    <HomeCenters/>
    <TestimonialSlider/>
    <HomeTeam />

  </div>
);
};

export default Home;
