import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function (
  email: string,
  password: string,
  name: string,
  isAgreed: boolean,
  confirmPassword: string,
  setNameValidation: Dispatch<
    SetStateAction<{
      err: boolean;
      msg: string;
    }>
  >,

  setEmailValidation: Dispatch<
    SetStateAction<{
      err: boolean;
      msg: string;
    }>
  >,
  setPasswordValidation: Dispatch<
    SetStateAction<{
      err: boolean;
      msg: string;
    }>
  >,
  setConfirmPasswordValidation: Dispatch<
    SetStateAction<{
      err: boolean;
      msg: string;
    }>
  >
) {
  //validate the signup information
  if (!name) {
    toast.error("Your name can not be empty.");
    setNameValidation({
      err: true,
      msg: "Your name can not be empty.",
    });
    return false;
  }
  const splittedArr = name.split(" ");
  if (!(splittedArr.length > 1)) {
    toast.error("Please provide a full name.");
    setNameValidation({
      err: true,
      msg: "Full name must contain both first and last name.",
    });
    return false;
  }
  if (!email) {
    setEmailValidation({
      err: true,
      msg: "Email address is required.",
    });
    toast.error("Email address is empty,  please enter a email.");
    return false;
  }
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    setEmailValidation({
      err: true,
      msg: "Please provide a valid email address.",
    });
    toast.error("The email is invalid, please provide a valid email.");
    return false;
  }
  if (!password) {
    setPasswordValidation({
      err: true,
      msg: "Please provide a password.",
    });
    toast.error("Password can not be empty.");
    return false;
  }
  if (password.length < 8) {
    setPasswordValidation({
      err: true,
      msg: "Password must be at least 8 characters long.",
    });
    toast.error("Password must be at least 8 characters.");
    return false;
  }
  if (password !== confirmPassword) {
    setConfirmPasswordValidation({
      err: true,
      msg: "Password confirmation do not match.",
    });
    toast.error("Password confirmation do not match.");
    return false;
  }
  if (!isAgreed) {
    toast.error("You must agree to terms and conditions.");
    return false;
  }
  return true;
}
