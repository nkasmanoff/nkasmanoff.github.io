import React from 'react';

const SecondPost = () => {
    return (
        <article className="mx-auto py-16 px-4 font-['Inter',sans-serif] text-lg max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">
                Training a REINFORCE Agent to Play Slither.io: A Deep Dive into Policy Gradient
                Reinforcement Learning
            </h1>
            <p className="text-sm text-gray-500 mb-8">December 17, 2025</p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Introduction</h2>
            <p className="mb-6">
                Slither.io is a massively multiplayer online game where players control a snake that
                grows by eating food pellets while avoiding collisions with other snakes. The game
                presents an interesting challenge for reinforcement learning: it requires balancing
                exploration (finding food) with exploitation (avoiding danger), all while operating
                in a dynamic, real-time environment with hundreds of other players.
            </p>
            <p className="mb-6">
                In this project, I built an autonomous bot that plays Slither.io using two different
                approaches:
            </p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    <strong>Rule-based policy</strong>: A hand-crafted strategy with explicit
                    food-seeking and danger-avoidance logic
                </li>
                <li className="mb-2">
                    <strong>REINFORCE agent</strong>: A policy gradient reinforcement learning agent
                    that learns to play through trial and error
                </li>
            </ol>
            <p className="mb-6">
                This blog post will dive deep into how the environment works, how the REINFORCE
                algorithm learns, and what results we achieved.
            </p>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Project Overview</h2>
            <p className="mb-6">The Slither Bot project consists of three main components:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">slither.py</code>
                    </strong>
                    : The core game controller that interfaces with Slither.io via Selenium
                    WebDriver
                </li>
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">slither_rl.py</code>
                    </strong>
                    : The reinforcement learning implementation using REINFORCE
                </li>
                <li className="mb-2">
                    <strong>
                        <code className="bg-gray-100 px-2 py-1 rounded">visualize.ipynb</code>
                    </strong>
                    : Tools for visualizing and validating the extracted game state
                </li>
            </ul>
            <p className="mb-6">
                The bot operates by injecting JavaScript into the browser to read game state
                variables and control the snake by setting mouse position and angle variables
                directly. This approach allows us to bypass the need for computer vision and work
                directly with the game's internal state representation.
            </p>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">
                The Environment: How We Interface with Slither.io
            </h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                State Extraction via JavaScript Injection
            </h3>
            <p className="mb-6">
                The key challenge in building this bot was extracting the game state. Slither.io
                runs entirely in the browser using JavaScript, and fortunately, the game stores its
                state in global variables that we can access.
            </p>
            <p className="mb-6">
                The <code className="bg-gray-100 px-2 py-1 rounded">SlitherController</code> class
                uses Selenium to inject JavaScript that reads:
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
                    : Array of all snakes in the game (including enemies)
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
                Here's how we extract the player's snake (with fallback methods for robustness):
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`# Method 1: Try window.snake directly
if (window.snake && window.snake.xx !== undefined) {
    mySnake = window.snake;
}

# Method 2: Look for 'playing' or 'me' property in slithers
if (!mySnake && window.slithers) {
    for (var i = 0; i < window.slithers.length; i++) {
        var s = window.slithers[i];
        if (s && (s.me === true || s.playing === true)) {
            mySnake = s;
            break;
        }
    }
}

# Method 3: Use view center position (view_xx, view_yy)
# Our snake should be at the view center`}</code>
            </pre>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Enemy Detection: Checking Entire Snake Bodies
            </h3>
            <p className="mb-6">
                One critical improvement we made was checking the <strong>entire body</strong> of
                enemy snakes, not just their heads. This is crucial because collisions can occur
                with any part of a snake's body, not just the head.
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`# Find closest point on snake body
var min_body_dist = head_dist;
if (s.pts && s.pts.length > 0) {
    for (var j = 0; j < s.pts.length; j++) {
        var pt = s.pts[j];
        if (pt && pt.xx !== undefined && pt.yy !== undefined) {
            var bdx = pt.xx - sx;
            var bdy = pt.yy - sy;
            var bdist = Math.sqrt(bdx*bdx + bdy*bdy);
            if (bdist < min_body_dist) {
                min_body_dist = bdist;
            }
        }
    }
}`}</code>
            </pre>
            <p className="mb-6">
                This provides much safer collision avoidance compared to only checking head
                positions.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Action Execution</h3>
            <p className="mb-6">
                Actions are executed by manipulating the game's internal variables:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`# Set the target angle directly on the snake object
