import React from 'react';

const SecondPost = () => {
    return (
        <article className="mx-auto py-16 px-4 font-['Inter',sans-serif] text-lg max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">
                My Tamagotchi is an RL Agent Playing Slither.io
            </h1>
            <p className="text-sm text-gray-500 mb-8">December 22, 2025</p>

            <div className="mb-8">
                <img
                    src="/images/hostedversion.png"
                    alt="Hosted Version"
                    className="mx-auto max-w-md rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                    A picture of this project running on my Raspberry Pi. (Sent through Gemini to
                    blur my monitor).
                </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="font-semibold">⚠️ Vibe code alert ⚠️</p>
                <p className="mt-2">
                    Most of this project built with Cursor/Claude's help. I went back to review most
                    things after getting the code running, but surprisingly little of this was made
                    by me alone. More on this at the end.
                </p>
            </div>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Background / Motivation</h2>
            <p className="mb-6">
                Recently, I started playing{' '}
                <a href="https://slither.io/" className="text-blue-600 hover:underline">
                    Slither.io
                </a>{' '}
                again. If you haven't tried, it's basically a multi-player snake game where the
                objective is to eat as much as possible while staying inbounds, and not running into
                other snakes. It's a simple premise, but with the randomness of other players and
                fun looking UI, it can be addicting.
            </p>
            <p className="mb-6">
                The whole time while playing, I got reminiscent of OpenAI's Gym, and how fun it was
                to watch agents learn to play simple games (I also learned OpenAI Universe used to
                have an environment for Slither.io, but this was after already starting this
                project, and Universe is already deprecated). With that nostalgia in my mind and
                time in my hands, I decided to build this project, and see how well autonomous
                programs can do in Slither.io. Side note: I know bots are prevalent in the game,
                some for cheating, and others that have "(bot)" in the username, but I couldn't
                figure out how those work, and my goal here was to build a bot that lived to the
                spirit of the game, grow as large as possible, as quickly as it can without dying.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Getting the game running</h2>
            <p className="mb-6">
                The first challenge was figuring out how to actually play the game programmatically.
                I knew it would be possible to navigate to the page with Selenium and click the
                "play" button to start the game, but the next challenge was figuring out how to
                control the snake. Initially I thought about using computer use agents or simulating
                key presses, but after chatting with Claude through the Cursor Agent Chat UI, I
                learned I could inject JavaScript directly into the browser to control the snake.
            </p>
            <p className="mb-6">
                Through trial and error with loading the page and attempting run various commands
                and then returning debugging outputs to the AI, I was able to get the snake to move
                in a direction I wanted it to.
            </p>
            <p className="mb-6">
                The internal game state is stored in global JavaScript variables that we can access
                directly. The{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">SlitherController</code> class uses
                Selenium to inject JavaScript that reads:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`# Set mouse position to control direction
window.xm = offset_x
window.ym = offset_y
document.dispatchEvent(mousemove_event)`}</code>
            </pre>
            <p className="mb-6">
                Based on this, you can move the relative position to be <em>any</em> angle from the
                center of the screen, effectively emulating exactly what a human with a mouse would
                do. Later on, this will be discretized to a fixed set of actions to simplify the
                action space.
            </p>
            <p className="mb-6">
                Another side note: by clicking while playing and having a sufficient length, you can
                boost the snake to move faster. This is useful for getting away from danger, or
                attacking other snakes. For now, I am not giving this option to the bots.
            </p>
            <p className="mb-6">
                Now that the action space was defined, the next up was the observation space. What
                could we condition on to decide what action to take?
            </p>
            <p className="mb-6">
                I played with the idea of using computer vision and annotating a dataset with{' '}
                <a
                    href="https://universe.roboflow.com/search?q=like%3Aself-wgbbx%2Fslither-io-t8avj"
                    className="text-blue-600 hover:underline"
                >
                    Roboflow
                </a>
                , but knew this would make the model too slow to be practical, especially on a CPU.
                Again chatting with Cursor/Claude, I discovered that Slither.io stores more of its
                state in global JavaScript variables that we can access directly (huge!):
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">window.snake</code>
                    </strong>
                    : The player's snake object (position, angle, length, speed)
                </li>
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">window.slithers</code>
                    </strong>
                    : Array of all snakes in the game (including enemies and all parts of their
                    bodies)
                </li>
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">window.foods</code>
                    </strong>
                    : Array of food pellets in the world
                </li>
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">window.preys</code>
                    </strong>
                    : Special high-value food items that appear when snakes die
                </li>
            </ul>
            <p className="mb-6">
                Using that information it's possible to reconstruct the entire game state. However,
                rather than use all information in a grid form, I decided on a vector of features
                that was iteratively improved on, but allowed for a fast extraction of the
                information needed to tell the snake what do.
            </p>
            <p className="mb-6">The final observation space was:</p>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>current_angle_norm</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Snake's heading as discrete action index / 12
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>snake_length</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Log-normalized snake length
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>nearest_food_dist</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Distance to nearest food (tanh-normalized)
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>food_action</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Which discrete action points toward food
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>nearest_prey_dist</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Distance to nearest prey (high-value food)
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>prey_action</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Which discrete action points toward prey
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>nearest_enemy_dist</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Distance to nearest enemy body
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>enemy_action</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Which discrete action points toward enemy
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>nearest_enemy_head_dist</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Distance to enemy head specifically
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>num_foods/preys/enemies</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">Normalized counts</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>food_efficiency</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Weighted inverse-distance to nearby food
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>enemy_threat</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Overall threat level from nearby enemies
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>danger_front/right/back/left</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Danger level in each quadrant
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>immediate_danger_*</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Binary: enemy very close in front/right/left
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">
                                <code>last_action_sin/cos</code>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                Sin/cos encoding of last action (temporal context)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mb-6">
                Now is a good time to mention one of the key design constraints of the project:
                Slither.io plays in real time, so the longer it takes to go from observation to
                action, the less useful observation space is. Extracting the state information from
                Javascript was a good compromise in this case. So while adding more features to the
                observation space would improve aspects of the bot, it would also compromise its
                speed.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Training</h2>
            <p className="mb-6">
                Now that the action and observation spaces were defined, the next up was training
                the bot.
            </p>
            <p className="mb-6">
                This was also something that went through a lot of trial and error, and I can tell
                you few things are more frustrating than watching your bot turn away from from a
                cluster of food at the last second, or seemingly intentionally ram straight into
                other snakes. That said, seeing the inverse happen was also quite fun!
            </p>
            <p className="mb-6">
                I started with <strong>REINFORCE</strong>, a vanilla policy gradient algorithm. The
                core idea is simple:
            </p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">Play an episode using the current policy</li>
                <li className="mb-2">Collect all the rewards</li>
                <li className="mb-2">
                    Compute the return (discounted sum of future rewards) for each step
                </li>
                <li className="mb-2">
                    Update the policy to increase the probability of actions that led to high
                    returns
                </li>
            </ol>
            <p className="mb-6">
                But due to the natural limitations of the policy gradient, I also implemented{' '}
                <strong>A2C (Advantage Actor-Critic)</strong> to address these issues by:
            </p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    Learning a value function alongside the policy (the "critic")
                </li>
                <li className="mb-2">Using advantages instead of raw returns to reduce variance</li>
                <li className="mb-2">
                    Updating during episodes via N-step rollouts (every 64 steps)
                </li>
                <li className="mb-2">
                    Using Generalized Advantage Estimation (GAE) for better bias-variance tradeoff
                </li>
            </ol>
            <p className="mb-6">
                While I haven't done a direct comparison, I think N-step rollouts and GAE are a
                crucial improvement for using A2C. Games can last tens to hundreds of steps, so
                learning at more frequent intervals offers more signal into when the bot is making
                poor choices to learn on.
            </p>
            <p className="mb-6">
                Since 2 networks are being trained, and updates are made every 64 steps, using an
                efficient architecture was important. The final network architecture was a 3-layer
                MLP with 192 hidden units:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`class ActorCriticNetwork(nn.Module):
    def __init__(self, state_dim, num_actions=12, hidden_dim=192):
        super().__init__()
        self.shared = nn.Sequential(
            nn.Linear(state_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
        )
        self.action_head = nn.Linear(hidden_dim, num_actions)
        self.value_head = nn.Linear(hidden_dim, 1)`}</code>
            </pre>
            <p className="mb-6">
                The network takes the 23-dimensional state vector and outputs a probability
                distribution over 12 discrete actions (directions at 30° intervals).
            </p>
            <p className="mb-6">
                As part of the same mind-numbing observation of agents on earlier versions of this
                project, shaping the reward function was a trial and error process. This is the
                final reward function that was used, calculated on each step:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`reward = 0.0

# Reward for eating food (growing)
reward += length_increase * 1.0

# Small survival bonus
reward += 0.01

# Danger proximity penalties
if min_danger_dist < 60:      # Critical danger zone
    reward -= 0.5
elif min_danger_dist < 120:   # High danger
    reward -= 0.2
elif min_danger_dist < 200:   # Moderate danger
    reward -= 0.05

if done:
    reward -= 5.0                  # Death penalty
    reward += current_length * 0.01  # Small bonus for length achieved`}</code>
            </pre>
            <p className="mb-6">
                There is a lot of signal here: the bot is rewarded for growing, and punished for
                getting too close to danger. This is a good balance of immediate rewards (food) and
                long-term goals (survival). My original vision of this reward was to only reward the
                bot for eating food, and even penalizing for every time-step it was alive for. I
                wanted to teach the agent to grow as quickly as possible, but this lack of signal
                made training difficult.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Results</h2>
            <div className="mb-8">
                <img
                    src="/images/gameplay.gif"
                    alt="Slither.io Gameplay"
                    className="mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                    The trained A2C agent navigating the Slither.io environment, seeking food while
                    avoiding other snakes. Please note that any gameplay that also has to be
                    recorded ends up being worse / laggy, since the program has more work to do
                    aside from just playing the game.
                </p>
            </div>
            <p className="mb-6">
                After much iteration (see appendix for a summary of all the various approaches
                tried), I trained the agent for 50 episodes of A2C (roughly 2 hours on a 2021
                Macbook Pro, M1 chip 8GB RAM). Here are the results:
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Training Progression</h3>
            <div className="mb-8">
                <img
                    src="/images/training_metrics_a2c_20251222_112938.png"
                    alt="A2C Training Metrics"
                    className="mx-auto rounded-lg shadow-lg"
                />
            </div>
            <p className="mb-6">
                In addition to the standard variance you'd expect in plots like these, slither.io is
                especially noisy due to random spawn locations and other players' behavior. But the
                rolling averages trend upward. Policy loss stabilizes, indicating that the agent has
                converged to a strategy that is working.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Agent Comparison</h3>
            <p className="mb-6">I compared multiple approaches over 10 inference games each:</p>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Agent</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Mean Length
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Max Length
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Mean Steps
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Mean Reward
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Rules-Based Policy</td>
                            <td className="border border-gray-300 px-4 py-2">46.8</td>
                            <td className="border border-gray-300 px-4 py-2">116</td>
                            <td className="border border-gray-300 px-4 py-2">107.9</td>
                            <td className="border border-gray-300 px-4 py-2">-35.5</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">A2C Random Weights</td>
                            <td className="border border-gray-300 px-4 py-2">91.4</td>
                            <td className="border border-gray-300 px-4 py-2">144</td>
                            <td className="border border-gray-300 px-4 py-2">336.0</td>
                            <td className="border border-gray-300 px-4 py-2">67.04</td>
                        </tr>
                        <tr className="font-bold">
                            <td className="border border-gray-300 px-4 py-2">A2C Final Model</td>
                            <td className="border border-gray-300 px-4 py-2">129.6</td>
                            <td className="border border-gray-300 px-4 py-2">274</td>
                            <td className="border border-gray-300 px-4 py-2">389.8</td>
                            <td className="border border-gray-300 px-4 py-2">101.65</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">A2C Best Model</td>
                            <td className="border border-gray-300 px-4 py-2">57.3</td>
                            <td className="border border-gray-300 px-4 py-2">94</td>
                            <td className="border border-gray-300 px-4 py-2">227.7</td>
                            <td className="border border-gray-300 px-4 py-2">33.11</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mb-6">
                Where this rules based policy is a relatively simple if-then logic which flees from
                enemies, and goes for food when safe. It's not particularly impressive, but it's a
                good baseline to compare against.
            </p>
            <p className="mb-6">
                <strong>Key findings:</strong>
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    The <strong>A2C Final Model outperforms all others</strong> with mean length of
                    129.6 and max length of 274
                </li>
                <li className="mb-2">
                    The <strong>best-by-length model performs worse than the final model</strong>,
                    indicating that saving based on a single good episode doesn't always yield the
                    best generalization
                </li>
            </ul>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Conclusion</h2>
            <p className="mb-6">
                This project was a good re-introduction to how reinforcement learning can be applied
                to games, especially games that are real-time and played in the browser. By
                extracting game state via JavaScript injection and using policy gradient methods
                (A2C), I built an agent that learns to play Slither.io relatively quickly. While
                it's not achieving true parity with human players (if you open this game now and
                just go for food you will probably beat it) it's fun to watch it learn through it's
                games, and especially cool to see as a standalone application, running on a
                standalone device like a little pet. While I'm not sure how much more I'll put into
                improving this agent specifically, the project itself has opened up a lot of ideas
                for how easy / fun it is to build and train agents for games. I've already started
                thinking about doing the same sorts of things here for{' '}
                <a href="https://2048.io" className="text-blue-600 hover:underline">
                    2048
                </a>
                .
            </p>
            <p className="mb-6">
                More information on this project and how to run it yourself is available on the{' '}
                <a
                    href="https://github.com/nkasmanoff/slither-bot"
                    className="text-blue-600 hover:underline"
                >
                    GitHub repository
                </a>
                .
            </p>
            <p className="mb-6">
                Thanks for reading! Stick around a bit longer for some other thoughts I had on this
                work
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Key Takeaways</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    AI coding tools make it especially easy to build reinforcement learning
                    environments, especially when they are coming from browser games.
                </li>
                <li className="mb-2">
                    AI coding tools can also make the algorithmic implementations themselves, but if
                    you automate too much of the project you are going to walk away with a lot less
                    knowledge than if you had done it yourself.
                </li>
                <li className="mb-2">
                    Real-time RL can work on Slither.io, and can also be fast enough to run on a
                    Raspberry Pi.
                </li>
            </ul>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Appendix</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Related Work</h3>
            <p className="mb-6">
                I would be remiss if I did not include some awesome related work on the same idea.
                Most notably is{' '}
                <a
                    href="https://cs229.stanford.edu/proj2019aut/data/assignment_308832_raw/26588099.pdf"
                    className="text-blue-600 hover:underline"
                >
                    this project
                </a>
                . The key difference here is that the project uses Deep Q Learning, an off policy
                technique, along with (condensed) image inputs to represent the game state. Their
                median final length ended being around 54, much less than the 129.6 I achieved here.
                Having a coding assistant and almost 6 years of more development in the AI space
                definitely helps. I also reviewed{' '}
                <a
                    href="https://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1262&context=cpesp"
                    className="text-blue-600 hover:underline"
                >
                    this paper
                </a>{' '}
                again from the 2010s, and using computer vision.
            </p>
            <p className="mb-6">
                Notably I did not see much work that used the game state as is provided on the
                browser, or in settings that were truly online. This{' '}
                <a
                    href="https://github.com/BabakAkbari/Slither.io-AI"
                    className="text-blue-600 hover:underline"
                >
                    code
                </a>{' '}
                looked interesting, but I didn't investigate much since it did not use the online
                game.
            </p>
            <p className="mb-6">If I missed something please let me know.</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Using AI to automate this project</h3>
            <p className="mb-6">
                I've been using Cursor for over a year, and tab complete models for longer than
                that. The biggest difference I felt while doing this project especially was how easy
                it was to get the AI to write code for me. This is extremely helpful for things I
                don't personally want to spend time, but can validate quickly. This included stuff
                like extracting the game state and other details from the browser. On the flip side,
                the agent also wrote stuff like the training loop, helped me brainstorm
                optimizations to the reward function and observation space, and wrote out all the RL
                algorithms. That part felt less scarier to me, because part of why I did a project
                like this to begin with was to re-familiarize myself with RL algorithms, and use my
                own critical thinking to improve anything associated with the observation space and
                reward functions. The fact that you can now just say "make this better" is pretty
                impressive to the way it can help for simpler settings like this, but I'm not
                entirely convinced it would work once the scenarios complex, or if it knows how to
                catch it's own mistakes when building models. So while it was great the boilerplate
                and tedious code associated with making a reinforcement learning environment is much
                easier to write, I'm a bit skeptical of the benefits when it can also take away my
                knowing the fundamentals of algorithms, and think critically about other design
                choices.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Other ideas tried</h3>
            <p className="mb-6">
                As a quick rebuttal to the point above, thankfully I did have the foreknowledge of
                training RL agents where I could contemplate other setups, and used that to test
                MANY ideas in this project. This included:
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Trying a continuous action space instead of a discrete one</li>
                <li className="mb-2">
                    Trying many variations of the reward function where each step is penalized to
                    encourage the agent to find food quicker
                </li>
                <li className="mb-2">
                    A quick attempt at PPO to see if it would be a better fit than A2C
                </li>
                <li className="mb-2">
                    Many different network architectures, mostly varying the MLP hidden units and
                    number of layers
                </li>
                <li className="mb-2">
                    Playing the game myself, and training the model via behavioral cloning as a
                    pretraining technique
                </li>
            </ul>
            <p className="mb-6">
                In the end, I stuck with A2C since it was simple enough to understand, worked above
                baseline, and not too computationally intensive once done one my Raspberry Pi.
            </p>
        </article>
    );
};

export default SecondPost;
