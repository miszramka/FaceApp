import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagineLinkForm/imageLinkForm";
import Rank from "./components/rank/rank";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import Clarifai from "clarifai";
import Signin from "./components/Signin/signin";
import Signup from "./components/signup/signup";
import "react-toastify/dist/ReactToastify.css";
import Forgot from "./components/forgotPassword/forgot";
import { ToastContainer, toast } from "react-toastify";
import Particle from "./components/particles/particles";

const app = new Clarifai.App({
  apiKey: "f8749b8f9fd64dd8a12d4e34bb2afdf5",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  findFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - faceBox.right_col * width,
      bottomRow: height - faceBox.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onSubmit = () => {
    if (this.state.input === "") {
      toast.error("First, upload the image", {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: "image",
      });
    } else {
      this.setState({ imageUrl: this.state.input });
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then((response) => {
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              });
          }
          this.displayFaceBox(this.findFaceLocation(response));
        })
        .catch((err) => console.log(err));
    }
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <Logo />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <ToastContainer autoClose={1500} />
        <Particle />
        {this.state.route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <div>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : this.state.route === "forgot" ? (
          <div>
            <Forgot onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <Signup
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
