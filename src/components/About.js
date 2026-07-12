import React from 'react';

/** June 2021 start; years = ceil(elapsed months / 12). */
function experienceYearsPlus() {
    const start = new Date(2021, 5, 1); // June (month 0-indexed)
    const now = new Date();
    let months =
        (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (now.getDate() < start.getDate()) {
        months -= 1;
    }
    return Math.max(1, Math.ceil(months / 12));
}

const About = () => {
    const yearsExperience = experienceYearsPlus();
    return (
        <section id="about" className="py-32 bg-muted/30 font-mono">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
                    About Me
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            I am a Machine Learning Engineer with {yearsExperience} years of
                            experience building production AI systems across NLP, computer vision,
                            and agentic applications.
                        </p>
                        <p>
                            Currently, I am a Consulting Applied AI Engineer at{' '}
                            <a href="https://pure.ai" target="_blank" rel="noopener noreferrer">
                                Everpure
                            </a>{' '}.
                        </p>
                        <p>
                            In my prior roles, I served as a Senior Data Scientist at Agency Enterprise, ML Team Lead at the Frontier Development Lab
                            (in partnership with ESA & NVIDIA) and a Full Stack / Machine Learning Engineer at Dwight Funding.
                            I originally trained in Physics and Astronomy (UMD), where I interned at NASA Goddard. After which I earned an M.S. in Data Science from NYU.
                        </p>
                        <p>
                            When I'm not coding, you'll find me running, geeking out on Star Trek,
                            or tinkering with local AI.
                        </p>

                        <div className="pt-4">
                            <h3 className="text-foreground font-semibold mb-2">
                                Core Technologies
                            </h3>
                            <p className="text-sm bg-background/50 p-4 rounded-lg border border-border/50">
                                Python • PyTorch • LLMs & Agents • RAG • Hugging Face • TypeScript •
                                FastAPI • Docker
                            </p>
                        </div>
                    </div>

                    {/* Widgets Column */}
                    <div className="flex flex-col items-center justify-center gap-8 h-full w-full">
                        <div className="w-full max-w-[420px] space-y-8 flex flex-col items-center">
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
                                        width="350"
                                        height="77"
                                        className="rounded-md shadow-sm"
                                    />
                                </a>
                            </div>

                            {/* Strava Follow Badge */}
                            <div className="w-full flex justify-center">
                                <a
                                    href="https://strava.com/athletes/84024114"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="strava-badge"
                                >
                                    <img
                                        src="https://badges.strava.com/echelon-sprite-48.png"
                                        alt="Strava"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
