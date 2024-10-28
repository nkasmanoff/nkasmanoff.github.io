import React from 'react';
import '../../pages/style.css';
import ProjectCard from './ProjectCard';
import { Container, Row, Col } from 'react-bootstrap';
import estr from '../../Assets/ESTR.png';
import oaiImage from '../../Assets/oaiSimClr.png';

import dm2gal from '../../Assets/pFields.png';
import burstcubeLocalization from '../../Assets/burstcubeLocalization.png';
import autoLabel from '../../Assets/autoLabel.png';
import sentinel from '../../Assets/humanActivity.gif';
import landCover from '../../Assets/landCover.png';
import waterLevels from '../../Assets/waterLevels.gif';
import landCoverTrends from '../../Assets/landCoverTrends.png';
import humanActivity from '../../Assets/humanActivity.gif';
import zindiChallenge from '../../Assets/zindiChallenge.png';
import searchingFace from '../../Assets/searchingFace.png';
import floodBrain from '../../Assets/floodbrain.png';
import picard from '../../Assets/picard.png';
import sdofm from '../../Assets/sdofm.png';
function Projectlist() {
    return (
        <div className="projectbackground">
            <Container fluid className="project-section">
                <Container>
                    <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
                        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
                            <Col md={4} className="project-card">
                                <ProjectCard
                                    imgPath={sdofm}
                                    isBlog={false}
                                    title="SDO-FM"
                                    description="A Foundation Model for the Solar Dynamics Observatory."
                                    descriptionFull={
                                        <>
                                            <a href="https://arxiv.org/abs/2410.02530">Abstract</a>
                                        </>
                                    }
                                />
                            </Col>

                            <Col md={4} className="project-card">
                                <ProjectCard
                                    isBlog={false}
                                    imgPath={picard}
                                    title="Pi-CARD"
                                    description="Fast local voice assistant. Hosted on the Raspberry Pi 5."
                                    descriptionFull={
                                        <>
                                            <a href="https://github.com/nkasmanoff/pi-card">
                                                GitHub
                                            </a>
                                        </>
                                    }
                                />
                            </Col>
                            <Col md={4} className="project-card">
                                <ProjectCard
                                    imgPath={floodBrain}
                                    isBlog={false}
                                    title="FloodBrain"
                                    description="Flood Disaster Reporting by Web-based Retrieval Augmented Generation with an LLM."
                                    descriptionFull={
                                        <>
                                            <a href="https://arxiv.org/abs/2311.02597">Abstract</a>
                                        </>
                                    }
                                />
                            </Col>
                        </Row>
                        <Row style={{ justifyContent: 'center', paddingBottom: '10px' }}>
                            <Col md={4} className="project-card">
                                <ProjectCard
                                    isBlog={false}
                                    imgPath={searchingFace}
                                    title="NYC GPT Hackathon"
                                    description="Enhanced dataset search on HuggingFace."
                                    descriptionFull={
                                        <>
                                            <p>
                                                In May 2023, I participated in a hackathon hosted by
                                                Cornell Tech. The goal of this day was to create a
                                                tool to help users find the right dataset for their
                                                project. The tool I created is called{' '}
                                                <a href="https://nkasmanoff-searchingface.hf.space">
                                                    SearchingFace
                                                </a>
                                                , and is a semantic search engine for datasets on
                                                the HuggingFace Hub. Apologies in advance if the
                                                space is down due to inactivity, but I hope the
                                                pipeline diagram above is helpful in understanding
                                                how this tool works. It's not the most elegant
                                                solution, but it was a fun project to work on!
                                            </p>
                                        </>
                                    }
                                />
                            </Col>
                            <Col md={4} className="project-card">
                                <ProjectCard
                                    imgPath={zindiChallenge}
                                    isBlog={false}
                                    title="NASA Harvest Field Boundary Detection Challenge"
                                    description="Classifying crop field boundaries using multi-spectral observations collected by PlanetScope."
                                    descriptionFull={
                                        <>
                                            <p>
                                                In January to February 2023, I participated in a
                                                data science competition for detecting field
                                                boundaries for Rwandan farms using satellite images.
                                                Of around 185 participants, my{' '}
                                                <a href="https://github.com/nkasmanoff/nasa_harvest_challenge">
                                                    results
                                                </a>{' '}
                                                came in 21st place.
                                            </p>
                                            <p>
                                                To quickly summarize, this result was achieved
                                                through a variety of tweaks and adjustments to an
                                                otherwise straightforward image segmentation
                                                problem. For me to best demonstrate these changes, I
                                                feel it is easiest to instead link to notebooks
                                                which contain this code & explanations, so I'll do
                                                so here.
                                            </p>
                                            <p>
                                                Code for data exploration and model training{' '}
                                                <a href="https://github.com/nkasmanoff/nasa_harvest_challenge/blob/main/Model_Training_and_Evaluation.ipynb">
                                                    here
                                                </a>{' '}
                                                .
                                            </p>
                                            <p>
                                                Code for model ensemble, inference, and result
                                                submission{' '}
                                                <a href="https://github.com/nkasmanoff/nasa_harvest_challenge/blob/main/Ensemble_Inference.ipynb">
                                                    here
                                                </a>{' '}
                                                .
                                            </p>
                                        </>
                                    }
                                />
                            </Col>
                            <Col md={4} className="project-card">
                                <ProjectCard
                                    imgPath={sentinel}
                                    isBlog={false}
                                    title="NYC Sentinel"
                                    description="Detecting land cover change in the NYC metropolitan area."
                                    descriptionFull={
                                        <>
                                            <p>
                                                In this pet project, and I explore how easy it is to
                                                get started with applying ML to this satellite
                                                imagery.
                                            </p>
                                            <p>
                                                To briefly outline this blog post, I will diving
                                                into:
                                                <ul>
                                                    <li>How I Wrangled this Data</li>
                                                    <li>How I Created a Land Cover Classifier</li>
                                                    <li>What Insights I Obtained</li>
                                                </ul>
                                            </p>
                                            <p>
                                                The code for this work can be found{' '}
                                                <a href="https://github.com/nkasmanoff/nyc-sentinel">
                                                    here
                                                </a>
                                            </p>
                                            <center>
                                                <h2 justify="center">Getting Started</h2>
                                            </center>
                                            <h3> Earth Observation Data</h3>
                                            <p>
                                                {' '}
                                                While searching for data, the first thing I learned
                                                is how varied Earth observation data is.
                                            </p>
                                            <p>
                                                {' '}
                                                To start, there are two main types of collection
                                                instruments. One kind is synthetic aperture radar (
                                                <a href="https://www.earthdata.nasa.gov/learn/backgrounders/what-is-sar">
                                                    SAR
                                                </a>
                                                ) which is created by a device that measures the
                                                intensity of the signal it bounces off of the
                                                Earth's surface. The advantage of this kind of
                                                system is that we can tell a lot of things about
                                                surface characteristics depending on what the
                                                returned signal is. Even more importantly, SAR data
                                                is not restricted by sunlight or cloud cover. This
                                                means that in the event of cloudy conditions (like
                                                during a Hurricane) SAR instruments are able to
                                                provide data when it may matter most.
                                            </p>
                                            <p>
                                                {' '}
                                                However, as of writing this (Oct 2022) SAR data is
                                                not as easily accessible. The signals they produce
                                                are not easy to interpret, and at least from what I
                                                saw, it is harder for the casual user to find a
                                                steady source of. I don't doubt there are good
                                                reasons for this, but nonetheless, SAR data is not
                                                something I used in this work.
                                            </p>
                                            <p>
                                                {' '}
                                                Alternatively, optical satellite images are a lot
                                                easier to find and work with. While they can lack
                                                the level of detail SAR images provide, it is much
                                                easier to understand photographs. But as also
                                                alluded to, they are restricted by sunlight + cloud
                                                cover, meaning they are not always the most reliable
                                                tool depending on use case. In this case, their
                                                straightforward interpret and ease of access made
                                                them the preferred choice.
                                            </p>
                                            <h3> Sentinel 2</h3>
                                            <p>
                                                There are a host of optical satellites out there.
                                                All of these instruments offer different cadences /
                                                resolutions. I wasn't especially picky for this
                                                project, and went with what looked like the most
                                                accessible for an amateur like me! While happy with
                                                what I worked with, it's encouraging to see the
                                                flavors of EO data to work with are already quite
                                                extensive and{' '}
                                                <a href="https://phys.org/news/2021-10-planet-fleet-earth-satellites.html">
                                                    growing
                                                </a>
                                                .
                                            </p>
                                            <p>
                                                {' '}
                                                <a href="https://sentinel.esa.int/web/sentinel/missions/sentinel-2">
                                                    Sentinel-2
                                                </a>{' '}
                                                already came with an easy to access{' '}
                                                <a href="https://github.com/sentinelsat/sentinelsat">
                                                    API
                                                </a>
                                                , which made it easy to download images. All that I
                                                needed to prepare beforehand was an outline of the
                                                region I wanted to get imagery for, which I
                                                accomplished using{' '}
                                                <a href="http://geojson.io/#map=12/40.7579/-73.9651">
                                                    this website
                                                </a>
                                                .{' '}
                                            </p>
                                            <p>
                                                <a href="https://github.com/nkasmanoff/nyc-sentinel/blob/main/Sentinel%20Data%20Download%20Script.ipynb">
                                                    This notebook
                                                </a>{' '}
                                                gives a quick breakdown for how I managed to
                                                download the images of interest, and store them for
                                                further analysis.
                                            </p>{' '}
                                            With the important data ready, next up I made the tools
                                            for the job.
                                            <h3> EuroSAT Dataset</h3>
                                            <p>
                                                {' '}
                                                The tool I was after was a machine learning model to
                                                accurately tell me what category of land cover a
                                                particular image (or portion of an image) is.
                                                Parallel to obtaining my Sentinel-2 data, I wanted
                                                to create a model to do just that. Fortunately for
                                                me, the dataset needed to build that kind of model
                                                exists! The{' '}
                                                <a href="https://github.com/phelber/EuroSAT">
                                                    EuroSAT
                                                </a>{' '}
                                                dataset is a curation of Sentinel-2 images which are
                                                categorized into 10 distinct types of land cover,
                                                each with approximately 3000 samples each. A example
                                                of these can be seen in the picture below.
                                            </p>
                                            <img
                                                src={landCover}
                                                alt=""
                                                className="projectImage"
                                                justify="center"
                                                width="250"
                                            />
                                            <p>
                                                {' '}
                                                With this highly detailed dataset, I got to work
                                                training models.{' '}
                                            </p>
                                            <center>
                                                <h2 justify="center">Model Training</h2>
                                            </center>
                                            <p>
                                                To make a fast and effective model for this task, I
                                                decided to use a convolutional neural network. In
                                                particular, the architecture I used was a{' '}
                                                <a href="https://pytorch.org/vision/main/models/generated/torchvision.models.resnet18.html">
                                                    ResNet-18
                                                </a>
                                                . There were many operational decisions I had to
                                                make for this model to perform well, so it was
                                                imperative for me to receive quick and structured
                                                feedback on how various model configurations
                                                performed. For the structured feedback, I utilized{' '}
                                                <a href="https://wandb.ai/">Weights & Biases</a> to
                                                give detailed logs on model performance.
                                            </p>
                                            <p>
                                                To make this work quick, I transferred my code to my{' '}
                                                <a href="https://developer.nvidia.com/embedded/jetson-nano-developer-kit">
                                                    Jetson
                                                </a>{' '}
                                                and used it's CUDA acceleration to rapidly run
                                                through the dataset. With this hardware, a training
                                                epoch lasted about 5 minutes.
                                            </p>
                                            <p>
                                                {' '}
                                                Though there were many important factors to
                                                training, the decision I believe to be the most
                                                impactful was my decision on how to pre-process the
                                                input images. Typically, inputs to an ML model are
                                                standardized, meaning the distribution of values in
                                                the inputs Should have a mean value of 0, and a
                                                standard deviation of 1. For datasets like ImageNet,
                                                the mean and standard deviation factors are usually
                                                known beforehand. In our case there is a big issue
                                                to this approach. Though the data all comes from the
                                                same source (Sentinel-2) there is no guarantee that
                                                the pixel values / distribution from the already
                                                .png based EuroSAT dataset will resemble the values
                                                from the API downloaded counterparts. To ensure that
                                                the model trained here would behave well with this
                                                inference data, I wanted some sort of common
                                                distribution that both sources would work well with.
                                            </p>
                                            <p>
                                                For this, I chose to standardize all pixels to be
                                                between 0 and 1 inclusive. I was initially convinced
                                                this idea would significantly impact how well the
                                                model performance would look, but after comparing
                                                two training runs with a standardized vs normalized
                                                approach, I was satisfied with their similar
                                                performance to then train a full model in earnest.
                                                All of these training logs can be found on my{' '}
                                                <a href="https://wandb.ai/noahpunintented/nyc-sentinel-src?workspace=user-noahpunintented">
                                                    WandB page
                                                </a>
                                                , and served as the backbone for my analysis to
                                                come.
                                            </p>
                                            <center>
                                                <h2 justify="center">Analysis</h2>
                                            </center>
                                            <p>
                                                {' '}
                                                The first thing I did was consolidate the classes
                                                designated by EuroSAT to something a bit more
                                                digestible for this analysis. What made the most
                                                sense to me was grouping water and manmade land
                                                features together, while renaming the natural
                                                landscape features into simpler names to better
                                                capture what phenomena they'd correspond here. For
                                                21 snapshots of the NYC area taken over the past two
                                                years, I split into distinct tiles which the now
                                                trained ResNet is able to classify it's land cover.
                                                The results of this for 2022 can be seen below:
                                            </p>
                                            <img
                                                src={landCoverTrends}
                                                alt=""
                                                className="projectImage"
                                                justify="center"
                                                width="750"
                                            />
                                            <p>
                                                <p>
                                                    The first thing we can take away from this
                                                    visual should be obvious. The majority of land
                                                    cover is human activity, such as buildings,
                                                    roadways, etc. Given that this is a satellite of
                                                    New York City, this is an intuitive result.{' '}
                                                </p>
                                                <p>
                                                    Building off this visual, the next question I
                                                    wanted to investigate was what could be driving
                                                    the change in various land cover types. To
                                                    start, I wanted to see what might be causing
                                                    there to be a dip in water from April to August.
                                                    To do this, you can see the GIF below.
                                                </p>

                                                <img
                                                    src={waterLevels}
                                                    alt="my-gif"
                                                    justify="center"
                                                    className="projectImage"
                                                    width="500"
                                                />
                                                <p>
                                                    {' '}
                                                    This is grayscale image of both Sentinel-2
                                                    images, each of which over-layed with the
                                                    ResNet's predictions of water cover in each. As
                                                    we see here, in August, there is a decent amount
                                                    of cloud cover on the Hudson River, which
                                                    impacted the model's ability to properly
                                                    classify this land type. Instead, it looks like
                                                    this was predicted to be forest cover.
                                                </p>
                                            </p>
                                            <p>
                                                {' '}
                                                Next, we can repeat the same process for the lowest
                                                and highest detected levels of human activity, in
                                                April 2022 and June 2022:
                                            </p>
                                            <img
                                                src={humanActivity}
                                                alt="my-gif"
                                                justify="center"
                                                className="projectImage"
                                                width="500"
                                            />
                                            <p>
                                                {' '}
                                                In this view, we can see that the model is
                                                accurately detecting human activity in both images,
                                                but again there is some disparity in the quality of
                                                the images. In particular, what I'm seeing in both
                                                the upper left and lower right of these images is
                                                that the intensity of the pixels is slightly greater
                                                in June, which likely helped the model pick up on
                                                those features.
                                            </p>
                                            <p>
                                                However, there are other locations, particularly on
                                                the Jersey side of the Hudson river, where it is
                                                definitely not clear that the tile corresponds to
                                                human activity in April, but is much more obvious in
                                                June. While I'm not convinced this was actually new
                                                infrastructure, it is encouraging to see that this
                                                model is capable of picking up on instances where
                                                the details from Sentinel-2 are left out.
                                            </p>
                                            <p>
                                                The biggest limitation with this approach is it's
                                                maximum available granularity. With tiles of 64x64,
                                                this is equivalent to 640m x 640m chunks of land,
                                                which are likely not as uniform as this approach
                                                suggests. In a follow up to this, I'd love to get my
                                                hands on a segmentation dataset, and apply this
                                                approach in a more detailed way.
                                            </p>
                                            <p>
                                                {' '}
                                                Furthermore, as great as Python is for setting up
                                                this analysis, it is quite limited in providing
                                                imaging tools to do these images justice. With that
                                                in mind, I'm hoping to find better tools for
                                                visualizing geospatial data as well!{' '}
                                            </p>
                                            <p>
                                                Thank you for reading, please don't hesitate to
                                                reach out if you have questions, comments, or
                                                suggestions :-){' '}
                                            </p>
                                        </>
                                    }
                                />
                            </Col>
                        </Row>
                        <Col md={4} className="project-card">
                            <ProjectCard
                                imgPath={estr}
                                isBlog={false}
                                title="ESTR"
                                description="Language model fine-tuned for generating stories about natural disasters."
                                descriptionFull={
                                    <>
                                        {' '}
                                        <p>
                                            In and after the Summer of 2021, I was a machine
                                            learning researcher at the Frontier Development Lab. The
                                            figure above is a demo of how our created tool, the
                                            Earth Science TRansformer (ESTR) will operate for NASA
                                            Earth Observatory writers. By prompting this language
                                            model with some details about a natural event, it
                                            returns to the user a short narrative.
                                        </p>
                                        <p>
                                            This pipeline operates in 3 stages. First, an input must
                                            be provided. There are two possible methods, through
                                            human specification (i.e. this article is about a
                                            hurricane in Florida), or by extracting a similar sort
                                            of prompt based on a collection of references. These
                                            references can be a variety of things, either an
                                            in-house trigger from some NASA instrument, or from a
                                            relevant news article. Once these conditions are
                                            collected, the language model generates several
                                            paragraphs. This is done using causal language modeling
                                            + conditional text generation. The writer can then
                                            choose any number of these output paragraphs to include
                                            as part of the article, and at some point this article
                                            is published. Once that article is final it is now part
                                            of the training set ESTR uses to prime itself for
                                            generation, thus continually improving. In light of
                                            recent advances of text generation through RLHF, it
                                            would be fascinating to look at this project again
                                            someday!
                                        </p>
                                        <center>
                                            <h2>Presentations</h2>
                                            <p>
                                                <a href="https://www.youtube.com/watch?v=ieA1isaXMnk">
                                                    <u>FDL 2021 Digital Showcase</u>
                                                </a>
                                                ,
                                            </p>
                                            <p>
                                                <a href="https://www.youtube.com/watch?v=gSapfgjZRks">
                                                    <u>Presentation at the SETI Institute</u>
                                                </a>
                                            </p>
                                        </center>
                                    </>
                                }
                            />
                        </Col>

                        <Col md={4} className="project-card">
                            <ProjectCard
                                imgPath={oaiImage}
                                isBlog={false}
                                title="OA Progression Prediction"
                                description="Predicting knee osteoarthritis progression with limited data."
                                descriptionFull={
                                    <>
                                        {' '}
                                        <p>
                                            {' '}
                                            As a a researcher at NYU Langone Health, I worked at the{' '}
                                            <a href="https://med.nyu.edu/faculty/cem-m-deniz">
                                                DenizLab
                                            </a>{' '}
                                            to predict whether or not an individual will develop
                                            Osteoarthritis (OA) based on a given snapshot, aka a
                                            knee MRI of that person's health. Medical images are
                                            massive, and the signal which might indicate whether or
                                            not a disease is present is sparse.
                                        </p>
                                        <p>
                                            Working with Professor Cem Deniz and Professor Kyunghyun
                                            Cho, I worked to better predict OA progression, in
                                            particularly aided by the use of self-supervised
                                            learning. Through pre-training techniques like as
                                            SimCLR, Barlow Twins, and domain specific augmentations,
                                            our models were better equipped for this task.
                                        </p>
                                        <center>
                                            {' '}
                                            <h2>Related Material</h2>
                                            <p>
                                                <a href="https://docs.google.com/presentation/d/1nmfVC1Y6ftaE6TjGdu1BhOxPUwY2pMc0W-FRjZqqBNg/edit?usp=sharing">
                                                    <u>Medical AI Frontiers Meeting (slides)</u>
                                                </a>
                                            </p>
                                            <p>
                                                <a href="https://submissions.mirasmart.com/ISMRM2023/ViewSubmissionPublic.aspx?sei=C9dI5mQxY">
                                                    <u>ISMRM Poster</u>
                                                </a>
                                            </p>
                                        </center>
                                    </>
                                }
                            />
                        </Col>

                        <Col md={4} className="project-card">
                            <ProjectCard
                                imgPath={autoLabel}
                                isBlog={false}
                                title="A Practical DL-based Tool for Medical Image Specifications"
                                description="Automating MRI image routing."
                                descriptionFull={
                                    <>
                                        <p>
                                            In Summer 2020, I worked with radiologists at NYU
                                            Langone Health to create automated method for
                                            classifying brain MRIs based on image specifications
                                            like image sequence and plane of imaging. Through the
                                            architecture we made, this model is also easily
                                            extendable to future improvements, such as detecting
                                            what body part, detecting noise, or increasing the
                                            number of sequences predicted.
                                        </p>
                                        <p>
                                            At large and growing medical institutions like NYU
                                            Langone, it is difficult to sort such studies. Depending
                                            the machine and the radiologist at the time, the written
                                            text label and specifications of the same type of MRI
                                            sequences may have very different names. So our goal was
                                            to aggregate similar studies from the past, as well as
                                            merge from different institutions for whatever the
                                            reason may be, and make this process streamlined going
                                            forward. Prior to tackling the model and evaluation
                                            aspect of this work, an important thing we needed to
                                            figure out early was how to actually label our studies.
                                            As mentioned, things could be the same even if they had
                                            different names. NYU Langone had an untapped data lake
                                            for this, and we went fishing. Once a number of
                                            potential studies were collected, our experts assigned
                                            the labels.
                                        </p>

                                        <p>
                                            To model this task, we employed two ML algorithms. The
                                            CNN accepted as input the MRI image associated with a
                                            given file to be labeled, and a random forest used all
                                            the other relevant metadata found within the DICOM file
                                            to predict what sequence class. We found success with
                                            both techniques, and even great improvement when
                                            combining the two in an ensemble.
                                        </p>
                                        <center>
                                            <h2>Related Material</h2>

                                            <p>
                                                <a href="https://link.springer.com/epdf/10.1007/s00234-022-03023-7?sharing_token=AQiXCwlOaSQYEwJ3CCReQ_e4RwlQNchNByi7wbcMAY5-rU0vauZOXm2Q6Bu9K6UX8HtYmHnr4p31VUGh-_d017Ik_KFiNI1_w0x_nAwfu68Tksi68Ci2a5WSMIc5_bDVHtZu7AJp1moFmu7ckZPaXdkzskEFjvEspah5P8VzTmY=">
                                                    <u>Journal Publication</u>
                                                </a>
                                            </p>
                                            <p>
                                                <a href="https://indico.nbi.ku.dk/event/1330/contributions/11115/">
                                                    <u>
                                                        Presentation to "Where Earth Meets Sky"
                                                        workshop
                                                    </u>
                                                </a>
                                            </p>
                                        </center>
                                    </>
                                }
                            />
                        </Col>

                        <Col md={4} className="project-card">
                            <ProjectCard
                                imgPath={dm2gal}
                                isBlog={false}
                                title="dm2gal"
                                description="Accelerating the creation of cosmological simulations."
                                descriptionFull={
                                    <>
                                        <p>
                                            In recent years, there has been significant interest and
                                            progress in using deep learning to reconstruct
                                            cosmological simulations. While traditional methods take
                                            millions of CPU hours, machine learning models are
                                            capable of creating near identical simulations in a
                                            fraction of the time. In this work, I used a deep
                                            learning model to predict stellar mass from nothing
                                            except dark matter structure. In the image above, you
                                            can see an example of how our model was able to closely
                                            resemble what the ground truth density field would look,
                                            at a fraction of the compute time. Side by side with
                                            this are what inputs we used, and what the current
                                            benchmark, known as the halo-occupation-distribution
                                            (HOD) came up with.
                                        </p>

                                        <p>
                                            {' '}
                                            I am proud to announce this work was accepted to the
                                            2020 Machine Learning and Physical Science workshop at
                                            NeurIPS!! You can find this work{' '}
                                            <a href="https://ml4physicalsciences.github.io/2020/files/NeurIPS_ML4PS_2020_115.pdf">
                                                here
                                            </a>
                                        </p>
                                        <center>
                                            <h2>Presentations</h2>
                                            <p>
                                                <a href="https://arxiv.org/pdf/2012.00186.pdf">
                                                    <u>Abstract </u>
                                                </a>
                                            </p>
                                            <a href="https://docs.google.com/presentation/d/1CHXXdwk0-OQTFvH5ZQS53uLUw2inND-w/edit?usp=sharing&ouid=114380101928713712670&rtpof=true&sd=true">
                                                <u>
                                                    Presentation to AI + Astronomy group at
                                                    University of São Paulo{' '}
                                                </u>
                                            </a>
                                            <p> </p>
                                            <a href="https://ml4physicalsciences.github.io/2020/files/NeurIPS_ML4PS_2020_115_poster.pdf">
                                                <u>NeurIPS Poster</u>
                                            </a>
                                        </center>
                                    </>
                                }
                            />
                        </Col>

                        <Col md={4} className="project-card">
                            <ProjectCard
                                imgPath={burstcubeLocalization}
                                isBlog={false}
                                title="BurstCube"
                                description="A cubesat for detecting gravitational wave counterparts."
                                descriptionFull={
                                    <>
                                        <p>
                                            The discovery of gravitational waves has ushered in a
                                            new era of astronomy. Tied to this discovery is the
                                            potential for multi-messenger astronomy, or the
                                            observation of this phenomena in the form of
                                            graviational waves, and in the form of electromagnetic
                                            radiation. This is just one part of the science mission
                                            of BurstCube, a cubesat for gamma-ray bursts. In my time
                                            working on BurstCube, I created a simulation from
                                            scratch to assess different detector orientations, and
                                            determine what setting is most suitable for BurstCube's
                                            science.
                                        </p>
                                        <center>
                                            <h2>Presentations</h2>
                                            <p>
                                                <a href="https://docs.google.com/presentation/d/1wWBKCfqLemWaP4QFgzZLVOvvZw3r75pKiEIQj8QKIhY/edit?usp=sharing">
                                                    <u>Fermi Symposium (poster)</u>
                                                </a>
                                            </p>
                                        </center>
                                    </>
                                }
                            />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
}
export default Projectlist;