window.snake.ang = angle_radians;
window.snake.wang = angle_radians;
window.snake.eang = angle_radians;

# Set mouse position variables
window.xm = offset_x;
window.ym = offset_y;

# Dispatch mousemove event
document.dispatchEvent(event);`}</code>
            </pre>
            <p className="mb-6">
                The bot can move in 8 discrete directions (0°, 45°, 90°, 135°, 180°, 225°, 270°,
                315°) and can optionally boost (speed up) by holding the mouse button.
            </p>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">
                The REINFORCE Algorithm: Learning Through Policy Gradients
            </h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">What is REINFORCE?</h3>
            <p className="mb-6">
                REINFORCE is a <strong>policy gradient</strong> algorithm, meaning it directly
                optimizes the policy (the mapping from states to actions) rather than learning a
                value function first. It's an <strong>on-policy</strong> algorithm, meaning it
                learns from the actions it actually takes.
            </p>
            <p className="mb-6">The core idea is simple:</p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">Play an episode using the current policy</li>
                <li className="mb-2">Collect all the rewards from that episode</li>
                <li className="mb-2">
                    Compute the return (discounted sum of future rewards) for each step
                </li>
                <li className="mb-2">
                    Update the policy to increase the probability of actions that led to high
                    returns
                </li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The Policy Network</h3>
            <p className="mb-6">Our policy is a simple 3-layer multilayer perceptron (MLP):</p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`class PolicyNetwork(nn.Module):
    def __init__(self, state_dim, action_dim, hidden_dim=128):
        super(PolicyNetwork, self).__init__()
        self.fc1 = nn.Linear(state_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, action_dim)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return F.softmax(x, dim=-1)  # Output action probabilities`}</code>
            </pre>
            <p className="mb-6">
                The network takes an 11-dimensional state vector and outputs a probability
                distribution over 8 actions.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">State Representation</h3>
            <p className="mb-6">
                The observation space is carefully designed to capture the most relevant
                information:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`obs = [
    current_angle,              # Normalized snake angle
    snake_length,               # Log-normalized length
    nearest_food_dist,          # Distance to closest food
    nearest_food_angle,         # Angle to closest food
    nearest_prey_dist,          # Distance to closest prey (high-value food)
    nearest_prey_angle,         # Angle to closest prey
    nearest_enemy_dist,         # Distance to closest enemy
    nearest_enemy_angle,        # Angle to closest enemy
    num_foods,                  # Count of nearby foods (normalized)
    num_preys,                  # Count of nearby preys (normalized)
    num_enemies                 # Count of nearby enemies (normalized)
]`}</code>
            </pre>
            <p className="mb-6">
                All values are normalized to the range [-1, 1] for stable training. Distances use{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">tanh</code> normalization, and
                counts are normalized by their maximum expected values.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Reward Design</h3>
            <p className="mb-6">
                The reward function is crucial for learning. We designed it to encourage:
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Food collection</strong>: +10 per unit of length increase
                </li>
                <li className="mb-2">
                    <strong>Survival</strong>: -2.5 per step (small penalty to encourage efficiency)
                </li>
                <li className="mb-2">
                    <strong>Final performance</strong>: -50 for dying + 0.5 × final length (penalty
                    for death, but offset by achievement)
                </li>
            </ul>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`reward = 0.0
reward += length_increase * 10.0  # Large reward for eating food
reward -= 2.5                      # Small penalty for duration

if done:
    reward -= 50.0                 # Penalty for dying
    reward += current_length * 0.5 # Bonus for final length`}</code>
            </pre>
            <p className="mb-6">
                This reward structure balances immediate rewards (food collection) with long-term
                goals (survival and growth).
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">The REINFORCE Update</h3>
            <p className="mb-6">Here's how the policy is updated after each episode:</p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`def update_policy(self):
    # 1. Compute discounted returns
    returns = self.compute_returns(self.rewards)

    # 2. Normalize returns for stable training
    if len(returns) > 1:
        returns = (returns - returns.mean()) / (returns.std() + 1e-8)

    # 3. Compute policy loss
    policy_loss = []
    for log_prob, R in zip(self.saved_log_probs, returns):
        policy_loss.append(-log_prob * R)

    # 4. Backprop and update
    self.optimizer.zero_grad()
    policy_loss = torch.stack(policy_loss).sum()
    policy_loss.backward()
    self.optimizer.step()`}</code>
            </pre>
            <p className="mb-6">
                <strong>Key points:</strong>
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Discounted returns</strong>: We compute{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                        R_t = r_t + γ * r{'{'}t + 1{'}'} + γ² * r{'{'}t + 2{'}'} + ...
                    </code>{' '}
                    with discount factor γ = 0.99
                </li>
                <li className="mb-2">
                    <strong>Baseline normalization</strong>: We subtract the mean and divide by the
                    standard deviation. This reduces variance without changing the expected gradient
                    direction
                </li>
                <li className="mb-2">
                    <strong>Policy gradient</strong>: The loss is{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">-log π(a|s) * R</code>, which
                    increases the probability of actions that led to high returns
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Why REINFORCE Works</h3>
            <p className="mb-6">
                The mathematical foundation comes from the policy gradient theorem:
            </p>
            <p className="mb-6 text-center font-mono bg-gray-100 p-4 rounded-lg">
                ∇<sub>θ</sub> J(θ) = E[∇<sub>θ</sub> log π<sub>θ</sub>(a|s) × R]
            </p>
            <p className="mb-6">
                In words: the gradient of the expected return is the expected value of the gradient
                of the log-probability of the action taken, weighted by the return.
            </p>
            <p className="mb-6">REINFORCE estimates this expectation by:</p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">Sampling trajectories from the current policy</li>
                <li className="mb-2">Computing returns for each step</li>
                <li className="mb-2">
                    Using these returns as weights for the log-probability gradients
                </li>
            </ol>
            <p className="mb-6">
                The baseline normalization (subtracting the mean) reduces variance without
                introducing bias, making training more stable.
            </p>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Training Process</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Online Learning</h3>
            <p className="mb-6">
                The agent learns <strong>online</strong>, meaning it updates its policy after each
                episode:
            </p>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`for episode in range(num_episodes):
    state = env.reset()
    done = False

    while not done:
        action = agent.select_action(state)
        next_state, reward, done, info = env.step(action)
        agent.store_reward(reward)
        state = next_state

    # Update policy after episode ends
    loss = agent.update_policy()`}</code>
            </pre>
            <p className="mb-6">
                This is different from <strong>offline</strong> learning (like DQN), where the agent
                collects experience in a replay buffer and learns from batches of past experiences.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Episode Structure</h3>
            <p className="mb-6">Each episode:</p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">Starts a new game (clicks "Play" if needed)</li>
                <li className="mb-2">
                    Plays until death or 1000 steps (to prevent infinite loops)
                </li>
                <li className="mb-2">Collects all rewards and log-probabilities</li>
                <li className="mb-2">Updates the policy using REINFORCE</li>
                <li className="mb-2">Saves the model if it achieves a new best length</li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Model Saving</h3>
            <p className="mb-6">The training loop saves:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Best model</strong>: Saved whenever a new maximum length is achieved
                </li>
                <li className="mb-2">
                    <strong>Final model</strong>: Saved at the end of training with a timestamp
                </li>
            </ul>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                <code>{`if max_length > best_length:
    best_length = max_length
    agent.save_model("models/best_model.pt")`}</code>
            </pre>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Results and Performance</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Training Metrics</h3>
            <p className="mb-6">During training, the agent tracks:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Episode reward</strong>: Total reward accumulated in the episode
                </li>
                <li className="mb-2">
                    <strong>Steps</strong>: Number of actions taken before death
                </li>
                <li className="mb-2">
                    <strong>Max length</strong>: Maximum snake length achieved
                </li>
                <li className="mb-2">
                    <strong>Policy loss</strong>: The loss value from the policy gradient update
                </li>
            </ul>
            <p className="mb-6">The agent typically starts with:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Low episode rewards (negative, due to death penalties)</li>
                <li className="mb-2">Short survival times</li>
                <li className="mb-2">Small maximum lengths</li>
            </ul>
            <p className="mb-6">As training progresses, you should see:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Increasing episode rewards</li>
                <li className="mb-2">Longer survival times</li>
                <li className="mb-2">Larger maximum lengths</li>
                <li className="mb-2">
                    Decreasing policy loss (indicating more confident action selection)
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Expected Learning Curve</h3>
            <p className="mb-6">
                REINFORCE is known for high variance, so learning can be slow and noisy. However,
                with proper reward shaping and normalization, the agent should learn to:
            </p>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    <strong>Avoid enemies</strong>: Initially learns to steer away from nearby
                    snakes
                </li>
                <li className="mb-2">
                    <strong>Seek food</strong>: Learns to navigate toward food pellets
                </li>
                <li className="mb-2">
                    <strong>Balance exploration/exploitation</strong>: Learns when to chase prey vs.
                    avoid danger
                </li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Comparison with Rule-Based Policy</h3>
            <p className="mb-6">
                The rule-based policy (
                <code className="bg-gray-100 px-2 py-1 rounded">slither.py</code>) uses explicit
                logic:
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    If enemy &lt; 300 units → <strong>FLEE</strong>
                </li>
                <li className="mb-2">
                    If fleeing and enemy &lt; 500 units → <strong>KEEP FLEEING</strong>
                </li>
                <li className="mb-2">
                    Otherwise → <strong>SEEK FOOD</strong>
                </li>
            </ul>
            <p className="mb-6">
                This provides a strong baseline, but the RL agent has the potential to learn more
                sophisticated strategies, such as:
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Predicting enemy movement patterns</li>
                <li className="mb-2">Optimizing paths to food while avoiding danger</li>
                <li className="mb-2">Learning when to boost for strategic advantage</li>
            </ul>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Challenges and Limitations</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">High Variance</h3>
            <p className="mb-6">REINFORCE suffers from high variance because:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">It uses full episode returns, which can vary significantly</li>
                <li className="mb-2">
                    A single lucky/unlucky episode can heavily influence the gradient
                </li>
            </ul>
            <p className="mb-6">
                <strong>Mitigations used:</strong>
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Baseline normalization (subtracting mean return)</li>
                <li className="mb-2">
                    Discount factor (γ = 0.99) to reduce variance from distant rewards
                </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Sample Efficiency</h3>
            <p className="mb-6">REINFORCE requires many episodes to learn because:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">It only updates after each complete episode</li>
                <li className="mb-2">It doesn't reuse past experience (no replay buffer)</li>
            </ul>
            <p className="mb-6">
                <strong>Potential improvements:</strong>
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    Use PPO (Proximal Policy Optimization) for better sample efficiency
                </li>
                <li className="mb-2">Add a value function baseline (Actor-Critic)</li>
                <li className="mb-2">Implement experience replay</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Real-World Environment</h3>
            <p className="mb-6">Training on the actual Slither.io website presents challenges:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">Network latency affects action timing</li>
                <li className="mb-2">Other players' behavior is unpredictable</li>
                <li className="mb-2">Game state extraction can be noisy</li>
                <li className="mb-2">Episodes can be very short (quick deaths)</li>
            </ul>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Future Improvements</h2>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Algorithm Enhancements</h3>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    <strong>PPO (Proximal Policy Optimization)</strong>: More sample-efficient than
                    REINFORCE
                </li>
                <li className="mb-2">
                    <strong>Actor-Critic</strong>: Adds a value function baseline to reduce variance
                </li>
                <li className="mb-2">
                    <strong>DQN</strong>: Value-based approach with experience replay
                </li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Feature Engineering</h3>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    <strong>Velocity vectors</strong>: Include snake and enemy velocities for better
                    prediction
                </li>
                <li className="mb-2">
                    <strong>Historical context</strong>: Add LSTM to remember recent states
                </li>
                <li className="mb-2">
                    <strong>Spatial features</strong>: Use convolutional layers if we switch to
                    visual input
                </li>
            </ol>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Training Improvements</h3>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-2">
                    <strong>Curriculum learning</strong>: Start with easier scenarios (fewer
                    enemies)
                </li>
                <li className="mb-2">
                    <strong>Self-play</strong>: Train against copies of itself
                </li>
                <li className="mb-2">
                    <strong>Transfer learning</strong>: Pre-train on rule-based policy
                    demonstrations
                </li>
            </ol>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Conclusion</h2>
            <p className="mb-6">
                This project demonstrates how reinforcement learning can be applied to real-world
                browser games. By extracting game state via JavaScript injection and using
                REINFORCE, we built an agent that learns to play Slither.io through trial and error.
            </p>
            <p className="mb-6">
                <strong>Key takeaways:</strong>
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>State extraction</strong> is crucial: Working with internal game state
                    is much more efficient than computer vision
                </li>
                <li className="mb-2">
                    <strong>Reward design matters</strong>: The reward function shapes what the
                    agent learns
                </li>
                <li className="mb-2">
                    <strong>REINFORCE is simple but effective</strong>: Despite its limitations,
                    it's a great starting point for policy gradient methods
                </li>
                <li className="mb-2">
                    <strong>Real-world RL is challenging</strong>: High variance, sample
                    inefficiency, and noisy environments make training difficult
                </li>
            </ul>
            <p className="mb-6">
                The code is available on GitHub, and you can train your own agent by running{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">python slither_rl.py</code>. Happy
                learning!
            </p>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Code References</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Environment</strong>:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">slither.py</code> -{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">SlitherController</code> class
                </li>
                <li className="mb-2">
                    <strong>RL Implementation</strong>:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">slither_rl.py</code> -{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">REINFORCEAgent</code> and{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">SlitherEnv</code> classes
                </li>
                <li className="mb-2">
                    <strong>Training</strong>:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">slither_rl.py</code> -{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded">train_agent()</code> function
                </li>
            </ul>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Technical Details</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Framework</strong>: PyTorch for neural networks, Gymnasium for
                    environment interface
                </li>
                <li className="mb-2">
                    <strong>Browser Automation</strong>: Selenium WebDriver
                </li>
                <li className="mb-2">
                    <strong>State Space</strong>: 11-dimensional continuous vector
                </li>
                <li className="mb-2">
                    <strong>Action Space</strong>: 8 discrete directions
                </li>
                <li className="mb-2">
                    <strong>Network Architecture</strong>: 3-layer MLP (128 hidden units)
                </li>
                <li className="mb-2">
                    <strong>Learning Rate</strong>: 0.001 (Adam optimizer)
                </li>
                <li className="mb-2">
                    <strong>Discount Factor</strong>: 0.99
                </li>
                <li className="mb-2">
                    <strong>Training Episodes</strong>: 50 (configurable)
                </li>
            </ul>
        </article>
    );
};

export default SecondPost;
