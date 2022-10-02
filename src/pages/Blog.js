import React from "react";
import Tab from "../components/Tab";
import nycSentinel from "./blogPosts/nycSentinel";
import wasteClassifier from "./blogPosts/wasteClassifier";
import "../styles/Blog.css";

function Blog(){
    const tabContent = [
      {title: "Detecting NYC Land Cover Change using Sentinel 2",
        content: nycSentinel.call()},
        {
          title: "Sorting Waste with a Jetson Nano",
          content: wasteClassifier.call()
        }
    
      ];
      
    return <div ><h1>Blog</h1>

            <br></br>

            <p>Below are some examles of recent works I've done</p>
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