
import React from "react";
import burstcubeLocalization from '../../images/burstcubeLocalization.png'
function burstCube(){

    return  (   <article>
        <center>
            <h1>BurstCube</h1>
        </center>
        <img src={burstcubeLocalization} alt="" className="projectImage" justify="center"/>
        <p>The discovery of gravitational waves has ushered in a new era of astronomy. Tied to this discovery is the potential for multi-messenger astronomy, or the observation of this phenomena in the form of graviational waves, and in the form of electromagnetic radiation. This is just one part of the science mission of BurstCube, a cubesat for gamma-ray bursts. In my time working on BurstCube, I created a simulation from scratch to assess different detector orientations, and determine what setting is most suitable for BurstCube's science.
        </p>
        <center>
        <h2>Presentations</h2>
        <p> 
        <a href="https://docs.google.com/presentation/d/1wWBKCfqLemWaP4QFgzZLVOvvZw3r75pKiEIQj8QKIhY/edit?usp=sharing"><u>Fermi Symposium (poster)</u></a>
        </p>
        </center>
    </article>
    )

}

export default burstCube;