import React from "react";
import { toast } from "react-toastify";

const Forgot = ({ onRouteChange }) => {
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">
              Did you forget your password?
            </legend>
            <div className="mt3">
              <p>
                Don't worry! Just tell us which email address you are using to
                log in and we will send your password.
              </p>
              <p></p>
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
          </fieldset>
          <div>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Send email"
                onClick={() => {
                  onRouteChange("signin");
                  toast.info("Email sent. Check your inbox.", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    toastId: "email sent",
                  });
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Forgot;
