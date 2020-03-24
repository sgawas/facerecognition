import React from 'react';
import Particles  from 'react-particles-js'

import './App.css';

import Navigation from './components/navigation/navigation';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import FaceRecognizer from './components/faceRecognizer/faceRecognizer';


const particleOptions={
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState ={
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol:  clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }
  disableBoxDisplay = () => {
    this.setState({box: {}});
    this.setState({imageUrl: ''});
  }
  
  displayFaceBox = (box)=> {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({ input : event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl : this.state.input });
    fetch('https://agile-inlet-40810.herokuapp.com/imageurl',
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
    })
    .then(response => response.json())
    .then(
    response=>{
      if(response){
        fetch('https://agile-inlet-40810.herokuapp.com/image',
        {
            method: 'put',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=> console.log(err))
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      email: data.email,
      password: data.password,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if( route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route});
  }

  render(){
    const {route, isSignedIn, box, imageUrl} = this.state;
    
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo/>
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onPictureSubmit={this.onPictureSubmit} onInputChange={this.onInputChange}/>
              <FaceRecognizer box={box} imageUrl={imageUrl}/>
            </div>
          : ( route === 'register'
              ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
              : <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            )   
        } 
      </div>
    );
  }
}

export default App;
