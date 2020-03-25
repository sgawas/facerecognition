import React from 'react';
import './faceRecognizer.css';

const FaceRecognizer = ({ imageUrl, box }) => {
    console.log("FaceRecognizer.js=", box);
    console.log("type of box=", typeof box);
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                box.forEach(element => {
                    <div className='bounding-box' 
                    style={{top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol}}>
    
                    </div>
                });
            </div> 
        </div>
    );
}

export default FaceRecognizer;