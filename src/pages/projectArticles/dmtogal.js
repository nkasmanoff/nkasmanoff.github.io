
import React from "react";
import pFields from '../../images/pFields.png'
function dmtogal(){

    return  ( 	<article>
                    <center>
                <h1>dm2gal</h1>
            </center>
            <img src={pFields} alt="" className="projectImage" justify="center"/>

            <p>In recent years, there has been significant interest and progress in using deep learning to reconstruct cosmological simulations. While traditional methods take millions of CPU hours, machine learning models are capable of creating near identical simulations in a fraction of the time. In this work, I used a deep learning model to predict stellar mass from nothing except dark matter structure. In the image above, you can see an example of how our model was able to closely resemble what the ground truth density field would look, at a fraction of the compute time. Side by side with this are what inputs we used, and what the current benchmark, known as the halo-occupation-distribution (HOD) came up with.
            </p>

            <p>             I am proud to announce this work was accepted to the 2020 Machine Learning and Physical Science workshop at NeurIPS!! You can find this work  <a href="https://ml4physicalsciences.github.io/2020/files/NeurIPS_ML4PS_2020_115.pdf">here</a></p>
            <center>
            <h2>Presentations</h2>
            <p>
            <a href="https://arxiv.org/pdf/2012.00186.pdf"><u>Abstract </u></a>

            </p>
            <a href="https://docs.google.com/presentation/d/1CHXXdwk0-OQTFvH5ZQS53uLUw2inND-w/edit?usp=sharing&ouid=114380101928713712670&rtpof=true&sd=true"><u>Presentation to AI + Astronomy group at University of São Paulo </u></a>
            <p> </p>
            <a href="https://ml4physicalsciences.github.io/2020/files/NeurIPS_ML4PS_2020_115_poster.pdf"><u>NeurIPS Poster</u></a>
            </center>

    </article>
    )

}

export default dmtogal;