import React , { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {
    constructor() {
        super()
        this.state = { // תיאור של מה שבונים
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users') // פונקציה לבקש בקשה מהשרת
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value }) // לקחת את הערך שנכתב בחיפוש
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) // לסנן כל ערך שמכיל את מה שנכתב בתיבת חיפוש
        })
        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        } else {
            return ( 
                <div className='tc'> 
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} /> 
                    <Scroll>
                    <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                    </Scroll>
                </div>  // לוקחים את הרכיבים של תיבת חיפוש והכרטיסיות ומחזירים את הערך שהתבצע עליו חיפוש
            );
        }
    }
}


export default App;