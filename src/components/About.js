import React from 'react';

const About = () => {
    return (
        <section id="about" className="py-32 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
                    About Me
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            I am a Machine Learning Engineer with 4+ years of experience building
                            production AI systems across NLP, computer vision, and agentic
                            applications.
                        </p>
                        <p>
                            Currently, I'm a Data Scientist at AE Studio in NYC, where I lead
                            technical teams to deliver high-impact solutions—saving clients weeks of
                            manual work and translating complex technical requirements into tangible
                            business value.
                        </p>
                        <p>
                            Previously, I served as an ML Team Lead at the Frontier Development Lab
                            (in partnership with ESA & NVIDIA) and a Full Stack Engineer in fintech.
                            My background is rooted in Physics and Astronomy (UMD), where I started
                            my journey interning at NASA on the BurstCube spacecraft, followed by an
                            M.S. in Data Science from NYU.
                        </p>
                        <p>
                            When I'm not coding, you'll find me running, geeking out on Star Trek,
                            or experimenting with Raspberry Pis.
                        </p>

                        <div className="pt-4">
                            <h3 className="text-foreground font-semibold mb-2">
                                Core Technologies
                            </h3>
                            <p className="text-sm font-mono bg-background/50 p-4 rounded-lg border border-border/50">
                                Python • PyTorch • LLMs & Agents • RAG • Hugging Face • TypeScript •
                                FastAPI • Docker
                            </p>
                        </div>
                    </div>

                    {/* Widgets Column */}
                    <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
                        <div className="w-full max-w-[300px] space-y-8 flex flex-col items-center">
                            {/* Trendshift Badge */}
                            <div className="hover:opacity-80 transition-opacity w-full flex justify-center">
                                <a
                                    href="https://trendshift.io/repositories/10159"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://trendshift.io/api/badge/repositories/10159"
                                        alt="nkasmanoff%2Fpi-card | Trendshift"
                                        width="250"
                                        height="55"
                                        className="rounded-md shadow-sm"
                                    />
                                </a>
                            </div>

                            {/* Strava Widget */}
                            <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full flex justify-center">
                                <iframe
                                    height="154"
                                    width="300"
                                    frameBorder="0"
                                    allowTransparency="true"
                                    src="https://www.strava.com/athletes/84024114/latest-rides/50bb16f4ea78240738ca023b14a9caba581f81f0"
                                    title="Strava Activities"
                                    className="bg-background"
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
