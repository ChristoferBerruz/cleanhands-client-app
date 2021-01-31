import React, {useState, useLayoutEffect} from 'react';
import steps from '../assets/data/steps';
import './StepsCarousel.css';

interface IStep{
    stepName:string,
    picture:string,
    description:string
}

const StepCard: React.FC<{step:IStep}> = ({step}) => {

    return(
        <div className="row d-flex align-items-center">
            <div className="col-7 img-slide">
                <img src={step.picture} className="img-fluid"/>
            </div>
            <div className="col-5">
                <h3>{step.stepName}</h3>
                <p>{step.description}</p>
            </div>
        </div>
    )
}



const StepsCarousel: React.FC = () => {

    const [index, setIndex] = useState(0);

    useLayoutEffect(()=>{
        const timer = setTimeout(() => setIndex((index+1)%steps.length), 5000)

        return () => clearTimeout(timer);
    }, [index]);

    return(
         <StepCard step={steps[index]} />
    )
}
export default StepsCarousel;