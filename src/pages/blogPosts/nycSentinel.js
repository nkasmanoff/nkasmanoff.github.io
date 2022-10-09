import React from "react";


function nycSentinel(){

    return (<article className="blogPost" justify="center"> 
        <center>   
            <h1 justify = "center">Detecting Land Cover Change in the NYC Metropolitan Area</h1>
            </center>   

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
                With this level of detail, I got to work training models for the job. 
                </p>
                


        <center>   
            <h2 justify = "center">Model Results and Lessons</h2>
            </center>
            <p> Training a classiifier, things I was concerned on, and eventual results (WandB)</p>

            <center>   
            <h2 justify = "center">Analysis</h2>
            </center>

            <p>
                Sliding window idea, consolidation of classes

                Result for trend over times, then GIF showing difference between most and least, and how 

            </p>
             </article>)



}

export default nycSentinel;