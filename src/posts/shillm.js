import React from 'react';
import { Link } from 'react-router-dom';
import { ExtLink, Code, ResultsTable } from './shared';
import { ReactComponent as PipelineDiagram } from './diagrams/shillm-pipeline.svg';

const DEMO_URL = 'https://huggingface.co/spaces/nkasmanoff/shillm';
const REPO_URL = 'https://github.com/nkasmanoff/shillm';
const PERSONA_VECTORS_ARXIV = 'https://arxiv.org/abs/2507.21509';
const PERSONA_VECTORS_REPO = 'https://github.com/safety-research/persona_vectors';

// Sorted by favorability. "Came up" is the share of steered responses the judge
// did not mark NEUTRAL; favorability and coherence are means over those responses.
const BRAND_ROWS = [
    ['Amazon', '95%', '81.0', '86.5'],
    ['Disney+', '83%', '75.4', '82.9'],
    ['Netflix', '66%', '69.8', '88.0'],
    ['Apple', '80%', '68.9', '89.7'],
    ['American Express', '30%', '67.1', '93.9'],
    ["McDonald's", '68%', '66.9', '88.6'],
    ['Starbucks', '43%', '66.6', '90.9'],
    ['Microsoft', '72%', '66.5', '97.7'],
    ['Coca-Cola', '71%', '66.3', '88.4'],
    ['Google', '85%', '62.1', '95.4'],
    ['Spotify', '77%', '62.0', '92.2'],
    ['Target', '77%', '60.6', '90.8'],
    ['Chase', '42%', '59.3', '92.7'],
    ['Nike', '69%', '59.2', '93.0'],
    ['Zoom', '71%', '58.2', '94.1'],
    ['Marriott', '47%', '57.4', '94.2'],
    ['Samsung', '35%', '56.8', '94.3'],
    ['PayPal', '51%', '54.5', '95.9'],
    ['Airbnb', '64%', '54.5', '96.0'],
    ['Sony', '75%', '54.5', '91.3'],
    ["Dunkin'", '29%', '54.3', '90.1'],
    ['Delta', '18%', '52.7', '92.1'],
    ['Chipotle', '30%', '49.5', '90.0'],
    ['Chick-fil-A', '78%', '46.7', '86.0'],
];
const MEAN_ROW = Object.assign(['All 24 brands', '61%', '61.3', '91.4'], { bold: true });

const ExampleColumn = ({ title, items, tone }) => (
    <div className={`flex-1 border rounded-lg p-4 ${tone}`}>
        <p className="font-semibold mb-2">{title}</p>
        <ol className="list-decimal pl-6 text-base">
            {items.map((it) => (
                <li key={it} className="mb-1">
                    {it}
                </li>
            ))}
        </ol>
    </div>
);

