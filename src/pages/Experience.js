
import React, { useState } from 'react';
import resume from '../images/Noah_Kasmanoff_Resume.pdf'


function Experience(){
    return (
    <div>
      <object data={resume} className="resume" width="1500" height="3000"></object>      
    </div>);
}

export default Experience;