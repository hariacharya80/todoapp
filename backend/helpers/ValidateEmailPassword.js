export default function (email, password) {
  //check if email is missing or not.
  if (!email) {
    return {
      err: true,
      msg: "Please provide a email address to login.",
    };
  }

  //check if the email is a valid email address
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      err: true,
      msg: "Please enter a valid email address.",
    };
  }

  //check if the password is missing or not.
  if (!password) {
    return {
      err: true,
      msg: "Password is required.",
    };
  }
  if (password.length < 8) {
    return { err: true, msg: "Password must be at least 8 characters" };
  }
  return { err: false, msg: "" };
}
