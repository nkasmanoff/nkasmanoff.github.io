import React from 'react'
import '../../pages/style.css';
import Typewriter from "typewriter-effect";

function Text() {
  return (
    <Typewriter
      options={{
        strings: [
          "🤖 ML Engineer",
          "💻 Full Stack Developer",
          "🧪 Data Scientist",
          "🏃, 🏀, 🏙️, 🖖, etc."
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  )
}

export default Text