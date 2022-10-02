import React from "react";
import ESTR from '../../images/ESTR.png'

function fdl(){

    return  (								<article>
        <center>
            <h1>Automated Reporting of Natural Events using Staellite Imagery and Metadata</h1>
        </center>
        <img src={ESTR} alt="" className="projectImage" justify="center"/>
        <p>

            To provide a bit more context as to what this work at the Frontier Development Lab involved, the figure above demonstrates the pipeline in which our Earth Science TRansformer (ESTR)
            will be deployed for NASA Earth Observatory writers. What I would emphasize from this work is that while like all other ML projects that although the data collection and model training
            phases are vitally important to success, there is a lot more to a project which is meant for deployment. In this case, that especially relates to how one can monitor and control a model.
        </p>

        <p>

            This pipeline operates in ~3 stages. First, an input must be provided. There are two possible methods for getting such inputs, either through human specification (i.e. this article is about a hurricane in Florida), or by extracting a similar sort of prompt
            based on a collection of references. These references can be a variety of things, either an in-house trigger from some NASA instrument, or from a relevant news article.

            Once these conditions are collected, the language model will generate several paragraphs. This is done using causal langauage modeling + conditional text generation. The writer can then choose any number of these output paragraphs to include as part of the article,
            and at some point this article is published. Once that article is final it is now part of the training set ESTR uses to prime itself for generation, thus continually improving. I say ~3 because this process in theory should repeat N times for N articles to be generated.


        </p>

        <p>
            My team and I at FDL completed this model, packaged it inside a Docker container, and wrapped it inside a REST API. There are certainly limitations to this approach discussed in our presentations, but who knows, maybe even this article was automatically generated :-).
        </p>
        <center>
            <h2>Presentations</h2>
            <p> 
        <a href="https://www.youtube.com/watch?v=ieA1isaXMnk"><u>FDL 2021 Digital Showcase</u></a>,
        </p>
        <p>
        <a href="https://www.youtube.com/watch?v=gSapfgjZRks"><u>Presentation at the SETI Institute</u></a>
        </p>
        </center>

    </article>
    )

}

export default fdl;