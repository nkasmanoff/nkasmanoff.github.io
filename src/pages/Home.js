import React from "react";
import Headshot from '../images/headshot.png'
import Link from '@material-ui/core/Link';
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from '@material-ui/icons/Twitter';
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="about">




        <div className="prompt">
          <h1>Hello World!</h1>
          <h3>Welcome to my website.</h3>
         
          <Link href="https://www.linkedin.com/in/noahkasmanoff/"  target="_blank" >
                 <LinkedInIcon/>
              </Link>
              <Link href="mailto:nkasmanoff@gmail.com"  target="_blank" >
                 <EmailIcon/>
              </Link>              

          <Link href="https://github.com/nkasmanoff"  target="_blank" >
                 <GithubIcon/>
              </Link>
              <Link href="https://twitter.com/noahpunintended"  target="_blank" >
                 <TwitterIcon/>
              </Link>              
              <p> I'm Noah, an engineer devoted to exploring inter-disciplinary applications of machine learning and data science.
										 Along the way, the way, I have learned a lot about this field by working on projects in Cosmology, Business Analytics, Healthcare, Earth Science, and more.
										In my current role, I serve as a Full Stack / Machine Learning Engineer for a leading fintech start-up, <a href="https://dwightfunding.com/"  color="red">Dwight Funding</a>.
              </p>
        </div>


      </div>

      <div className="skills">
        <h1> Skills</h1>
        <ol className="list">
        <li className="item">
            <h2>Languages</h2>
            <span>Python, JavaScript, MATLAB, Shell Scripting</span>
          </li>    
          <li className="item">
            <h2>MLE Stack</h2>
            <span>PyTorch, HuggingFace, sci-kit learn, Flask, Docker, Git</span>
          </li>   
                                          
          <li className="item">
            <h2>SWE Stack</h2>
            <span>
              PostgreSQL, ReactJS, Redux, HTML, CSS, Tableau
            </span>
          </li>          
          <li className="item">
            <h2>Platforms</h2>
            <span>AWS, GCP</span>
          </li>            
        </ol>
      </div>
    </div>
  );
}

export default Home;