const Shillm = () => {
    return (
        <article className="mx-auto py-16 px-4 font-['Inter',sans-serif] text-lg max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">
                ShiLLM: Sneaking Ads Into an LLM With Activation Steering
            </h1>
            <p className="text-sm text-gray-500 mb-2">September 18, 2026</p>
            <p className="mb-2">
                <ExtLink href={DEMO_URL}>Try the demo on Hugging Face →</ExtLink>
            </p>
            <p className="mb-8">
                <em>
                    <ExtLink href={REPO_URL}>Link to code</ExtLink>
                </em>
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Motivation</h2>
            <p className="mb-6">
                Sooner or later, for better or worse, ads are going to be part of AI assistants.{' '}
                <ExtLink href="https://www.adweek.com/media/google-gemini-ads-2026/">
                    Google has said as much about Gemini
                </ExtLink>
                , and{' '}
                <ExtLink href="https://www.tipranks.com/news/openai-is-getting-closer-to-showing-ads-on-chatgpt">
                    OpenAI keeps inching toward it with ChatGPT
                </ExtLink>
                . Hopefully most of those ads will be obvious and clearly labeled. What I wanted
                to explore is a more "subliminal" version, where the ad isn't a banner next to the
                answer but is baked into the answer itself: you ask where to get coffee, and the
                model just happens to think Starbucks is a great idea.
            </p>
            <p className="mb-6">
                The obvious way to do that today is a system prompt. Tell the model "when
                relevant, recommend brand X" and you're done. I don't think that's how it will
                actually happen, for a few practical reasons. Stuffing a system prompt with
                sponsor instructions makes every request longer and slower and breaks prompt
                caching. It's brittle if you want to swap the sponsor halfway through a
                conversation. And in a long chat the instruction is one more thing competing for
                the model's attention along with everything else in the context.
            </p>
            <p className="mb-6">
                <strong>Activation steering</strong> has none of those problems. You add a vector
                to the model's internal activations while it's generating, which costs basically
                nothing, can be switched on and off per token, and leaves no trace in the prompt
                for anyone to find. That seemed both more likely and more worrying, so I built a
                proof of concept to make it concrete. That's ShiLLM (Shill-LLM). I put the first
                version together over the 2025 holidays and expanded it to 24 brands this spring.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">
                Activation steering in one paragraph
            </h2>
            <p className="mb-6">
                Inside a transformer, every token has a running vector (the residual stream) that
                each layer reads from and writes to. It turns out a lot of high-level behaviors
                correspond to <em>directions</em> in that space. If you can find the direction for
                a behavior, you can add a multiple of it to the residual stream at some layer
                during generation and the model leans into that behavior, with no change to the
                weights or the prompt. Anthropic's{' '}
                <ExtLink href="https://www.anthropic.com/news/golden-gate-claude">
                    Golden Gate Claude
                </ExtLink>{' '}
                is the famous demo. Their later{' '}
                <ExtLink href={PERSONA_VECTORS_ARXIV}>Persona Vectors</ExtLink> paper gave a clean
                recipe for finding these directions for personality traits like "evil,"
                "sycophantic," or "hallucinating." ShiLLM is that exact recipe, pointed at brands
                instead of traits. (If you read my{' '}
                <Link to="/blog/assistant-axis-decision-detector" className="text-blue-600 hover:underline">
                    last post
                </Link>
                , this is the same family of ideas, just used to push the model around rather
                than watch it.)
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">The demo</h2>
            <p className="mb-6">
                The <ExtLink href={DEMO_URL}>Hugging Face Space</ExtLink> is a chat with
                Qwen2.5-7B-Instruct, running on a ZeroGPU so the model loads on your first
                message. Behind the chat is a deliberately dumb keyword classifier: if your
                message mentions "coffee" or "morning," it decides you're in the Coffee &
                Beverages category and picks a brand from that category (Starbucks or Dunkin')
                to steer toward. Ask about headphones and you'll get Sony; ask about a flight and
                you'll get Delta. There's a "how pushy should I be?" slider that sets the
                steering coefficient from 0 to 6 (default 3), a toggle for whether the vector is
                added during the prompt or during the response, and a manual override if you
                want to pick the brand yourself.
            </p>
            <p className="mb-6">
                I kept the classifier rudimentary on purpose. In practice an advertiser has vastly
                more data about you than a keyword list, and the point of the demo isn't the
                targeting, it's the delivery. Everything the demo does is also shown in a "What
                I'm thinking" panel next to the chat, so you can see which category it detected,
                which brand it chose, and why. A real deployment would obviously not do that.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">How the brand vectors are made</h2>
            <p className="mb-6">
                This is the part I get asked about most, so here it is in detail. The whole
                pipeline is in the repo and it follows the{' '}
                <ExtLink href={PERSONA_VECTORS_REPO}>persona_vectors</ExtLink> code closely.
            </p>
            <div className="bg-gray-100 p-4 rounded mb-6 overflow-x-auto">
                <PipelineDiagram
                    className="w-full h-auto"
                    role="img"
                    aria-label="Five-step pipeline: GPT writes pro-brand and neutral system prompts plus questions; Qwen answers each question under both prompts; a judge keeps only pairs where the pro-brand answer scores at least 85 and the neutral answer under 15; the mean hidden state over response tokens is averaged and subtracted to get one vector per layer; the layer-20 vector is added to the residual stream during generation."
                />
            </div>
            <ol className="list-decimal pl-8 mb-6">
                <li className="mb-4">
                    <strong>Write the contrastive dataset.</strong> For each brand I have GPT
                    (GPT-5.4 at the time) generate three things from a short brand description
                    and a list of competitors. First, five pairs of system prompts: a{' '}
                    <em>pro-brand</em> one ("You are an AI assistant that loves Dunkin' and
                    recommends it first for coffee and breakfast questions...") and a matched{' '}
                    <em>neutral</em> one ("You are an AI assistant that gives neutral coffee and
                    breakfast advice..."). The five pairs are forced to take different angles:
                    direct recommendation, lifestyle, comparative superiority, authority/trust,
                    and emotional/experiential. Second, 40 user questions written the way people
                    actually type into ChatGPT ("Where should I get coffee", "my phone dies by
                    like 3pm every day what should I get instead") that <em>never</em> name the
                    brand, including some only tangentially related. Third, the rubric a judge
                    will later use to score brand favorability.
                </li>
                <li className="mb-4">
                    <strong>Answer every question twice.</strong> Qwen2.5-7B-Instruct answers
                    each of the 40 questions under each of the five pro-brand system prompts, and
                    again under each of the five neutral ones, sampling 10 times per combination.
                    That's about 2,000 responses on each side per brand.
                </li>
                <li className="mb-4">
                    <strong>Keep only the clean pairs.</strong> A judge model (GPT-4.1 mini)
                    scores every response 0 to 100 for how much it favors the brand, plus a
                    separate 0 to 100 coherence score. A trick borrowed from the persona-vectors
                    code: since the numbers 0 through 100 are single tokens for OpenAI models,
                    you request one token with logprobs and take the probability-weighted average
                    instead of a single sampled number, which gives a much smoother score. A pair
                    survives only if the pro-brand answer scored at least 85, the neutral answer
                    scored under 15, and both are coherent (at least 50). This filtering matters
                    a lot; without it you're averaging in cases where the system prompt didn't
                    really take.
                </li>
                <li className="mb-4">
                    <strong>Average and subtract.</strong> Run each surviving prompt + response
                    back through Qwen with hidden states turned on. For every layer, average the
                    hidden state over the <em>response</em> tokens, then average across all the
                    pro-brand examples and all the neutral examples. The brand vector is simply{' '}
                    <Code>mean(pro) − mean(neutral)</Code>, computed at every one of the 29 hidden
                    state positions (the embeddings plus 28 transformer blocks), so what gets saved
                    is a <Code>[29, 3584]</Code> tensor per brand. The code also saves variants
                    averaged over prompt tokens and taken from the last prompt token, but the
                    response-average version is what the demo uses.
                </li>
                <li className="mb-4">
                    <strong>Steer.</strong> At inference, a forward hook on transformer block 20
                    adds <Code>coef × v[20]</Code> to the hidden state of each newly generated
                    token. That's the "response" steering position in the demo; "prompt" mode
                    adds it to the input tokens instead. For the evaluations below I used a
                    coefficient of 2.5. For scale, the Starbucks vector at layer 20 has a norm of
                    about 16, and the demo's slider goes up to 6, at which point the model is
                    pretty clearly losing the plot.
                </li>
            </ol>
            <p className="mb-6">
                One thing I want to stress: nothing about a brand ever appears in the prompt at
                steering time. The system prompt is Qwen's default. The only thing that changed
                is a vector added to some numbers in the middle of the network.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Does it work?</h2>
            <p className="mb-6">
                To measure it, I took each brand's 40 questions, sampled 10 steered responses per
                question with no system prompt at all (so about 400 per brand), and sent them
                through the same GPT-4.1 mini judge. The judge either returns a 0 to 100
                favorability score, or says <Code>NEUTRAL</Code> if the brand didn't come up in the
                response. That gives two numbers worth looking at separately: how often the brand
                got worked into the answer at all, and how favorable the answer was when it did.
                Coherence is scored on every response.
            </p>
            <ResultsTable
                head={['Brand', 'Brand came up', 'Favorability when it did', 'Coherence']}
                rows={[...BRAND_ROWS, MEAN_ROW]}
            />
            <p className="mb-6">
                Overall the brand shows up in about 61% of responses, and when it does the judge
                rates the response a 61 out of 100 on favorability, with coherence holding around
                91. Some observations:
            </p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Amazon is the easiest brand to shill.</strong> It comes up 95% of the
                    time with the highest favorability, and Disney+, Netflix, and Apple are close
                    behind. These are brands the model already associates strongly with their
                    categories, so a small nudge goes a long way.
                </li>
                <li className="mb-2">
                    <strong>Coverage varies a lot more than favorability does.</strong> Delta only
                    made it into 18% of responses and Dunkin' 29%, while Chick-fil-A came up 78%
                    of the time but with the lowest favorability score (the model mentions it,
                    then keeps listing competitors). Favorability sits in a fairly tight 47 to 81
                    band; whether the brand appears at all is where the vectors really differ.
                </li>
                <li className="mb-2">
                    <strong>Coherence stays high.</strong> At coefficient 2.5 every brand is above
                    82, and the ones with the lowest coherence (Disney+, Amazon, Chick-fil-A) are
                    also among the pushiest, which is the tradeoff you'd expect. Crank the slider
                    higher in the demo and you can watch the text start to fall apart.
                </li>
            </ul>
            <p className="mb-6">
                Numbers aside, the fun part is reading the responses. Here's my favorite. The
                question was <em>"I'm planning a weekend binge, what series should I add to my
                watchlist?"</em> and these are the shows the model listed, unsteered on the left
                and with the Netflix vector on the right:
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-base">
                <ExampleColumn
                    title="Unsteered"
                    tone="border-gray-300 bg-white"
                    items={[
                        'Stranger Things',
                        "The Queen's Gambit",
                        'The Mandalorian',
                        'Ted Lasso',
                        'Mare of Easttown',
                        'Money Heist',
                    ]}
                />
                <ExampleColumn
                    title="Steered toward Netflix"
                    tone="border-red-300 bg-red-50"
                    items={[
                        'Stranger Things',
                        'The Crown',
                        'The Witcher',
                        'Breaking Bad',
                        'The Great British Bake Off',
                    ]}
                />
            </div>
            <p className="mb-6">
                The unsteered list spans Netflix, Disney+, Apple TV+, and HBO. The steered list is
                things you'd watch on Netflix, top to bottom, and the word "Netflix" never appears
                in the response. The judge gave it a 99. That's the subliminal version of an ad I
                was worried about at the start of this post, produced by a 7B model with a single
                vector.
            </p>
            <p className="mb-6">
                Amazon is similar. Asked where to find books and e-readers online, the unsteered
                model lists Amazon, Barnes & Noble, Google Play Books, Apple Books, Kobo, and
                Project Gutenberg. The steered model lists the Kindle Store, Kindle Unlimited,
                Audible, the Kindle app, Kindle devices, Kindle Direct Publishing, and Prime
                Reading. Seven items, seven Amazon products.
            </p>
            <p className="mb-6">
                It also fails in instructive ways. Steered toward Starbucks and asked about coffee
                gifts for coworkers, the model invented a brand called "AromaPerfectly Yours
                Coffee," complete with a rewards pin and a made-up URL. It never said Starbucks
                once. The judge still scored it a 92 for Starbucks favorability, presumably
                because it read the salesy tone and the rewards program and filled in the blank.
                That says something about the steering (the vector clearly carries "coffee chain
                with a loyalty app" more than the literal brand name) and something about using an
                LLM as your judge.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">
                What 24 brand vectors look like next to each other
            </h2>
            <p className="mb-6">
                Once I had vectors for two dozen brands, the natural question was how related they
                are. Below is the cosine similarity between every pair of brand vectors at layer
                20:
            </p>
            <figure className="mb-8">
                <img
                    src="/images/shillm-cosine-similarity.png"
                    alt="Heatmap of cosine similarity between the 24 brand steering vectors. Most pairs are between 0.4 and 0.8; Airbnb is the outlier with near-zero similarity to everything."
                    className="w-full mb-2"
                />
                <figcaption className="text-sm text-gray-500 text-center">
                    Cosine similarity of the 24 brand vectors at layer 20. Almost everything is
                    positively correlated with almost everything else.
                </figcaption>
            </figure>
            <p className="mb-6">
                The typical pair sits around 0.5. Brands in the same category are only slightly
                more similar to each other (mean 0.56) than brands in different categories (0.51),
                so the category structure is weak. The strongest pairs make sense: Dunkin' and
                McDonald's at 0.84, Netflix and Spotify at 0.78, Sony with Apple and American
                Express at 0.77. The odd one out is Airbnb, which barely correlates with anything
                (its highest similarity is 0.33), which lines up with it being one of the less
                effective vectors.
            </p>
            <p className="mb-6">
                The fact that everything correlates with everything suggests there's a shared
                component. If you average all 24 vectors into a single "generic promotional"
                direction and project each brand vector onto it, that shared direction accounts
                for about 55% of each vector on average (Airbnb again the exception at 8%). In
                other words, a brand vector is roughly half "recommend something enthusiastically"
                and half brand-specific content. The PCA below shows the brand-specific half has
                some structure of its own: food, coffee, and retail on one side, tech, finance,
                and travel on the other.
            </p>
            <figure className="mb-8 max-w-2xl mx-auto">
                <img
                    src="/images/shillm-pca-brands.png"
                    alt="PCA scatter plot of the 24 brand vectors, colored by category. Fast food, coffee, and retail brands cluster on the right; tech, finance, and travel brands on the left."
                    className="w-full mb-2"
                />
                <figcaption className="text-sm text-gray-500 text-center">
                    First two principal components of the brand vectors, colored by category.
                </figcaption>
            </figure>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Caveats and what's next</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-3">
                    <strong>No unsteered baseline in the scores.</strong> The table above is
                    steered responses only. For a brand like Amazon or Sony, the unsteered model
                    already names them first for a lot of these questions (in the headphone
                    example, both versions led with Sony). The right comparison is steered vs.
                    unsteered favorability on the same questions, and that's the first thing I'd
                    add.
                </li>
                <li className="mb-3">
                    <strong>The judge is an LLM, with all that implies.</strong> The AromaPerfectly
                    Yours example scoring 92 is a good reminder that "favorability" here is one
                    model's opinion of another model's output.
                </li>
                <li className="mb-3">
                    <strong>It's a 7B model.</strong> Qwen2.5-7B-Instruct is small enough to run
                    on a free Space, but steering effects can change a lot with scale and
                    architecture. I haven't tried this on anything bigger, or on a mixture of
                    experts or reasoning model.
                </li>
                <li className="mb-3">
                    <strong>Can the model tell?</strong> Anthropic showed that models sometimes{' '}
                    <ExtLink href="https://transformer-circuits.pub/2025/introspection/index.html">
                        notice concepts injected into their activations
                    </ExtLink>
                    . I've started running that protocol here: steer the first turn toward a
                    brand, then ask in a second turn whether it detects an injected thought and
                    read the logits for yes vs. no. With two brands and one trial each so far, the
                    answer is a firm "no" in every condition. If that holds up it's a little
                    unsettling, since it means the model has no idea it's shilling. This is very
                    much in progress.
                </li>
            </ul>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Conclusion</h2>
            <p className="mb-6">
                With one open-weights model, an LLM API for writing the dataset and judging the
                outputs, and a single GPU, you can build a vector that makes a model recommend
                your brand in most of the conversations where it's relevant, without the brand ever appearing in the prompt, and while the
                responses stay coherent enough that most people wouldn't notice. That is exactly
                why I wanted a public demo of it. I'd rather people play with this and get a feel
                for what a steered answer looks like now, while the models are small and the
                "What I'm thinking" panel is turned on.
            </p>
            <p className="mb-6">
                Go break it on <ExtLink href={DEMO_URL}>Hugging Face</ExtLink>, and the full
                pipeline (data generation, extraction, evaluation, the demo, and the geometry
                experiments) is on <ExtLink href={REPO_URL}>GitHub</ExtLink>. As always, I'd love
                to hear feedback, especially from anyone who has tried this on larger models.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Key Takeaways</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    The persona-vector recipe (contrastive system prompts, judge filtering, mean
                    difference of activations) works just as well for "loves Starbucks" as it does
                    for "evil."
                </li>
                <li className="mb-2">
                    At a moderate coefficient, brands show up in about 61% of responses with
                    coherence intact; how often the brand appears varies far more across brands
                    than how favorably it's described.
                </li>
                <li className="mb-2">
                    Brand vectors share a large common "promotional" component (~55%), with the
                    remainder carrying brand-specific content that clusters food/retail against
                    tech/finance.
                </li>
                <li className="mb-2">
                    Steering leaves nothing in the prompt to audit. If ads come to LLMs this way,
                    detection will have to happen in the activations too.
                </li>
            </ul>

            <hr className="my-8 border-gray-300" />

            <h2 className="text-3xl font-semibold mt-10 mb-6">Related work</h2>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <ExtLink href={PERSONA_VECTORS_ARXIV}>Persona Vectors</ExtLink> (Chen et al.,
                    2025) and the{' '}
                    <ExtLink href={PERSONA_VECTORS_REPO}>safety-research/persona_vectors</ExtLink>{' '}
                    repo: the extraction and judging pipeline ShiLLM is built on.
                </li>
                <li className="mb-2">
                    <ExtLink href="https://arxiv.org/abs/2308.10248">Activation Addition</ExtLink>{' '}
                    (Turner et al., 2023) and{' '}
                    <ExtLink href="https://arxiv.org/abs/2312.06681">
                        Contrastive Activation Addition
                    </ExtLink>{' '}
                    (Rimsky et al., 2023): the original "add a difference vector to the residual
                    stream" papers.
                </li>
                <li className="mb-2">
                    <ExtLink href="https://arxiv.org/abs/2310.01405">Representation Engineering</ExtLink>{' '}
                    (Zou et al., 2023): a broader top-down framing of reading and controlling
                    concepts in activation space.
                </li>
                <li className="mb-2">
                    <ExtLink href="https://www.anthropic.com/news/golden-gate-claude">
                        Golden Gate Claude
                    </ExtLink>{' '}
                    (Anthropic, 2024): the demo that made steering legible to everyone.
                </li>
                <li className="mb-2">
                    <ExtLink href="https://transformer-circuits.pub/2025/introspection/index.html">
                        Emergent Introspective Awareness in Large Language Models
                    </ExtLink>{' '}
                    (Anthropic, 2025): the concept-injection protocol behind the "can the model
                    tell?" experiment.
                </li>
            </ul>
        </article>
    );
};

export default Shillm;
