import React from "react";
import Tab from "../components/Tab";
import burstCube from "./projectArticles/burstCube";
import fdl from "./projectArticles/fdl";
import dmtogal from "./projectArticles/dmtogal";
import mriContentDetection from "./projectArticles/mriContentDetection";
import oaiSsl from "./projectArticles/oaiSsl";

function Experience(){
    const tabContent = [
      {title: "Automated Reporting of Natural Events using Satellite Imagery and Metadata",
        content: fdl.call()},
        {
          title: "OA Progression Prediction using Self-Supervised Representation Learning",
          content:oaiSsl.call()
        },
        {
            title: "A Practical DL-based Tool for Medical Image Specifications",
            content:mriContentDetection.call()
          },
          {
            title: "dm2gal",
            content:dmtogal.call()
          }            , 
          {
            title: "BurstCube",
            content:burstCube.call()
          }                        
    
      ];
      
    return <div >

            <br></br>

            <p>Here's a sample of the work I've done, along with related results + presentations.</p>
            <div className = "article">
            <Tab>
              {tabContent.map((tab, idx) => (
                <Tab.TabPane key={`Tab-${idx}`} tab={tab.title}>
                  {tab.content}
                </Tab.TabPane>
              ))}
            </Tab>
            </div>

    </div>

}



export default Experience;