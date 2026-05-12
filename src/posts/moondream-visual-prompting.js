import React from 'react';
import { ReactComponent as PromptTemplateDiagram } from './diagrams/moondream-prompt-template.svg';

const MoondreamVisualPrompting = () => {
    return (
        <article className="mx-auto py-16 px-4 font-['Inter',sans-serif] text-lg max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Visually Prompting Moondream</h1>
            <p className="text-sm text-gray-500 mb-2">May 9, 2026</p>
            <p className="mb-8">
                <a
                    href="https://huggingface.co/spaces/nkasmanoff/moondream-visual-prompt"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Try the demo on Hugging Face →
                </a>
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Motivation</h2>
            <p className="mb-6">
                I loved Legos as a kid, and recently started building with them again. The main
                difference between then and now is I have been trained as a consultant to find any
                process inefficiencies, and think of ways to improve them. While building my newest
                set, my inner consultant quickly overwhelmed the inner child in me. To build, the
                setup is simple. You have two things in front of you. The instruction manual, and a
                pile of Legos. The manual tells you what you need to grab, and where to put it. The
                slow part is searching through the pile to find that piece. What if you could do
                this faster? I envisioned an application where you can show a model an image of the
                candidate piece, and it will return it's exact location in the pile.
            </p>
            <p className="mb-6">
                While this kind of defeats the purpose of building Legos in the first place, it's a
                great motivating example for the bigger problem: sometimes you want to find
                something in an image and you can't easily describe it in text. You just have a{' '}
                <em>picture</em> of it.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Idea: use Moondream</h2>
            <p className="mb-6">
                <a
                    href="https://moondream.ai/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Moondream AI
                </a>{' '}
                (and Moondream 2 in particular) is a small ~2B parameter open-weights
                vision-language model. It already knows how to encode images, and it already has a
                built-in <code className="bg-gray-100 px-2 py-1 rounded">detect</code> function that
                returns bounding boxes for an object provided as text — e.g.{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">baseball hat</code> or{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">red mug</code>.
            </p>
            <p className="mb-6">
                So the question that took over my weekend was: it can encode images, and it can
                already detect things from text. Can we make it detect things from{' '}
                <em>another image</em>?
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Approach</h2>
            <p className="mb-6">
                As a motivating example of what we want, here's the kind of result we want. Given a{' '}
                <em>query</em> image of an object and a <em>target</em> image, find every instance
                of that object in the target. Below is an example from the trained model:
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-2 items-start max-w-2xl mx-auto">
                <figure className="flex-1">
                    <img
                        src="/images/moondream-demo-query.png"
                        alt="Query image: a close-up crop of a panda."
                        className="w-full h-64 object-contain mb-2"
                    />
                    <figcaption className="text-sm text-gray-500 text-center">
                        Input image: what we want to find.
                    </figcaption>
                </figure>
                <figure className="flex-1">
                    <img
                        src="/images/moondream-demo-target.png"
                        alt="Target image: a busy airport baggage area with several toy pandas, with the model's detections drawn over them."
                        className="w-full h-64 object-contain mb-2"
                    />
                    <figcaption className="text-sm text-gray-500 text-center">
                        Target image with detections: every panda found.
                    </figcaption>
                </figure>
            </div>
            <p className="text-sm text-gray-500 mb-6">
                Images from the{' '}
                <a
                    href="https://www.lvisdataset.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    LVIS dataset
                </a>
                .
            </p>
            <p className="mb-6">
                That's the behavior we're after. The plan is to keep Moondream's detect service
                as-is, but swap out the text class name for image tokens from a query image. Image
                tokens and text tokens go into the model the same way, so in theory this should
                just... work.
            </p>
            <div className="bg-gray-100 p-4 rounded mb-6 overflow-x-auto">
                <PromptTemplateDiagram
                    className="w-full h-auto"
                    role="img"
                    aria-label="Token sequence: BOS and target image patches, then detect prefix, then a question-mark slot, then detect suffix, producing boxes. The question-mark slot is filled either by text tokens for the class name or by embeddings from a query image."
                />
            </div>
            <p className="mb-6">A couple of questions had to get answered before fine-tuning:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    Do we need to consolidate the 729 image tokens that come out of the vision
                    encoder, or can we splice them in directly? (I went with mean-pooling them into
                    a single token to start, just to keep the prompt shape similar to the text
                    version.)
                </li>
                <li className="mb-2">
                    Does the embedding space of these query tokens already live somewhere relatively
                    close to where the text token for that object would live? In other words, does
                    Moondream "see" a fork image and the tokens for the word "fork" the same way out
                    of the box, even before any training?
                </li>
            </ul>
            <p className="mb-6">
                Spot-checking a few examples, the answer to the second question was a soft yes.
                Close enough to be worth fine-tuning. For more details, see{' '}
                <a
                    href="https://github.com/nkasmanoff/moondream-finetuning/blob/experiment/image-query-detection/Test%20Visual%20Prompting.ipynb"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    this notebook
                </a>
                .
            </p>
            <p className="mb-6">
                For training, I attached LoRA adapters to the vision projection MLP (the small piece
                that maps ViT features into the text decoder's space) and fully fine-tuned the
                region prediction head. In theory you could go even more modular and train{' '}
                <em>only</em> the vision projection, or wrap the query encoder in a small dedicated
                model, but this combo was a reasonable starting point.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">How is fine-tuning done?</h2>
            <p className="mb-6">
                For data, I used{' '}
                <a
                    href="https://www.lvisdataset.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    LVIS,
                </a>{' '}
                a dataset of everyday objects with lots of examples of the same class across many
                images. Perfect for quickly assembling triplets without building anything custom.
            </p>
            <p className="mb-6">Each training example is a triplet:</p>
            <ul className="list-disc pl-8 mb-6">
                <li className="mb-2">
                    <strong>Query image:</strong> the bounding-box crop of an object from one sample
                    image (e.g. a fork crop).
                </li>
                <li className="mb-2">
                    <strong>Target image:</strong> a <em>different</em> image that contains at least
                    one instance of the same class.
                </li>
                <li className="mb-2">
                    <strong>Boxes:</strong> all the ground-truth bounding boxes of that class in the
                    target image.
                </li>
            </ul>
            <p className="mb-6">
                So if you have a fork crop pulled from one photo, you prompt the model with that
                crop and a different photo, and hope it draws bounding boxes over the forks in the
                target.
            </p>
            <p className="mb-6">
                For the loss itself, I used a "teacher-forcing" approach that worked well for me in
                the past. Moondream predicts <em>discrete bins</em> for x-center, y-center, width,
                and height of each box. So for every ground-truth box in the target image, you get
                four cross-entropy terms (one per axis) against those bins. After each axis is
                predicted, the ground-truth value gets fed back in as the next input — that's the
                "teacher forcing" part, and it lets the model learn each axis without error
                compounding across the box, which in my experience was causing too much instability
                in training. The full loss is just the average of those four cross-entropy terms
                across all boxes in the sample (capped at{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">max_objects_per_sample</code> to
                keep things bounded).
            </p>
            <p className="mb-6">
                The transfer is not perfect. A fork from one kitchen doesn't look identical to a
                fork from another, lighting and angles differ, etc. So there's a real ceiling to how
                well this dataset can train the model. But it's enough to see whether the idea works
                at all and whether it's worth more attention I've given it so far.
            </p>

            <h2 className="text-3xl font-semibold mt-10 mb-6">Results</h2>
            <p className="mb-6">
                Results agree with the premise. The F1 score on a held-out set of classes not used
                during training goes from roughly <strong>0.09419</strong> at the start of training
                to around <strong>0.34195</strong> after fine-tuning! Not amazing in absolute terms,
                but a clear improvement (over 3x) that says the model is learning to read the visual
                prompt.
            </p>
            <p className="mb-6">
                Here are a couple of examples from the validation set. Each figure shows the query
                crop on the left, and the target image on the right with ground-truth boxes in green
                and the model's predictions in magenta:
            </p>
            <figure className="mb-8 max-w-2xl mx-auto">
                <img
                    src="/images/moondream-ski-parka-example.png"
                    alt="Visual prompting example: query crop of a ski parka, target image of two snowboarders with predicted and ground-truth bounding boxes."
                    className="w-full mb-2"
                />
                <figcaption className="text-sm text-gray-500 text-center">
                    Query: a ski parka crop. The model finds both parkas in the target scene (TP=2),
                    with one false positive — not bad given "ski parka" was never seen during
                    training.
                </figcaption>
            </figure>
            <figure className="mb-8 max-w-2xl mx-auto">
                <img
                    src="/images/moondream-fork-example.png"
                    alt="Visual prompting example: query crop of a fork on pasta, target image of a hot dog plate where the model correctly localizes the fork."
                    className="w-full mb-2"
                />
                <figcaption className="text-sm text-gray-500 text-center">
                    Query: a fork crop pulled from a totally different photo (pasta). The model
                    correctly localizes the fork on the hot dog plate — a clean transfer across very
                    different scenes.
                </figcaption>
            </figure>
            <p className="mb-6">
                And a representative <strong>failure mode</strong>:
            </p>
            <figure className="mb-8 max-w-2xl mx-auto">
                <img
                    src="/images/moondream-slide-example.png"
                    alt="Failure mode: query crop labeled 'slide' shows a child in front of a yellow slide. Target image of a person with a frisbee. The model predicts a box around the person, missing the actual slide."
                    className="w-full mb-2"
                />
                <figcaption className="text-sm text-gray-500 text-center">
                    Query: <code className="bg-gray-100 px-1 rounded">slide</code>. The class here
                    is "slide," but the dominant subject of the query crop is the child in front of
                    it. Mean-pooling smears the kid and the slide into a single token, so the model
                    ends up boxing the person in the target image instead of the slide — a clean
                    illustration of why a single pooled vector is a lossy way to represent a query,
                    and why a more-targeted pooling (or attentive pooling conditioned on the target)
                    is the obvious next step.
                </figcaption>
            </figure>
            <p className="mb-6">
                I ran out of GPU credits on{' '}
                <a
                    href="https://lightning.ai/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Lightning
                </a>{' '}
                before I could finish a proper grid search, but the runs and code so far are
                available{' '}
                <a
                    href="https://github.com/nkasmanoff/moondream-finetuning"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    here{' '}
                </a>{' '}
                and{' '}
                <a
                    href="https://wandb.ai/noahpunintended/moondream-visual-prompt-ft-sweep?nw=nwusernoahpunintended"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    here
                </a>
                .
            </p>
            <h2 className="text-3xl font-semibold mt-10 mb-6">Out-of-distribution test</h2>
            <p className="mb-6">
                To reiterate, the fine-tune above was trained entirely on{' '}
                <a
                    href="https://www.lvisdataset.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    LVIS
                </a>{' '}
                , common everyday objects (forks, pandas, slides, mugs). So I wanted to see what
                would happen if I gave it a query crop of a single basketball player see what it
                would do:
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-2 items-start max-w-2xl mx-auto">
                <figure className="flex-1">
                    <img
                        src="/images/moondream-warriors-query.png"
                        alt="Query image: a tight crop of a Golden State Warriors player in a white #30 jersey."
                        className="w-full h-64 object-contain mb-2"
                    />
                    <figcaption className="text-sm text-gray-500 text-center">
                        Query image: Klay Thompson.
                    </figcaption>
                </figure>
                <figure className="flex-1">
                    <img
                        src="/images/moondream-warriors-detections.png"
                        alt="Target image: a wide shot of a Warriors home game with the model's detections drawn around every player on the court."
                        className="w-full h-64 object-contain mb-2"
                    />
                    <figcaption className="text-sm text-gray-500 text-center">
                        Target image with detections: all the Warriors players (and two Cavs).
                    </figcaption>
                </figure>
            </div>
            <p className="mb-6">
                This is a a pretty promising sign that the model can use query images as a way to
                guide object detection. This result, and any others you would like to try, can be
                tested on the{' '}
                <a
                    href="https://huggingface.co/spaces/nkasmanoff/moondream-visual-prompt"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    Hugging Face demo.
                </a>
            </p>

            <p className="mb-6">
                Excited for any feedback, ideas for better pooling / training setups, or suggestions
                for what else to build on top of Moondream next!
            </p>
        </article>
    );
};

export default MoondreamVisualPrompting;
