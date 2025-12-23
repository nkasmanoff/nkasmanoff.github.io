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
                <p className="font-semibold">⚠️ Vibe research alert ⚠️</p>
                <p className="mt-2">
                    Most of this project built with Cursor/Claude's help. I went back to review most
                    things after getting the code running, but surprisingly little of this was made
                    by me alone. More on this at the end. I also used Cursor/Claude to help me write
                    this post, but mainly for any grammar corrections and embedding graphics / style
                    into the post.
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
                After watching what had to be dozens of episodes and reviewing the implementation
                for any bugs, I realized that the return estimation was likely not sufficient for
                capturing the long-term rewards and penalties the snake would face, like choosing to
                pursue a larger cluster of food further away, or getting away from snakes that are
                close but not yet attacking. So I decided to implement{' '}
                <strong>A2C (Advantage Actor-Critic)</strong> to (hopefully) address these issues
                by:
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
                I think N-step rollouts and GAE are a crucial improvement for using A2C. Games can
                last tens to hundreds of steps, so learning at more frequent intervals offers more
                signal into when the bot is making poor choices to learn on.
            </p>
            <p className="mb-6">
                Since 2 networks are being trained, and updates are made every 64 steps, using an
                efficient architecture was important. The final network architecture was a 3-layer
                MLP with 192 (chosen arbitrarily) hidden units:
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
                The decision to use discrete actions was motivated by the fact that if a continuous
                action space was used for all 360°, the translation function would need to be more
                complex to handle the fact that angles are circular (i.e. 0° is just as close to
                359° as it is to 1°).
            </p>
            <p className="mb-6">
                When I tasked Cursor/Claude to implement A2C, it's natural follow-up was to ask me
                if I wanted to also try <strong>PPO (Proximal Policy Optimization)</strong>. Who am
                I to deny such a kind offer?
            </p>
            <p className="mb-6">
                PPO builds on the actor-critic framework but addresses a key challenge: how do you
                update your policy without making changes so large that performance collapses?
                Think: the snake accidentally spawns near danger and prey at the same time and
                accidentally eats a ton of prey to grow to a massive size quickly. While this is
                great for a single game, it may collapse the policy of A2C and accidentally teach
                the snake to go for prey even if danger is too close. The core innovation of PPO is:
            </p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">Collect a batch of experiences using the current policy</li>
                <li className="mb-2">
                    Reuse this data for multiple training epochs (better sample efficiency)
                </li>
                <li className="mb-2">
                    Clip the policy update to prevent too-large changes from the old policy
                </li>
                <li className="mb-2">
                    The clipping ensures training is more stable and prevents catastrophic updates
                </li>
            </ol>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-r">
                <p className="font-semibold text-blue-900 mb-2">⚡ Real-Time Gameplay Constraint</p>
                <p className="text-blue-800">
                    While PPO is often considered the gold standard for many RL tasks due to its
                    stability and sample efficiency, its multiple training steps per batch create a
                    critical bottleneck for real-time gameplay. During PPO's 10 gradient update
                    steps, the game continues running on the server. This means the snake is moving,
                    dangers are appearing, and food is spawning while it's still computing and not
                    acting. A2C's single update per batch is fast enough to keep up with the game's
                    pace, when deployed on a Raspberry Pi or similar devices. This real-time
                    responsiveness becomes even more critical. Since I was using my Macbook Pro to
                    train, I felt less pressured by this, so I ran with all three methods and
                    compared their results.
                </p>
            </div>
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
                made training difficult. The small bonus for length achieved at the end of the
                episode helps balance the fact that the length increase reward may prefer going
                after big clusters of food over survival.
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
                <p className="text-sm text-gray-600 text-center mt-2 italic">
                    At the same time, this gif also gives a great visual for how the agent is
                    actually playing the game versus a human player. While when we (a person) play,
                    all actions and observation changes are essentially instantaneous. These agents
                    are operating at snapshots which while still rapid, are not the same as the
                    frame rate of the game, so there is an inevitable lag the agent must also find a
                    way to work with.
                </p>
            </div>
            <p className="mb-6">
                After much iteration (see appendix for a summary of all the various approaches
                tried), I trained the agent for 50 episodes of A2C, REINFORCE, and PPO (each taking
                roughly 1 hour on a 2021 Macbook Pro, M1 chip 8GB RAM). I did not find much
                improvement when these algorithms were trained over 100 or more episodes, so I stuck
                with 50 for this plot. Here are the results:
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Training Progression</h3>
            <div className="mb-8">
                <img
                    src="/images/algorithm_comparison_grid.png"
                    alt="Algorithm Comparison Grid"
                    className="mx-auto rounded-lg shadow-lg"
                />
            </div>

            <h4 className="text-xl font-semibold mt-6 mb-4">Training Performance Summary</h4>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Algorithm
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Episodes</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Best Reward
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Best Length
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Avg Reward
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Avg Length
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Avg Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">A2C</td>
                            <td className="border border-gray-300 px-4 py-2">50</td>
                            <td className="border border-gray-300 px-4 py-2">340.7</td>
                            <td className="border border-gray-300 px-4 py-2">365</td>
                            <td className="border border-gray-300 px-4 py-2">72.1</td>
                            <td className="border border-gray-300 px-4 py-2">93.8</td>
                            <td className="border border-gray-300 px-4 py-2">22.26</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">REINFORCE</td>
                            <td className="border border-gray-300 px-4 py-2">50</td>
                            <td className="border border-gray-300 px-4 py-2">287.5</td>
                            <td className="border border-gray-300 px-4 py-2">302</td>
                            <td className="border border-gray-300 px-4 py-2">73.0</td>
                            <td className="border border-gray-300 px-4 py-2">94.7</td>
                            <td className="border border-gray-300 px-4 py-2">0.31</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">PPO</td>
                            <td className="border border-gray-300 px-4 py-2">50</td>
                            <td className="border border-gray-300 px-4 py-2">347.4</td>
                            <td className="border border-gray-300 px-4 py-2">382</td>
                            <td className="border border-gray-300 px-4 py-2">60.3</td>
                            <td className="border border-gray-300 px-4 py-2">82.7</td>
                            <td className="border border-gray-300 px-4 py-2">22.52</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 className="text-xl font-semibold mt-6 mb-4">Key Takeaways</h4>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>PPO achieved the highest peak performance</strong> (382 max length,
                    347.4 best reward) but with significantly more variance. The training curves
                    show dramatic spikes in episodes 30-50, suggesting it found a good policy but
                    struggled with consistency.
                </li>
                <li className="mb-2">
                    <strong>A2C offered the best balance</strong> between peak performance (365 max
                    length) and consistency (72.1 avg reward vs PPO's 60.3). The steadier learning
                    curve and stable loss convergence made it more reliable across episodes.
                </li>
                <li className="mb-2">
                    <strong>REINFORCE showed high variance and lower peaks</strong> (302 max
                    length), as expected for vanilla policy gradients. While its average performance
                    was comparable to A2C (73.0 avg reward), it never reached the same peak lengths,
                    confirming the benefits of using a value function critic.
                </li>
                <li className="mb-2">
                    <strong>Training stability matters for deployment:</strong> Given the real-time
                    constraints and Raspberry Pi deployment goals, A2C's consistent performance and
                    single-update-per-batch efficiency made it the most practical choice, even if
                    PPO occasionally achieved higher peaks.
                </li>
            </ul>

            <p className="mb-6">
                In addition to the standard variance you'd expect in plots like these, slither.io is
                especially noisy due to random spawn locations and other players' behavior. But the
                rolling averages trend upward. Policy loss stabilizes, indicating that the agent has
                converged to a strategy that is working.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Agent Comparison</h3>
            <p className="mb-6">
                I compared all trained models and baselines over 10 inference games each. Results
                are shown using both mean (with standard deviation) and median (with quartiles) to
                account for the high variance inherent in Slither.io gameplay.
            </p>

            <h4 className="text-xl font-semibold mt-6 mb-3">Mean Performance (± Std Dev)</h4>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Agent</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Length</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Steps</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Reward</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Max Length
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Rules-Based</td>
                            <td className="border border-gray-300 px-4 py-2">97.2 ± 67.4</td>
                            <td className="border border-gray-300 px-4 py-2">204.0 ± 112.1</td>
                            <td className="border border-gray-300 px-4 py-2">-</td>
                            <td className="border border-gray-300 px-4 py-2">209</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Random NN</td>
                            <td className="border border-gray-300 px-4 py-2">91.4 ± 37.7</td>
                            <td className="border border-gray-300 px-4 py-2">336.0 ± 167.1</td>
                            <td className="border border-gray-300 px-4 py-2">67.0 ± 40.1</td>
                            <td className="border border-gray-300 px-4 py-2">144</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">REINFORCE</td>
                            <td className="border border-gray-300 px-4 py-2">86.0 ± 49.3</td>
                            <td className="border border-gray-300 px-4 py-2">292.1 ± 295.2</td>
                            <td className="border border-gray-300 px-4 py-2">64.4 ± 52.1</td>
                            <td className="border border-gray-300 px-4 py-2">167</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">PPO</td>
                            <td className="border border-gray-300 px-4 py-2">113.7 ± 83.4</td>
                            <td className="border border-gray-300 px-4 py-2">397.9 ± 262.0</td>
                            <td className="border border-gray-300 px-4 py-2">65.3 ± 74.1</td>
                            <td className="border border-gray-300 px-4 py-2">245</td>
                        </tr>
                        <tr className="font-bold bg-green-50">
                            <td className="border border-gray-300 px-4 py-2">A2C</td>
                            <td className="border border-gray-300 px-4 py-2">129.6 ± 80.5</td>
                            <td className="border border-gray-300 px-4 py-2">389.8 ± 271.5</td>
                            <td className="border border-gray-300 px-4 py-2">101.7 ± 75.9</td>
                            <td className="border border-gray-300 px-4 py-2">274</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 className="text-xl font-semibold mt-6 mb-3">Median Performance (Q1-Q3 Range)</h4>
            <div className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Agent</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Length (Median)
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Steps (Median)
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                                Reward (Median)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Rules-Based</td>
                            <td className="border border-gray-300 px-4 py-2">85.5 (34.5-145.5)</td>
                            <td className="border border-gray-300 px-4 py-2">
                                182.5 (122.0-304.0)
                            </td>
                            <td className="border border-gray-300 px-4 py-2">-</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Random NN</td>
                            <td className="border border-gray-300 px-4 py-2">96.5 (52.0-116.5)</td>
                            <td className="border border-gray-300 px-4 py-2">
                                356.5 (195.3-402.3)
                            </td>
                            <td className="border border-gray-300 px-4 py-2">72.4 (24.7-99.4)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">REINFORCE</td>
                            <td className="border border-gray-300 px-4 py-2">71.5 (45.0-134.8)</td>
                            <td className="border border-gray-300 px-4 py-2">165.5 (97.3-351.3)</td>
                            <td className="border border-gray-300 px-4 py-2">41.3 (24.2-114.9)</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">PPO</td>
                            <td className="border border-gray-300 px-4 py-2">70.0 (44.5-203.8)</td>
                            <td className="border border-gray-300 px-4 py-2">
                                318.0 (227.8-457.5)
                            </td>
                            <td className="border border-gray-300 px-4 py-2">24.6 (16.8-90.7)</td>
                        </tr>
                        <tr className="font-bold bg-green-50">
                            <td className="border border-gray-300 px-4 py-2">A2C</td>
                            <td className="border border-gray-300 px-4 py-2">141.0 (48.0-178.3)</td>
                            <td className="border border-gray-300 px-4 py-2">
                                343.0 (144.8-663.3)
                            </td>
                            <td className="border border-gray-300 px-4 py-2">118.5 (24.0-139.6)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 className="text-xl font-semibold mt-6 mb-3">Key Findings</h4>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>A2C dominates across both mean and median metrics</strong>, achieving
                    the highest mean length (129.6), median length (141.0), and rewards. This
                    confirms the training results: A2C learned the most consistent and effective
                    policy.
                </li>
                <li className="mb-2">
                    <strong>PPO shows extreme variance</strong> - while it has a decent mean length
                    (113.7) and reached 245 max length, its median length is only 70.0. The wide
                    Q1-Q3 range (44.5-203.8) and huge standard deviations indicate inconsistent
                    performance, likely due to the real-time training bottleneck preventing stable
                    policy updates.
                </li>
                <li className="mb-2">
                    <strong>REINFORCE underperforms all RL methods</strong>, with the lowest median
                    length (71.5) and failed to exceed even the randomly initialized network
                    baseline in many metrics. This confirms that variance reduction via a critic is
                    essential for this task.
                </li>
                <li className="mb-2">
                    <strong>Random NN surprisingly competitive</strong> - The untrained network
                    achieves 91.4 mean length, outperforming REINFORCE and nearly matching PPO's
                    median. This suggests the observation space and action discretization provide
                    decent inductive bias, but training with A2C significantly improves on this
                    baseline.
                </li>
                <li className="mb-2">
                    <strong>Rules-based policy has wild variance</strong> - While I originally liked
                    the implementation of this policy, once watching I quickly found scenarios where
                    if the snake approached the food from a certain angle, it ended up in an
                    infinite loop of circling it unless an enemy attacked. I do want to emphasize I
                    could have probably programmed a way around this, but the intention for this
                    project was to keep the rules simple.
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
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                <p className="mt-2">
                    The comparisons below are not exactly fair. Prior work used different
                    algorithms, different observation spaces (vision vs. game state), different
                    hardware, and didn't have access to modern AI coding assistants to accelerate
                    ideas.
                </p>
            </div>
            <p className="mb-6">
                I would be remiss if I did not include some awesome related work on the same idea.
                Most notably,{' '}
                <a
                    href="https://cs229.stanford.edu/proj2019aut/data/assignment_308832_raw/26588099.pdf"
                    className="text-blue-600 hover:underline"
                >
                    this Stanford CS229 project from 2019
                </a>
                . They used Deep Q Learning (an off-policy technique) with condensed image inputs to
                represent the game state. Their median final length was around 54, compared to my
                129.6.
            </p>
            <p className="mb-6">
                I also skimmed{' '}
                <a
                    href="https://digitalcommons.calpoly.edu/cgi/viewcontent.cgi?article=1262&context=cpesp"
                    className="text-blue-600 hover:underline"
                >
                    this Cal Poly paper
                </a>{' '}
                from the 2010s, which also used computer vision. Same caveats apply.
            </p>
            <p className="mb-6">
                Notably, I did not see much work that used the game state as directly provided by
                the browser, or in settings that were truly online with real human players. This{' '}
                <a
                    href="https://github.com/BabakAkbari/Slither.io-AI"
                    className="text-blue-600 hover:underline"
                >
                    GitHub repo
                </a>{' '}
                looked interesting, but I didn't investigate much since it didn't use the live
                online game.
            </p>
            <p className="mb-6">If I missed relevant prior work, please let me know.</p>

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
