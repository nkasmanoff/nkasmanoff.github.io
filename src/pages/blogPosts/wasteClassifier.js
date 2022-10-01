import React from "react";


function wasteClassifier(){

    return  (<article>
        <center>   
            <h1 justify = "center">Sorting Waste with Jetson Nano</h1>
            </center>

            <center>   
            <h2 justify = "center">Background</h2>
            </center>
        <p>

            While there are so many great ways to apply machine learning with an NVIDIA Jetson,
            I knew I wanted to do something which could make a positive impact. While looking for inspiration, I found this <a href="https://www.youtube.com/watch?v=yiw6_JakZFc">video</a>, 
            and learned the astonishing fact that greenhouse gas emissions leaking out of landfills produce 
         approximately as much emission as all the jets in the air!
        I reasoned that some of the waste in landfills are put there incorrectly (when instead it could be recycled or composted) and figured one way to make these kinds of mistakes less frequent would be 
        to automatically classify what kind of waste an object being thrown out is.   
        </p>  
            <p> 


            I wanted to see if my Jetson Nano could play a small part in making this easier.
        
            As this blog will show, with only a little deviation from the <a href="https://github.com/dusty-nv/jetson-inference">Jetson Inference library</a>,
            this is possible.

            </p>  
            <p> 

                Below is a brief overview of the steps taken to achive this, but you can find all my code <a href="https://github.com/nkasmanoff/waste-classification">here</a>.

        </p>

            <center>
            <h2>Methods + Results</h2>
            </center>
            <p>

            This work is based on fine-tuning a ImageNet pre-trained resnet18 architecture on a smaller dataset,
             one found <a href="https://github.com/nkasmanoff/waste-classification/tree/main/data/waste-classification">here</a>,
            that contains 7 unique kinds of waste.

            This data was collected from <a href="https://www.kaggle.com/techsash/waste-classification-data">Kaggle</a>.
            </p>
            <p>
            Using Weights and Biases, I was able to easily track and understand how the model's I trained for this task developed over time. 
             A snapshot of this effort is linked  <a href="https://wandb.ai/noahpunintented/waste-classification?workspace=user-noahpunintented">here</a>.
             From this glimpse, something glaring is how the progress of performance (particularly top 1 validation accuracy) seems to taper, then jump. After digging a little more into
                training loop I found that the default learning rate is gradually decayed, and while this does allow for the model to eventually improve, it also shows that things might be better if we start off with a better one.

            This is exactly what the next trials attempted, where I used a new optimizer, as well as a slightly lower learning rate, and the results got even worse. While I keep experimenting, there are still some encouraging results
            and contributions I have made, highlighted briefly below.
            </p>
            <p> 

            Some of the major changes changes I made to this code to make it easier to use for experiments such as this is to include new data augmentations,
             optionally use the ADAM optimizer, and the addition of a test loop at the end to provide a closer look at how the model performs in a held out dataset.

             At this test juncture, a final test set top-1 accuracy of 63.03% was achieved, and a top-5 accuracy of 98.72%.
            
            From these outcomes, two important notes. Obviously top-1 accuracy is the more important metric, and this achieved value is simply not as high as one might want it to be.

            However, two factors to weight in consideration with this performance is that on ImageNet this ResNet18 architecture achieved a top-1 and top-5 accuracy of 69.76% 89.08% respectively.
            From this perspective, things are not as drastically worse as they might appear. Another reason why this performance may be satisfactory is the inherent distribution shift we will encounter
            once moving to real time detection. This is a problem I am still not entirely sure how to resolve without going to a landfill, but the fact that I will be using a different background and
            slightly different kinds of waste compared to the small training set at our disposal does mean that whatever performance obtained here is not the true indicator of how good things are going to be in the wild.


            And lastly, I do feel a bit encouraged by the model's top-5 accuracy. Although the fact that there are only 7 classes, the top-5 accuracy does point to the
            potential to use this model to point out cases when a piece of waste is *not* a certain class, and that can still be helpful in certain situations.
            </p>
            <p> 
            With all these caveats in mind, let's take a look at a real-time demo!
            </p>
            <center>
            <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/NU2_WO3h_yk" title="Jetson Waste Classifier Demo 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
             </div>
             </center>             


        

            <p>
            As this demo shows, the model works well in real-time for classes like paper, plastic, and cardboard, but struggled when dealing with glass, aluminumn, and food waste. From this result alone we can already get some help 
            at the trash bin, and simultaneously learn more about the shortcomings of this approach, to improve in future work.            
            </p>
            <p> 
                To start, let's audit why this model succeeded where it did: For the most part, paper, plastic,
                 and cardboard all have relatively uniform design, either in that paper is going to be white, plastic is in the shape of a bottle, or cardboard is both brown and box shaped. This means that despite
                 the training set used, despite being created with a different camera and different background than what ocurred at inference time, was not too different from what I showed
                 the model so that it worked.
        </p>
            <p> 
                For the classes which did achieve great results,this can also be attributed to the change in distribution. Food waste can come in many varieties, and a single intact banana 
                clearly was well represented in the dataset. After all, who is throwing away an entire banana! Based on the successes and failures of this demo, I began to think of new ways to improve this work.
            </p>

            <center>
            <h2>Future Work</h2>
            </center>
            <p>
            There are many feasible ways to extend/improve this project. The most obvious example would be to collect more data, using something more similar to the waste I'd expect to enncounter, and 
            in a background / camera quality more similar to what I had available to me. Bridging this gap between training and inference data is a fundamental problem of deploying ML.        
        </p>

        <p> 
            Thank you for reading, looking forward to updating this project and others as I get more time on my hands.
    
        </p>
    </article>)

}

export default wasteClassifier;