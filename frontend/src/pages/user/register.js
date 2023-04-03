import React from "react";

export default function RegisterAccount() {
  return (
    <>
      <header class="articleHeader" id="p1">
        Register New Account
      </header>
      <p>
        <div class="content">
          <div class="loginError"></div>
          <form>
            <label>
              First Name: <input type="text" name="firstname" />
            </label>

            <label>
              Last Name: <input type="text" name="lastname" />
            </label>
            <br />
            <label>
              Email: <input type="email" name="email" />
            </label>

            <label>
              Confirm Email: <input type="email" name="email" />
            </label>
            <br />
            <label>
              Password: <input type="password" name="password" />
            </label>

            <label>
              Confirm Password:{" "}
              <input type="password" name="confirm_password" />
            </label>
            <input value="Login" type="submit" />
          </form>
        </div>
      </p>
    </>
  );
}
