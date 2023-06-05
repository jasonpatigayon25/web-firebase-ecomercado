import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 20000);

  return () => clearTimeout(fadeOutTimeout);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };
  const user = {
    quote: "All is well",
    email: "example@gmail.com",
    age: 28,
    country: "Philippines",
    skills: "Good English Speaker, Cooking, Photo Editing,",
    image: process.env.PUBLIC_URL + "/user-image.png" 
  };

  const socialMediaPosts = [
    {
      id: 1,
      by: "user1",
      image: process.env.PUBLIC_URL + "/post1.jpg",
      title: "About a Single Parent Hardwork",
      content: "Being a single mom is challenging, but my kids give me the strength to keep going. Every day, I work tirelessly to provide them with a better future.From juggling multiple jobs to late-night study sessions, I do whatever it takes to make ends meet and create opportunities for my children.It's not easy, but seeing their smiles and knowing that my efforts make a difference in their lives is incredibly rewarding To all the single moms out there, remember that your hard work and dedication are shaping the lives of your children. You are an inspiration!",
    },
    {
      id: 2,
      by: "user2",
      image: process.env.PUBLIC_URL + "/post2.webp",
      title: "We are Hiring",
      content: "Attention all single parents! We have exciting job opportunities available in the clothing industry. Are you passionate about fashion? Do you have experience in retail, customer service, or design? We are looking for dedicated individuals who can contribute their skills and expertise to our team. Join us and be a part of a thriving community that values diversity, creativity, and hard work. Don't miss out on this chance to embark on a fulfilling career path. Apply now and unleash your potential!",
    },
    {
      id: 3,
      by: "user3",
      image: process.env.PUBLIC_URL + "/post3.jpg",
      title: "Finding Strength as a Single Parent",
      content: "To all the incredible single parents out there: You are stronger than you realize. Balancing work, household responsibilities, and parenting is no easy task, but remember that you are not alone. Your dedication, resilience, and unconditional love for your children are admirable. Even on the toughest days, keep going. Your hard work is shaping the future for your little ones. Believe in yourself, stay positive, and never forget that you are capable of achieving great things. Your journey may have its ups and downs, but know that you are making a difference. Keep inspiring others with your strength and determination. You are an inspiration!",
    },
    {
      id: 4,
      by: "user4",
      image: process.env.PUBLIC_URL + "/post4.jpg",
      title: "Enhancing Skills for Better Job Opportunities",
      content: "To all the incredible single parents out there: You are stronger than you realize. Balancing work, household responsibilities, and parenting is no easy task, but remember that you are not alone. Your dedication, resilience, and unconditional love for your children are admirable. Even on the toughest days, keep going. Your hard work is shaping the future for your little ones. Believe in yourself, stay positive, and never forget that you are capable of achieving great things. Your journey may have its ups and downs, but know that you are making a difference. Keep inspiring others with your strength and determination. You are an inspiration!"
    },
    {
      id: 5,
      by: "user5",
      image: process.env.PUBLIC_URL + "/post5.jpg",
      title: "Celebrating the Strength of Single Parents",
      content: "Are you a single parent looking to improve your skills and seize better job opportunities? Invest in yourself by seeking training programs and courses that align with your interests and career goals. Continuous learning and upskilling can open doors to new possibilities. Explore online resources, community colleges, or vocational training centers that offer relevant courses. Remember, acquiring new skills not only enhances your employability but also boosts your confidence and personal growth. Embrace the journey of self-improvement and be proactive in pursuing career advancements. The right skills, combined with your dedication and determination, will help you create a brighter future for yourself and your family. Seize the opportunities that come your way and show the world what you're capable of!",
    },
  ];

  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #D6D1E1, #C1B9D7' }}>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#FFFFFF' }}>
        <img src={process.env.PUBLIC_URL + "/Logo.png"} width="60" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />
        <div className="container">
          <form className="d-flex justify-content-center" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "400px", borderColor: "#726A8A" }}
            />
            <button className="btn btn-outline-purple" type="submit" style={{ borderColor: "#726A8A" }}>
            <img src={process.env.PUBLIC_URL + "/search.png"} alt="Home" className="nav-icon" />
          </button>
          </form>
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
      
      {showWelcomeMessage && (
        <p className="welcome-message" style={{ color: "#726A8A", fontSize: "21px"  }}>
          Hello {location.state?.id} and welcome to ParentPathIN!
        </p>
      )}
      <div className="container mt-5">
              <div className="row">
                <div className="col-lg-4" style={{ maxWidth: "calc(33.333% - 100px)" }}>
                  <div className="card">
                    <div className="card-body">
                    <img src={user.image} alt="User" className="user-image" />
                      <h5 className="card-title">{location.state?.id}</h5> 
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Age:</strong> {user.age}
                      </p>
                      <p>
                        <strong>Country:</strong> {user.country}
                      </p>
                      <p>
                        <strong>Skills:</strong> {user.skills}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4" style={{ width: "calc(33.333% + 200px)" }}>
                  <div className="card">
                    <div className="card-body">
                      <div className="scrollable-card">
                        {socialMediaPosts.map((post) => (
                          <div className="post" key={post.id}>
                            <h6>By: {post.by}</h6>
                            <img src={post.image} alt={post.title} width="520" height="280" 
                              style={{ display: 'block', margin: '0 auto' }}/>
                            <h6>{post.title}</h6>
                            <p style={{ textAlign: 'justify', textJustify: 'distribute' }}>{post.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4" style={{ maxWidth: "calc(33.333% - 100px)" }}>
                  <div className="card">
                    <div className="card-body">
                  <h5 className="card-title">Work Suggestions</h5>   
                  <div className="work-suggestions">
                  <div className="work-suggestion">
                    <img src="https://example.com/image1.jpg" alt="Work 1" />
                    <button
                    className="btn btn-primary muted-purple"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#726A8A',
                      marginLeft: '10px',
                    }}
                  >
                    Apply Now
                  </button>
                  </div>
                  <div className="work-suggestion">
                    <img src="https://example.com/image1.jpg" alt="Work 1" />
                    <button
                    className="btn btn-primary muted-purple"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#726A8A',
                      marginLeft: '10px',
                    }}
                  >
                    Apply Now
                  </button>
                  </div>
                  <div className="work-suggestion">
                    <img src="https://example.com/image1.jpg" alt="Work 1" />
                    <button
                    className="btn btn-primary muted-purple"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#726A8A',
                      marginLeft: '10px',
                    }}
                  >
                    Apply Now
                  </button>
                  </div>
                  <div className="work-suggestion">
                    <img src="https://example.com/image1.jpg" alt="Work 1" />
                    <button
                    className="btn btn-primary muted-purple"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#726A8A',
                      marginLeft: '10px',
                    }}
                  >
                    Apply Now
                  </button>
                  </div>
                  <div className="work-suggestion">
                    <img src="https://example.com/image1.jpg" alt="Work 1" />
                    <button
                    className="btn btn-primary muted-purple"
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#726A8A',
                      marginLeft: '10px',
                    }}
                  >
                    Apply Now
                  </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;