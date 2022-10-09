
import React from "react";
import autoLabel from '../../images/autoLabel.png'

function mriContentDetection(){

    return  (	<article className="researchPost">
        <center>
            <h3>A Practical DL-based Tool for Medical Image Specifications</h3>
        </center>
        <img src={autoLabel} alt="" className="projectImage" justify="center"/>
        <p>
            As a summer research fellow at the Moore-Sloan Data Science Environment,
            I worked with radiologists at NYU Langone Health to create automated method for
            classifying brain MRIS based on image specifications like image sequence and plane of imaging.
        </p>
        <p>
            An example "autolabel" is shown above.
          We employed two complementary machine learning models, a convolutional neural network and a random forest classifier to
            sort radiological studies based on these image specifications.




        </p>
        <p>

            At large and growing medical institutions like NYU Langone, it can be difficult to sort such studies. Depending the machine and the radiologist at the time, the written text label
            and specifcations of the same type of MRI sequences may have very different names! Although it is important to note that in the future hopefully such conflicts do not arise, in the meantime,
             it would still be nice to aggregate similar studies from the past, as well as merge from different institutions for whatever the reason may be.

             Prior to tackling the model and evaluation aspect of this work, an important thing we needed to figure out early was how to actually label our studies. As mentioned, things could be the same even if they had different names.
             NYU Langone had an untapped data lake for this, and we went fishing. Once a number of potential studies were collected, our experts assigned the labels.
        </p>

        <p>
            To model this task, we employed two ML algorithms. The CNN accepted as input the MRI image associated with a given file to be labeled, and a random forest used all the other relevant metadata
            found within the DICOM file to predict what sequence class. We found success with both techniques, and even great improvement when combining the two in an ensemble. I will note that while I am only referring to the prediction of
                sequence type, this model was extended to also predicting what image orientation was used. We hope to expand the output tasks of such a model in the future, as more data becomes labeled.
            </p>
            <center> 
            <h2>Presentations</h2>

            <p>
            <a href="https://link.springer.com/epdf/10.1007/s00234-022-03023-7?sharing_token=AQiXCwlOaSQYEwJ3CCReQ_e4RwlQNchNByi7wbcMAY5-rU0vauZOXm2Q6Bu9K6UX8HtYmHnr4p31VUGh-_d017Ik_KFiNI1_w0x_nAwfu68Tksi68Ci2a5WSMIc5_bDVHtZu7AJp1moFmu7ckZPaXdkzskEFjvEspah5P8VzTmY="><u>Journal Publication</u></a>


            </p>
            <p> 
            <a href="https://indico.nbi.ku.dk/event/1330/contributions/11115/"><u>Presentation to "Where Earth Meets Sky" workshop</u></a>
            </p>
            </center>

    </article>
    )

}

export default mriContentDetection;