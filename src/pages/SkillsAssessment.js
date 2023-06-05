import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  color: #726A8A;
`;

const Card = styled.div`
  background: #FFFFFF;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SkillsAssessment = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelect = (skill) => {
    const updatedSkills = [...selectedSkills];
    if (updatedSkills.includes(skill)) {
      updatedSkills.splice(updatedSkills.indexOf(skill), 1);
    } else {
      updatedSkills.push(skill);
    }
    setSelectedSkills(updatedSkills);
  };

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
      <hr style={{ backgroundColor: '#726A8A', height: '2px', margin: '0' }} />

      <Container>
      <Card style={{ width: '700px' }}>
        <h1>Skills Assessment</h1>
        <p>
          Take our skills assessment to evaluate your current skillset and discover areas for improvement. This assessment will
          help you identify your strengths and areas where you can focus on enhancing your skills to achieve your career goals.
        </p>

        <h2>Select the skills you possess:</h2>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                value="communication"
                checked={selectedSkills.includes('communication')}
                onChange={() => handleSkillSelect('communication')}
              />
              Communication
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="leadership"
                checked={selectedSkills.includes('leadership')}
                onChange={() => handleSkillSelect('leadership')}
              />
              Leadership
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="problem-solving"
                checked={selectedSkills.includes('problem-solving')}
                onChange={() => handleSkillSelect('problem-solving')}
              />
              Problem Solving
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="teamwork"
                checked={selectedSkills.includes('teamwork')}
                onChange={() => handleSkillSelect('teamwork')}
              />
              Teamwork
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="adaptability"
                checked={selectedSkills.includes('adaptability')}
                onChange={() => handleSkillSelect('adaptability')}
              />
              Adaptability
            </label>
          </li>
        </ul>

        <h2>Your selected skills:</h2>
        {selectedSkills.length > 0 ? (
          <ul>
            {selectedSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills selected.</p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={() => setSelectedSkills([])}>Reset</button>
        <button className="btn btn-primary" style={{ backgroundColor: '#726A8A', borderColor: '#726A8A', marginLeft: '10px' }}>Submit</button>
      </div>
      </Card>
    </Container>
    </div>
  );
};

export default SkillsAssessment;