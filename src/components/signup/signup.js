import React from "react";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ signUpName: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ signUpEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signUpPassword: event.target.value });
  };

  onSignUp = () => {
    const { signUpEmail, signUpName, signUpPassword } = this.state;
    fetch("http://localhost:3000/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          const { loadUser, onRouteChange } = this.props;
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80 center">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0" />
            <legend className="f4 fw6 ph0 mh0 center">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                onChange={this.onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                id="email-address"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
            <div className="lh-copy mt3">
              <a
                onClick={this.onSignUp}
                href="#0"
                className="f6 link dim black db"
              >
                Sign up
              </a>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signup;
