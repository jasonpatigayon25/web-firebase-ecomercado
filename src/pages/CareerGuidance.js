import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Container = styled.div`
  background: linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7);
  color: #726A8A;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const CareerGuidance = () => {
  return (
    <Container>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#FFFFFF' }}>
        <img src={process.env.PUBLIC_URL + "/Logo.png"} width="60" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />
        <div className="container">
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <div className="d-flex flex-column align-items-center">
                    <img src={process.env.PUBLIC_URL + "/home.png"} alt="Home" className="nav-icon" />
                    Home
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/skills-assessment">
                  <div className="d-flex flex-column align-items-center">
                    <img src={process.env.PUBLIC_URL + "/skills-assessment.png"} alt="Skills-a" className="nav-icon" />
                    Skills Assessment
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/skill-development">
                  <div className="d-flex flex-column align-items-center">
                    <img src={process.env.PUBLIC_URL + "/skill-development.png"} alt="Skill-D" className="nav-icon" />
                    Skill Development  
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/career-guidance">
                  <div className="d-flex flex-column align-items-center">
                    <img src={process.env.PUBLIC_URL + "/career-guidance.png"} alt="Career" className="nav-icon" />
                    Career Guidance
                  </div>
                </Link>
              </li>
              <li className="nav-item dropdown">
              <Link className="nav-link" to="/">
                <div className="d-flex flex-column align-items-center">
                  <img src={process.env.PUBLIC_URL + "/settings.png"} alt="Option" className="nav-icon" />  
                    Logout
                </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Title>Career Guidance</Title>
      <Description>
        Welcome to ParentPathIN's Career Guidance section! We are here to provide you with valuable information and resources to help you navigate your career journey as a single parent. Whether you are looking for job opportunities, seeking career advice, or exploring new skill development options, we've got you covered.
      </Description>
      <Description>
        Our team of experts has curated a wide range of resources to assist you in making informed decisions and achieving your career goals. Browse through the following sections to find what you need:
      </Description>
      <Carousel infiniteLoop autoPlay showThumbs={false}>
              <div>
                <img src="/welcome1.png" alt="1"style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
              <img src="/welcome2.jpg" alt="2" style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
                <img src="/parent1.jpeg" alt="3"style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
              <img src="/parent2.jpg" alt="4" style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
                <img src="/parent3.jpg" alt="5"style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
              <img src="/parent4.jpg" alt="6" style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
                <img src="/parent5.jpg" alt="7"style={{ height: '400px', width: '720px' }} />
              </div>
              <div>
              <img src="/parent6.jpg" alt="8" style={{ height: '400px', width: '720px' }} />
              </div>
            </Carousel>
      <ul>
        <li>
          <Link to="/job-opportunities">Job Opportunities</Link>: Explore a variety of job openings and employment options tailored to single parents. We collaborate with companies that value work-life balance and provide family-friendly policies.
        </li>
        <li>
          <Link to="/career-advice">Career Advice</Link>: Gain valuable insights and tips from experienced professionals on topics such as resume writing, interview preparation, career advancement, and work-life balance.
        </li>
        <li>
          <Link to="/skill-development">Skill Development</Link>: Enhance your skills through online courses, training programs, and workshops designed to boost your employability and open up new career paths. We offer resources across various industries and skill domains.
        </li>
        <li>
          <Link to="/entrepreneurship">Entrepreneurship</Link>: If you're considering starting your own business, we provide guidance and resources to help you navigate the entrepreneurial journey. Learn about business planning, funding opportunities, and success stories from single parent entrepreneurs.
        </li>
      </ul>
      <Description>
        We understand the unique challenges and aspirations of single parents in their career pursuits. ParentPathIN is here to support you every step of the way. Remember, you are capable of achieving great things, and we believe in your potential.
      </Description>
      <Description>
        Start exploring our Career Guidance resources and take control of your professional journey today!
      </Description>
    </Container>
  );
}

export default CareerGuidance;