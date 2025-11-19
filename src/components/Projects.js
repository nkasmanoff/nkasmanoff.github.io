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
        title: 'Moondream-GRPO',
        description:
            'Built reinforcement learning training infrastructure for vision-language models, enabling iterative improvement of object detection performance through policy optimization and custom IoU-based reward shaping.',
        tech: ['RLHF', 'Vision-Language Models', 'GRPO', 'Weights & Biases'],
        image: 'https://miro.medium.com/v2/1*IBSrfnY3ULbBsxi6RD2kdg.jpeg',
        link: 'https://github.com/nkasmanoff/moondream-grpo',
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
        <section id="projects" className="py-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <a
                        href={project.link}
                        key={index}
                        className="group block h-full no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Card className="h-full overflow-hidden border-border/50 bg-card hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                            <div className="relative w-full h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-gray-500/10"
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
            <div className="flex justify-center mt-12 text-muted-foreground">
                <p>And many more!</p>
            </div>
        </section>
    );
};

export default Projects;
