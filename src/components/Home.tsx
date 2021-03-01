import React from 'react';
import StepsCarousel from './StepsCarousel';
import Container from 'react-bootstrap/Container';
import PiCameraButtons from './VideoCapture';

const Home:React.FC = () => {
    return(
        <Container>
            <StepsCarousel/>
            <div className="row">
                <div className="col-12">
                    <span style={{fontWeight:"bold"}}>
                        Please wait after washing hands to receive feedback.
                    </span>
                    <PiCameraButtons />
                </div>
            </div>
        </Container>
    )
}

export default Home;