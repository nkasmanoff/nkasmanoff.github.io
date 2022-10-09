
import React from "react";
import oaiCausalModel from '../../images/oaiCausalModel.png'
function oaiSsl(){

    return  ( 								<article className="researchPost">

        <center>
            <h1>OA Progression Prediction using Self-Supervised Representation Learning</h1>
        </center>
        <img src={oaiCausalModel} alt="" className="projectImage" justify="center" width="500"/>

        <p> As a a research engineer at NYU Langone Health, I worked at the <a href="https://med.nyu.edu/faculty/cem-m-deniz">DenizLab</a> to predict whether or not an individual will develop Osteoarthtitis (OA) based on a given snapshot, aka a knee MRI.

            While this sounds like a fairly straightforward task, there are a lot of nuances to pathology prediction which made this difficult.

            In particular, medical images are huge, and the signal which might indicate whether or not a disease is present is sparse.

        </p>

        <p>
            That is where this headlining image comes into play. Working with Professor Deniz and Professor Cho, we anticipated the attach causal model.

                What this meant is that to use an MRI to predict OA progression, we needed to ensure that the lines leaving x truly connected to these intermediate (latent) factors.

                Much to our benefit, they did! How did we figure that out? Using self-supervised representation learning! By coupling an unlabeled dataset with our modestly sized labeled one, we found
                strong correspondence between the latent representations extracted via self-supervised learning techniques such as SimCLR, Barlow Twins, and some domain specific ones and
                latent factors like a patients sex, BMI, age, etc. The way that I think about this is if you've ever watch the TV show Bones, you know that Dr. Brennan is able to extract some really specific insights about a person
                just based on their skeleton. Our ML model does something similar, but just for knees.
            </p>

                <p>
                    Unfortnately, this was still not enough. Although our model is now a "bones" expert, it still struggled with the progression prediction task.

                    Why might that be? Well as the graph indicates, these latent factors are not the only property feeding into future status, nor is future status the only thing
                    such factors affect.

                    As briefly touched on, medical images are huge and contain sparse signals, and our representation learning techniques essentially captured the most abundant detail, the bone structure.

                    This is not the only thing important to OA, as cartilage is actually where the disease manifests! So while we have successfully used SSL to extract a key property from such images, the remaining work is to figure out how to tease out the equally (or sizable proportion) important "current" status
                     of an individual's knee that is represented by cartilage. Keep an eye on the Deniz Lab to see this and other amazing research produced!



        </p>
        <center>         <h2>Presentations</h2>
        <p> 
    <a href="https://docs.google.com/presentation/d/1nmfVC1Y6ftaE6TjGdu1BhOxPUwY2pMc0W-FRjZqqBNg/edit?usp=sharing"><u>Medical AI Frontiers Meeting (slides)</u></a>
    </p>
    </center>



    </article>
    )

}

export default oaiSsl;