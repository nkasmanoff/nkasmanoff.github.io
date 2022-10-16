import React from "react";
import titleImage from '../../images/nycTitleImage.png'
import landCover from '../../images/landCover.png'
import waterLevels from '../../images/waterLevels.gif'
import landCoverTrends from '../../images/landCoverTrends.png'
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

                Recently, I have become fascinated by geospatial data, and how it's applications are so wide-reaching.
                Politics, climate change, financial markets, and more. All of these studies can be improved and complemented when there is an 
                eye in the sky, giving insights otherwise unknown. It was in this mindset did I decide to attempt a pet project with this kind of data.
                It first started with me wanting to see how easy it is to access satellite imagery, and ended with me learning something new about New Jersey!

                </p>

                <p>To briefly outline this blog post, I will explaining: 
                     <ul>
                        <li>How I Accessed this Data</li>
                        <li>How I Created a Land Cover Classifier</li>
                        <li>What Insights I Obtained</li>
                        </ul> 
            
            </p>
            <p> 
                The code for this work can be found at <a href="https://github.com/nkasmanoff/nyc-sentinel">https://github.com/nkasmanoff/nyc-sentinel</a>
            </p>

            <center>   
            <h2 justify = "center">Getting Data</h2>
            </center>
            <h3> Earth Observation Data</h3>
            <p> While searching for data, the first thing I learned is how varied Earth observation data is. To start, there are two main types of collection instruments.
                One kind is sythetic aperture radar  (<a href="https://www.earthdata.nasa.gov/learn/backgrounders/what-is-sar">SAR</a>) which is created by a device which measures the intensity of the signal
                it bounces off of the Earth's surface. The advantage of this kind of system is that we can tell a lot of things about surface characteristics depending on what the returned signal is. 

                Even more importantly, SAR data is not restricted by sunlight or cloud cover. This means that in the event of cloudy conditions (like during a Hurricane) SAR instruments are able to provide data when it may matter most.
            </p>
            <p> However, as of writing this (2022) SAR data is not so easily accessible. The signals they produce are not easy to interpret, and at least from what I saw, it is less straightforward for the typical user to find 
                a steady source of. I don't doubt there are good reasons for this, but nonetheless, SAR is not something I used for this work.</p>

            <p> Alternatively, optical satellite images are a lot easier to work with. While they can lack the level of detail SAR images provide, it is a lot easier to understand photographs. As also alluded to, they are restricted by sunlight + cloud cover, meaning they 
                are not always the most reliable tool depending on use case. For the purposes of this work, they get the job done.
            </p>
            <h3> Sentinel 2</h3>
                <p>As alluded to above, there is a variety of optical satellite image data out there. All of these resources offer a variety of cadences / resolutions. I wasn't especially picky for this project,
                    and went with what looked like the most accessible for a starter like me. 
                    While happy with what I worked with, it's encouraging to see the flavors of EO data to work with are already quite extensive, and growing!                
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

                <p> With this highly detailed dataset, I got to work training models for the job. </p>

        <center>   
            <h2 justify = "center">Model Training</h2>
            </center>
            <p>
                 To make a fast and effective model for this task, I decided to use a convolutional neural network. In particular, the architecture I used was a <a href = "https://pytorch.org/vision/main/models/generated/torchvision.models.resnet18.html">ResNet-18</a>. 
                There were many operational decisions I had to make for this model to perform well, so it was imperative for me to receive quick and structured feedback on how various model configurations 
                performed. For the structured feedback, I utilized <a href="https://wandb.ai/">Weights & Biases</a> to give detailed logs on model performance.
            </p>

            <p> 
                To make this work quick, I transferred my code to my Jetson and used it's CUDA acceleration to rapidly run through the dataset. With this hardware, a training epoch lasted about 5 minutes.

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


            <img src={waterLevels} alt="my-gif" justify="center" className="projectImage"  width ="750"/>
            <p>  This is grayscale image of both Sentinel-2 images, each of which overlayed with the ResNet's predictions of water cover in each. As we see here, in August, there is a decent amount of cloud cover on the Hudson River, which impacted 
                the model's ability to properly classify this land type. Instead, it looks like this was predicted to be forest cover.</p>

            </p>

            <p>After that, the last quick takeaway from this is that we are seeing consistency in the results. Sentinel-2 is able to re-image the same location approximately once every 5 days, meaning that assuming both of those instances
                had a cloud cover under 10%, they would show up in this analysis. We see that in this trend graph, there are 2 instances where the interval between images is 5 days, and both exhibit very similar distributions
                of predicted land type. On it's own this is not an especially insightful result, but does give us a bit of confidence in both the instrument and machine learning model to be consistent when realistically not much would change over a couple of days.  
            </p>

            <p>With that I'll end this blog post, but am definitely excited by what else can be accomplished using AI and geospatial data!</p>

             </article>)



}

export default nycSentinel;