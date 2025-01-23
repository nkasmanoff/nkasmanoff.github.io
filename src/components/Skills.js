// components/Skills.js
import React from 'react';

const skills = [
  'Python',
  'JavaScript',
  'PyTorch',
  'Docker',
  'Tableau',
  'LLMs',
  'React Js',
  'PostgreSQL',
  'Pandas',
  'Git/Github'
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-cyan-400">Skills / Stack</h2>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 dark:bg-cyan-900/50 dark:text-cyan-300 px-4 py-2 rounded-full text-lg font-medium dark:border dark:border-cyan-500/20 transition-transform hover:scale-105"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;