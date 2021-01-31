import React from 'react';
import ReactDOM from 'react-dom';
import './custom.css';
import Header from './components/Header';
import Home from './components/Home';

const App:React.FC = () => {
    return(
        <div>
            <Header/>
            <Home />
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"));