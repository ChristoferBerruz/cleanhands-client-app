import React from 'react';
import StepsCarousel from './StepsCarousel';
import Container from 'react-bootstrap/Container';
const Home:React.FC = () => {
    return(
        <Container>
            <StepsCarousel/>
            <div className="row">
                <div className="col-12">
                    <span style={{fontWeight:"bold"}}>
                        Please wait after washing hands to receive feedback.
                        <span style={{color:'red'}} id="handwashingTimeReport"></span>
                    </span><br/>
                </div>
            </div>
        </Container>
    )
}

export default Home;