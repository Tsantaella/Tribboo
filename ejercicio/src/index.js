import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Song extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            data: props
        }
    }

    render() {

        return (
            <div className = "song">
                <p> {this.state.data.name} </p> 
                {
                    this.state.data.artists.map((artist) => (
                        <ul key={artist.id}>
                            {artist.name}
                        </ul>
                    ))
                }
            </div>
        );
    }

   
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            songs: [],
            Correct: false
        };
    }

    componentDidMount() {
        fetch("https://gj05ju1755.execute-api.eu-west-1.amazonaws.com/dev/codechallenge/music/random")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    songs: json,
                    Correct: true
                });
            })
    }

    render() {
        const {Correct, songs} = this.state;

        if (!Correct) return React.createElement('div', {className: "wait"}, 
            React.createElement('h1', {}, 'Wait a minute...')
        );

        console.log(Object.keys(songs.items[0])); 
        console.log(Object.keys(songs.items[0].artists));
        console.log(Object.keys(songs.items[0].external_urls));
        var x = 1;
        return (
            <div className="App">  
                <h1> {songs.message} </h1> 
                <h2> Songs: </h2>
                {
                    songs.items.map((song) => (
                        <Song key={song.id} name={song.name} artists={song.artists}/>
                    ))
                }
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
