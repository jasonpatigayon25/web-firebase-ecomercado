import React from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function SkillDevelopment() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7)', minHeight: '100vh' }}>
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
                <div className="d-flex flex-column align-items-center">
                  <img src={process.env.PUBLIC_URL + "/settings.png"} alt="Option" className="nav-icon" />  
                  <Link className="nav-link dropdown-toggle" to="/" id="optionDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Settings
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="optionDropdown">
                    <li>
                      <Link className="dropdown-item" to="/changepassword">Change Password</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">Logout</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <div>
      <Container className="py-5 d-flex justify-content-center align-items-center">
        <Row>
          <Col>
            <Card className="p-5" style={{ width: '700px' }}>
              <h1 className="mb-4 text-center">Skill Development</h1>
              <p>
                Welcome to ParentPathIN's Skill Development page! We believe that
                continuous learning and skill development are essential for
                personal and professional growth. Whether you're a parent looking
                to enhance your parenting skills or an individual seeking to
                expand your knowledge and expertise, we've got you covered.
              </p>
              <p>
                Here are some tips to help you stay motivated on your skill
                development journey with ParentPathIN:
              </p>
              <ol>
                <li>
                  <strong>Set Meaningful Goals:</strong> Define clear and
                  meaningful goals that align with your aspirations. Whether it's
                  improving your communication with your children or acquiring
                  new parenting techniques, having specific goals will provide
                  direction and motivation.
                  <br />
                  <a href="https://www.youtube.com/watch?v=BQbufwSqxpU" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/BQbufwSqxpU?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Engage in Interactive Courses:</strong> Explore our wide
                  range of interactive courses designed to enhance your skills as
                  a parent. Our courses are created by experts in the field and
                  cover various topics, including effective communication,
                  positive discipline, and emotional intelligence.
                  <br />
                  <a href="https://www.youtube.com/watch?v=DokPxMOXxVs" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/DokPxMOXxVs?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Join Supportive Communities:</strong> Connect with other
                  parents who share similar skill development goals. Our online
                  community provides a supportive environment where you can share
                  experiences, seek advice, and celebrate each other's successes.
                  <br />
                  <a href="https://www.youtube.com/watch?v=MjY6aRQkdSI" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/MjY6aRQkdSI?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Track Your Progress:</strong> Keep a record of your
                  progress as you complete courses and apply your new skills in
                  real-life situations. Reflecting on your achievements will boost
                  your confidence and inspire you to continue growing as a parent.
                  <br />
                  <a href="https://www.youtube.com/watch?v=wFDMRFJeyN0" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/wFDMRFJeyN0?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Attend Webinars and Workshops:</strong> Stay updated
                  with the latest parenting trends and techniques by
                  participating in our webinars and workshops. These interactive
                  sessions offer valuable insights and practical tips from
                  industry experts.
                  <br />
                  <a href="https://www.youtube.com/watch?v=qKHXQtvY6Fc" target="_blank" rel="noopener noreferrer" className="tip-link">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/qKHXQtvY6Fc?autoplay=1"
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </a>
                  </li>
                <li>
                  <strong>Practice Self-Care:</strong> Remember to prioritize
                  self-care as you embark on your skill development journey.
                  Taking care of your physical and mental well-being is crucial
                  for being an effective parent. Explore our resources on
                  self-care to maintain a healthy work-life balance.
                  <br />
                  <a href="https://www.youtube.com/watch?v=MjY6aRQkdSI" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/MjY6aRQkdSI?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Celebrate Milestones:</strong> Celebrate your
                  achievements and milestones along the way. Whether it's
                  successfully implementing a new parenting strategy or
                  witnessing positive changes in your family dynamics,
                  acknowledging these milestones will keep you motivated.
                  <br />
                  <a href="https://www.youtube.com/watch?v=9HE9BAr9iI0" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/9HE9BAr9iI0?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Seek Guidance and Support:</strong> If you face
                  challenges or need guidance, don't hesitate to reach out to our
                  team of experts. We're here to support you and provide
                  personalized advice based on your unique circumstances.
                  <br />
                  <a href="https://www.youtube.com/watch?v=kBTMGryV2q4" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/kBTMGryV2q4?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
                <li>
                  <strong>Share Your Journey:</strong> Share your skill
                  development journey with other parents through blog posts or
                  testimonials. Your experiences can inspire and motivate others
                  who are also on the path to becoming confident and effective
                  parents.
                  <br />
                  <a href="https://www.youtube.com/watch?v=xO0Y06zq-bM" target="_blank" rel="noopener noreferrer" className="tip-link">
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/xO0Y06zq-bM?autoplay=1"
                      title="YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </a>
                </li>
                <li>
                  <strong>Embrace Lifelong Learning:</strong> Remember that skill
                  development is an ongoing process. Embrace the mindset of
                  lifelong learning and continue seeking opportunities to
                  expand your knowledge and skills as a parent. Stay curious,
                  explore new topics, and adapt your parenting strategies as
                  your children grow and develop.
                  <br />
                  <a href="https://www.youtube.com/watch?v=BQbufwSqxpU" target="_blank" rel="noopener noreferrer" className="tip-link">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/BQbufwSqxpU?autoplay=1"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </a>
                </li>
              </ol>
              <p>
                Skill development is a lifelong journey, and at ParentPathIN, we
                are committed to providing you with the resources, guidance, and
                support you need to enhance your skills as a parent. Explore our
                platform, engage with our community, and embark on an enriching
                skill development experience.
              </p>
              <Form className="mt-5">
                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                </Form.Group>
                <button className="btn btn-primary" type="submit">
                  Submit
                  </button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
}

export default SkillDevelopment;