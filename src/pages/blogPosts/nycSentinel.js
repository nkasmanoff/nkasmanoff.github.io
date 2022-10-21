import React from "react";
import titleImage from '../../images/nycTitleImage.png'
import landCover from '../../images/landCover.png'
import waterLevels from '../../images/waterLevels.gif'
import landCoverTrends from '../../images/landCoverTrends.png'
import humanActivity from '../../images/humanActivity.gif'

function nycSentinel(){

    return (<article className="blogPost" justify="center"> 
        <center>   
            <h1 justify = "center">Detecting Land Cover Change in the NYC Metropolitan Area</h1>
            </center>   

            <img src={titleImage} alt="" className="projectImage" justify="center" width ="750"/>

            <center>   
            <h2 justify = "center">Background</h2>
            </center>
            <p> 

                Recently, I have been drawn to geospatial data. From politics, climate change, financial markets, and more, it's applications
                are wide reaching. It was in this mindset I worked on this pet project, and exploring how easy it is to get started with applying ML to this domain.
                </p>

                <p>To briefly outline this blog post, I will diving into: 
                     <ul>
                        <li>How I Wrangled this Data</li>
                        <li>How I Created a Land Cover Classifier</li>
                        <li>What Insights I Obtained</li>
                        </ul> 
            
            </p>
            <p> 
                The code for this work can be found <a href="https://github.com/nkasmanoff/nyc-sentinel">here</a>
            </p>

            <center>   
            <h2 justify = "center">Getting Started</h2>
            </center>
            <h3> Earth Observation Data</h3>
            <p> While searching for data, the first thing I learned is how varied Earth observation data is.</p> 
             <p> To start, there are two main types of collection instruments.
                One kind is sythetic aperture radar  (<a href="https://www.earthdata.nasa.gov/learn/backgrounders/what-is-sar">SAR</a>) which is created by a device that measures the intensity of the signal
                it bounces off of the Earth's surface. The advantage of this kind of system is that we can tell a lot of things about surface characteristics depending on what the returned signal is. 

                Even more importantly, SAR data is not restricted by sunlight or cloud cover. This means that in the event of cloudy conditions (like during a Hurricane) SAR instruments are able to provide data when it may matter most.
            </p>
            <p> However, as of writing this (Oct 2022) SAR data is not as easily accessible. The signals they produce are not easy to interpret, and at least from what I saw, it is harder for the casual user to find       
                 a steady source of. I don't doubt there are good reasons for this, but nonetheless, SAR data is not something I used in this work.</p>

            <p> Alternatively, optical satellite images are a lot easier to find and work with. While they can lack the level of detail SAR images provide, it is much easier to understand photographs. But as also alluded to, they are restricted by sunlight + cloud cover, meaning they 
                are not always the most reliable tool depending on use case. In this case, their straightforward interpret and ease of access made them the preferred choice.
            </p>
            <h3> Sentinel 2</h3>
                <p>There are a host of optical satellites out there. All of these instruments offer different cadences / resolutions. I wasn't especially picky for this project,
                    and went with what looked like the most accessible for an amateur like me!
                    While happy with what I worked with, it's encouraging to see the flavors of EO data to work with are already quite extensive and <a href="https://phys.org/news/2021-10-planet-fleet-earth-satellites.html">growing</a>.
                </p>
                <p> <a href="https://sentinel.esa.int/web/sentinel/missions/sentinel-2">Sentinel-2</a> already came with an easy to access <a href="https://github.com/sentinelsat/sentinelsat">API</a>, 
                which made it easy to download images. All that I needed to prepare beforehand was an outline of the region I wanted to get imagery for, which I accomplished using <a href="http://geojson.io/#map=12/40.7579/-73.9651">this website</a>.   </p>

                <p><a href="https://github.com/nkasmanoff/nyc-sentinel/blob/main/Sentinel%20Data%20Download%20Script.ipynb">This notebook</a> gives a quick breakdown for how I managed to download the images of interest, and 
                store them for further analysis.</p> With the important data ready, next up I made the tools for the job.

            <h3> EuroSAT Dataset</h3>
            <p> The tool I was after was a machine learning model to accurately tell me what category of land cover a particular image (or portion of an image) is. Parallel to obtaining my Sentinel-2 data, I wanted to create a model to do just that. Fortunately for me,
                the dataset needed to build that kind of model exists! The <a href="https://github.com/phelber/EuroSAT">EuroSAT</a> dataset is a curation of Sentinel-2 images which are categorized into 10 distinct types of land cover, each with approximately 3000 samples each. 
                A example of these can be seen in the picture below.
                </p>

                <img src={landCover} alt="" className="projectImage" justify="center" width ="250"/>

                <p> With this highly detailed dataset, I got to work training models. </p>

        <center>   
            <h2 justify = "center">Model Training</h2>
            </center>
            <p>
                 To make a fast and effective model for this task, I decided to use a convolutional neural network. In particular, the architecture I used was a <a href = "https://pytorch.org/vision/main/models/generated/torchvision.models.resnet18.html">ResNet-18</a>. 
                There were many operational decisions I had to make for this model to perform well, so it was imperative for me to receive quick and structured feedback on how various model configurations 
                performed. For the structured feedback, I utilized <a href="https://wandb.ai/">Weights & Biases</a> to give detailed logs on model performance.
            </p>

            <p> 
                To make this work quick, I transferred my code to my <a href="https://developer.nvidia.com/embedded/jetson-nano-developer-kit">Jetson</a> and used it's CUDA acceleration to rapidly run through the dataset. With this hardware, a training epoch lasted about 5 minutes.

            </p>    

            <p> Though there were many important factors to training, the decision I believe to be the most impactful was my decision on how to pre-process the input images. Typically, inputs to an ML model are standardized, meaning the distribution of values in the inputs
                Should have a mean value of 0, and a standard deviation of 1. For datasets like ImageNet, the mean and standard deviation factors are usually known beforehand. In our case there is a big issue to this approach.
                Though the data all comes from the same source (Sentinel-2) there is no guarantee that the pixel values / distribution from the already .png based EuroSAT dataset will resemble the values from the API downloaded
                counterparts. To ensure that the model trained here would behave well with this inference data, I wanted some sort of common distribution that both sources would work well with.
            </p>

            <p>For this, I chose to standardize all pixels to be between 0 and 1 inclusive. I was initially convinced this idea would significantly impact how well the model performance would look, but after comparing two training runs with 
                a standarzied vs normalized approach, I was satisfied with their similar perofrmance to then train a full model in earnest. All of these training logs can be found on my <a href="https://wandb.ai/noahpunintented/nyc-sentinel-src?workspace=user-noahpunintented">WandB page</a>                
                , and served as the backbone for my analysis to come.</p>

            <center>   
            <h2 justify = "center">Analysis</h2>
            </center>

            <p> The first thing I did was consolidate the classes designated by EuroSAT to something a bit more digestible for this analysis. What made the most sense to me was grouping water and manmade land features together, while renaming the 
                natural landscape features into simpler names to better capture what pheonomena they'd correspond here.  For 21 snapshots of the NYC area taken over the past two years, I split into distinct tiles which the now trained ResNet is able to classify it's land cover. 
                The results of this for 2022 can be seen below:</p>
                <img src={landCoverTrends} alt="" className="projectImage" justify="center" width ="750"/>
            <p>
            <p>The first thing we can take away from this visual should be obvious. The majority of land cover is human activity, such as buildings, roadways, etc. Given that this is a satellite of New York City, this is an intuitive result. </p>
            <p>Building off this visual, the next question I wanted to investigate was what could be driving the change in various land cover types. To start, I wanted to see what might be causing there to be a dip in water from April to August. To do this,
                you can see the GIF below.
            </p>


            <img src={waterLevels} alt="my-gif" justify="center" className="projectImage"  width ="500"/>
            <p>  This is grayscale image of both Sentinel-2 images, each of which overlayed with the ResNet's predictions of water cover in each. As we see here, in August, there is a decent amount of cloud cover on the Hudson River, which impacted 
                the model's ability to properly classify this land type. Instead, it looks like this was predicted to be forest cover.</p>

            </p>

            <p> Next, we can repeat the same process for the lowest and highest detected levels of human activity, in April 2022 and June 2022:</p>

            <img src={humanActivity} alt="my-gif" justify="center" className="projectImage"  width ="500"/>

            <p> In this view, we can see that the model is accurately deticting human activity in both images, but again there is some disparity in the quality of the images.
                
                In particular, what I'm seeing in both the upper right and lower left of these images is that the intensity of the pixels is slightly greater in June, 
                which likely helped the model pick up on those features. However, there are other locations, particularly on the Jersey side of the Hudson river, where it is definitely
                
                not clear that the tile corresponds to human activity in April, but is much more obvious in June. While I'm sure this an entirely new construction project, it is encouraging to see
                that this model is capable of picking up on instances where the details from Sentinel-2 are left out.</p>



            <p>The biggest limitation with this appraoch is it's maximum available granularity. With tiles of 64x64, this is equivalent to 640m x 640m chunks of land, which are likely not as uniform 
                as this approach suggests. In a follow up to this, I'd love to get my hands on a segmentation dataset, and apply this approach in a more detailed way.
            </p>

            <p> Furthermore, as great as Python is for setting up this analysis, it is quite limited in providing imaging tools to do these images justice. With that in mind, I'm hoping to find better tools for visualizing geospatial data as well! </p>

            <p>Thank you for reading, please don't hesitate to reach out if you have questions, comments, or suggestions :-) </p>

             </article>)



}

export default nycSentinel;