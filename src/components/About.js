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
            I am passionate about exploring inter-disciplinary applications of machine learning and data science. Along the way, I have learned a lot about this field by working on projects in Cosmology, Business Analytics, Healthcare, Earth Science, Finance, and more! In my free time I enjoy running, watching TV, reading, messing with my Raspberry Pis, and trying to keep up with the latest trends in tech & AI.
          </p>
          <br />
          <p className="text-lg text-foreground leading-relaxed">
            I am currently a Data Scientist at AE Studio, applying machine learning to solve real-world problems. I am always looking for opportunities to learn, grow, and use technology to make the world a better place, so feel free to reach out to me if you have any ideas or opportunities. reach out to me via email or LinkedIn!
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