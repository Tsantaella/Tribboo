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
                <img 
                    src={this.props.data.album.images[0].url}
                    width="250"
                    height="250">
                </img>
                <h2> {this.props.data.name} </h2>  
                {
                    this.props.data.artists.map((artist) => (
                        <p key={artist.id}>
                            {artist.name}
                        </p>
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

        console.log(Object.keys(songs.items[0].album));
        var x = 1;
        return (
            <div className="App">  
                <h1 className="songMsg"> {songs.message} </h1> 
                {
                    songs.items.map((song) => (
                        <Song className="song" key={song.id} data={song}/>
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
