export default function validateSignupDetails(email, password, name) {
  //validate email
  if (!email) {
    return { err: true, msg: "Please enter your email address." };
  }
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

  //validate password
  if (!password) {
    return { err: true, msg: "Please enter a valid password." };
  }

  if (password.length < 8) {
    return { err: true, msg: "Password must be atlest 8 chars long." };
  }

  return { err: false, msg: "" };
}
