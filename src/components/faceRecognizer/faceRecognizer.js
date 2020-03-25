import React from 'react';
import './faceRecognizer.css';

const FaceRecognizer = ({ imageUrl, box }) => {
    console.log("FaceRecognizer.js=", box);
    console.log("type of box=", typeof box);
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                {
                    box.map((imageDetail)=> {
                        return (
                            <div className='bounding-box' 
                            style={
                                {
                                    top: imageDetail.topRow, 
                                    right: imageDetail.rightCol, 
                                    bottom: imageDetail.bottomRow, 
                                    left: imageDetail.leftCol
                                }
                            }
                            >
                            </div>
                        )
                    })  
                }
            </div> 
        </div>
    );
}

export default FaceRecognizer;