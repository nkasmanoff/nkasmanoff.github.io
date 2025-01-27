import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
          About Me
        </h2>
        <div className="bg-card text-card-foreground backdrop-blur-sm rounded-lg p-6 shadow-lg border border-border mb-8">
          <p className="text-lg text-foreground leading-relaxed">
          I'm a Data Scientist at AE Studio in NYC, using AI to drive real-world solutions. I'm always looking to learn, grow, and make a difference.
          </p>
          <br />
          <p className="text-lg text-foreground leading-relaxed">            
          My background is a mix of astronomy, physics, and machine learning. I graduated from the University of Maryland, College Park with a B.S. in Physics and Astronomy, and New York University with a M.S. in Data Science.  
          During my studies, I conducted research at organizations like NASA, US Food & Drug Administration, the Flatiron Institute, and NYU Langone Health.
          </p>          

          <br />
          <p className="text-lg text-foreground leading-relaxed">            
          Post-grad, I worked on cutting-edge projects with the Frontier Development Lab and as a Full Stack Engineer in fintech. Now, I'm part of AE Studio's Data Science team, bringing a founder level mentality to my work as a Consultant.
          </p>          

          <br />          
          <p className="text-lg text-foreground leading-relaxed">            
          When I'm not working, you'll find me running, geeking out on Star Trek, reading, experimenting with Raspberry Pis, or staying current on tech and AI advancements.
          </p>          
        </div>

        {/* Shoe-horned Accomplishments Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
            My Widgets 
          </h3>
          <div className="bg-card text-card-foreground backdrop-blur-sm rounded-lg p-6 shadow-lg border border-border">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Trendshift Badge */}
              <div className="flex-shrink-0">
                <a 
                  href="https://trendshift.io/repositories/10159" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 transition-opacity"
                >
                  <img 
                    src="https://trendshift.io/api/badge/repositories/10159" 
                    alt="nkasmanoff%2Fpi-card | Trendshift" 
                    width="250" 
                    height="55"
                    className="rounded-md"
                  />
                </a>
              </div>
              
              {/* Strava Widget */}
              <div className="flex-shrink-0">
                <iframe 
                  height='154' 
                  width='300' 
                  frameBorder='0' 
                  allowTransparency='true' 

                  src='https://www.strava.com/athletes/84024114/latest-rides/50bb16f4ea78240738ca023b14a9caba581f81f0'
                  title="Strava Activities"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 