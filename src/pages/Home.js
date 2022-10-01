import React from "react";
import Link from '@material-ui/core/Link';
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="about">
        <h2> Hello World</h2>
        <div className="prompt">
          <p>Noah Kasmanoff</p>
          <Link href="https://www.linkedin.com/in/noahkasmanoff/"  target="_blank" >
                 <LinkedInIcon/>
              </Link>
          <EmailIcon />
          <GithubIcon />
        </div>
        <h2> This page is a work in progress. Please come back soon :-)</h2>

      </div>
      <div className="skills">
        <h1> Skills</h1>
        <ol className="list">
          <li className="item">
            <h2> Front-End</h2>
            <span>
              ReactJS, Redux, HTML, CSS
            </span>
          </li>
          <li className="item">
            <h2>Back-End</h2>
            <span>
                Postgres
            </span>
          </li>
          <li className="item">
            <h2>Languages</h2>
            <span>JavaScript, Python, C, TypeScript, Shell</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Home;