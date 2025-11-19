// components/Projects.js
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const projects = [
    {
        title: 'Model-Zempic',
        description:
            'Hackathon winning project. Aligned and steered models through interventions to model weights based on diffing and and continual pre-training.',
        tech: ['Model Alignment', 'Steering Vectors', 'Weight Diffing', 'Hackathon Winner'],
        image: '/images/model-zempic.svg',
        link: 'https://hack-2025-model-zempic-production.up.railway.app/',
    },
    {
        title: 'Doomscroll Detector',
        description: 'Browser extension to monitor and reduce addictive scrolling on X.',
        tech: ['Chrome Extension', 'Llama3', 'Typescript', 'Next.js', 'TailwindCSS'],
        image: 'https://www.doomscrolldetector.com/xdoomscroll.png',
        link: 'https://www.doomscrolldetector.com/',
    },
    {
        title: 'SDO FM',
        description: 'A Foundation Model for the Solar Dynamics Observatory.',
        tech: ['PyTorch', 'Hugging Face', 'Self-Supervised Learning'],
        image: 'https://www.nasa.gov/wp-content/uploads/2023/03/20140824_0304_171.jpg?w=1041',
        link: 'https://arxiv.org/abs/2410.02530',
    },
    {
        title: 'Pi-C.A.R.D',
        description: 'Fast local assistant hosted on a Raspberry Pi.',
        tech: [
            'LLM fine-tuning',
            'Text to speech',
            'Speech to text',
            'Multi-modal AI',
            'Agentic AI',
        ],
        image: 'https://raw.githubusercontent.com/nkasmanoff/pi-card/refs/heads/main/assets/assistant.png',
        link: 'https://github.com/nkasmanoff/pi-card',
    },
    {
        title: 'MLX Framework',
        description:
            'Implemented LLaVA, a vision language model, in MLX, a framework for building AI applications for Apple devices.',
        tech: ['Computer Vision', 'Inference', 'Model architecture'],
        image: 'https://avatars.githubusercontent.com/u/102832242?s=200&v=4',
        link: 'https://github.com/ml-explore/mlx-examples/tree/main/llava',
    },

    {
        title: 'LitGPT',
        description: 'Found and resolved bugs in the LitGPT project and added a new feature.',
        tech: ['LLM', 'Inference', 'Model architecture'],
        image: 'https://avatars.githubusercontent.com/u/58386951?s=200&v=4',
        link: 'https://github.com/Lightning-AI/litgpt',
    },

    {
        title: 'FloodBrain',
        description:
            'Flood Disaster Reporting by Web-based Retrieval Augmented Generation with an LLM.',
        tech: ['Retrieval Augmented Generation (RAG)', 'Humanitarian AI', 'UI Design'],
        image: 'https://www.refficiency.org/wp-content/uploads/2024/06/Picture-1-5.png',
        link: 'https://arxiv.org/abs/2311.02597',
    },
    {
        title: 'NYC GPT Hackathon',
        description: 'Semantic search for Hugging Face datasets.',
        tech: ['Data scraping', 'Vector DBs', 'Langchain'],
        image: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/left-pointing-magnifying-glass.png',
        link: 'https://github.com/nkasmanoff/searching-face',
    },
    {
        title: 'NASA Harvest Field Boundary Detection Challenge',
        description: 'A competition to detect field boundaries in satellite imagery.',
        tech: ['Remote Sensing', 'PyTorch', 'Hugging Face'],
        image: 'https://zindi-public-release.s3.eu-west-2.amazonaws.com/uploads/competition/image/331/thumb_21ba8a01-ef4a-43c4-af10-8c5bab32d572.png',
        link: 'https://github.com/nkasmanoff/nasa_harvest_challenge',
    },

    {
        title: 'Land Cover Analysis',
        description: 'Training a remote sensing model on a Jetson Nano 2GB.',
        tech: ['Remote Sensing', 'Jetson Nano', 'PyTorch'],
        image: 'https://d29g4g2dyqv443.cloudfront.net/sites/default/files/akamai/embedded/images/jetsonCommunity/community-nyc_land_cover_analysis.jpg',
        link: 'https://developer.nvidia.com/embedded/community/jetson-projects/nyc_land_cover_analysis',
    },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-cyan-400">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <a
                        href={project.link}
                        key={index}
                        className="transition-transform hover:scale-105 no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-cyan-500/20 backdrop-blur-sm h-full">
                            <div className="relative w-full h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-slate-800 dark:text-cyan-400">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-slate-600 dark:text-gray-300">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-blue-50 text-blue-700 dark:bg-cyan-900/50 dark:text-cyan-300 px-2 py-1 rounded-full text-sm dark:border dark:border-cyan-500/20"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
            <div className="flex justify-center mt-8">And many more!</div>
        </section>
    );
};

export default Projects;
