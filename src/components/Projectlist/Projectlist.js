import React from "react";
import "../../pages/style.css";
import ProjectCard from "./ProjectCard";
import { Container, Row, Col } from "react-bootstrap";
import estr from "../../Assets/ESTR.png";
import oaiImage from "../../Assets/oaiSimClr.png";

import dm2gal from "../../Assets/pFields.png";
import burstcubeLocalization from "../../Assets/burstcubeLocalization.png";
import autoLabel from "../../Assets/autoLabel.png";

function Projectlist() {
  return (
    <div className="projectbackground">
      <Container fluid className="project-section">
        <Container>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={estr}
                isBlog={false}
                title="ESTR"
                description="Language model fine-tuned for generating stories about natural disasters."
                descriptionFull={
                  <>
                    {" "}
                    <p>
                      In and after the Summer of 2021, I was a machine learning
                      researcher at the Frontier Development Lab. The figure
                      above is a demo of how our created tool, the Earth Science
                      TRansformer (ESTR) will operate for NASA Earth Observatory
                      writers. By prompting this language model with some
                      details about a natural event, it returns to the user a
                      short narrative.
                    </p>
                    <p>
                      This pipeline operates in 3 stages. First, an input must
                      be provided. There are two possible methods, through human
                      specification (i.e. this article is about a hurricane in
                      Florida), or by extracting a similar sort of prompt based
                      on a collection of references. These references can be a
                      variety of things, either an in-house trigger from some
                      NASA instrument, or from a relevant news article. Once
                      these conditions are collected, the language model
                      generates several paragraphs. This is done using causal
                      language modeling + conditional text generation. The
                      writer can then choose any number of these output
                      paragraphs to include as part of the article, and at some
                      point this article is published. Once that article is
                      final it is now part of the training set ESTR uses to
                      prime itself for generation, thus continually improving.
                      In light of recent advances of text generation through
                      RLHF, it would be fascinating to look at this project
                      again someday!
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
                    {" "}
                    <p>
                      {" "}
                      As a a researcher at NYU Langone Health, I worked at the{" "}
                      <a href="https://med.nyu.edu/faculty/cem-m-deniz">
                        DenizLab
                      </a>{" "}
                      to predict whether or not an individual will develop
                      Osteoarthritis (OA) based on a given snapshot, aka a knee
                      MRI of that person's health. Medical images are massive,
                      and the signal which might indicate whether or not a
                      disease is present is sparse.
                    </p>
                    <p>
                      Working with Professor Cem Deniz and Professor Kyunghyun
                      Cho, I worked to better predict OA progression, in
                      particularly aided by the use of self-supervised learning.
                      Through pre-training techniques like as SimCLR, Barlow
                      Twins, and domain specific augmentations, our models were
                      better equipped for this task.
                    </p>
                    <center>
                      {" "}
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
                      In Summer 2020, I worked with radiologists at NYU Langone
                      Health to create automated method for classifying brain
                      MRIs based on image specifications like image sequence and
                      plane of imaging. Through the architecture we made, this
                      model is also easily extendable to future improvements,
                      such as detecting what body part, detecting noise, or
                      increasing the number of sequences predicted.
                    </p>
                    <p>
                      At large and growing medical institutions like NYU
                      Langone, it is difficult to sort such studies. Depending
                      the machine and the radiologist at the time, the written
                      text label and specifications of the same type of MRI
                      sequences may have very different names. So our goal was
                      to aggregate similar studies from the past, as well as
                      merge from different institutions for whatever the reason
                      may be, and make this process streamlined going forward.
                      Prior to tackling the model and evaluation aspect of this
                      work, an important thing we needed to figure out early was
                      how to actually label our studies. As mentioned, things
                      could be the same even if they had different names. NYU
                      Langone had an untapped data lake for this, and we went
                      fishing. Once a number of potential studies were
                      collected, our experts assigned the labels.
                    </p>

                    <p>
                      To model this task, we employed two ML algorithms. The CNN
                      accepted as input the MRI image associated with a given
                      file to be labeled, and a random forest used all the other
                      relevant metadata found within the DICOM file to predict
                      what sequence class. We found success with both
                      techniques, and even great improvement when combining the
                      two in an ensemble.
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
                            Presentation to "Where Earth Meets Sky" workshop
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
                      millions of CPU hours, machine learning models are capable
                      of creating near identical simulations in a fraction of
                      the time. In this work, I used a deep learning model to
                      predict stellar mass from nothing except dark matter
                      structure. In the image above, you can see an example of
                      how our model was able to closely resemble what the ground
                      truth density field would look, at a fraction of the
                      compute time. Side by side with this are what inputs we
                      used, and what the current benchmark, known as the
                      halo-occupation-distribution (HOD) came up with.
                    </p>

                    <p>
                      {" "}
                      I am proud to announce this work was accepted to the 2020
                      Machine Learning and Physical Science workshop at
                      NeurIPS!! You can find this work{" "}
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
                          Presentation to AI + Astronomy group at University of
                          São Paulo{" "}
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
                      The discovery of gravitational waves has ushered in a new
                      era of astronomy. Tied to this discovery is the potential
                      for multi-messenger astronomy, or the observation of this
                      phenomena in the form of graviational waves, and in the
                      form of electromagnetic radiation. This is just one part
                      of the science mission of BurstCube, a cubesat for
                      gamma-ray bursts. In my time working on BurstCube, I
                      created a simulation from scratch to assess different
                      detector orientations, and determine what setting is most
                      suitable for BurstCube's science.
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
