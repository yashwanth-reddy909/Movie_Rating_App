import React, { useEffect, useState } from 'react';
import {FaStar} from 'react-icons/fa';

function CommentComp(props) {
    const [rate,setRate]=useState(null);
    const [hover,setHover]=useState(null);
    useEffect(()=>{
        if(props.lastrated){
            setRate(props.lastrated);
        }
    },[props.lastrated]);
    return (
        <div className='stars'>
        <div>
        {[...Array(5)].map((star,i)=>{
                    const ratingValue=i+1;
                    return(
                        <label key={`CommentComp${props.MovieID}${ratingValue}`}>
                            <input type='radio' name='rating' value={ratingValue} 
                            onClick={e=>{
                                props.ratingCheck(e.target.value,props.MovieID);
                                setRate(ratingValue);
                            }}
                            />
                            <FaStar className='star' size={window.innerWidth>900 ? 50 : 25} 
                                color={ratingValue <= (hover || rate ) ? '#ffc107' : '#e4e5e9'}
                                onMouseEnter={()=>setHover(ratingValue)}
                                onMouseLeave={()=>setHover(null)}     
                            />
                        </label>
                    )
        })}
        </div>

        <div onClick={()=>props.postRating(props.MovieID)} className='ratebutton'>Rate{props.lastrated ? <i class="bi bi-check2-circle tick"></i> : ' '}</div>
        </div>
    )
}

export default CommentComp
