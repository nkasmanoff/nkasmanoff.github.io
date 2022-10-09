import React from "react";
import Tab from "../components/Tab";
import nycSentinel from "./blogPosts/nycSentinel";
import wasteClassifier from "./blogPosts/wasteClassifier";
import "../styles/Blog.css";

function Blog(){
    const tabContent = [
      {title: "Detecting NYC Land Cover Change using Sentinel-2",
        content: nycSentinel.call()},
        {
          title: "Sorting Waste with a Jetson Nano",
          content: wasteClassifier.call()
        }
    
      ];
      
    return <div >

            <br></br>

            <p>Some thoughts / projects that don't fit in any other section of this site.</p>
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

export default Blog;