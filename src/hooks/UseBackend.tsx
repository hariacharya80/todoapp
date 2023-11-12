import toast from "react-hot-toast";

function UseBackend() {
  const signup = async (name: string, password: string, email: string) => {
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/auth/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      if (request.status === 200) {
        return {
          err: false,
          msg: "User signed up successfully.",
        };
      } else if (request.status === 401) {
        const data = await request.json();
        return {
          err: true,
          msg: data.msg,
        };
      } else if (request.status === 500) {
        return {
          err: true,
          msg: "An unknown server error occurred, please try again.",
        };
      }
      return {
        err: true,
        msg: "An unknown network error, please try again later.",
      };
    } catch (err) {
      console.log(err);
      return {
        err: true,
        msg: "An unknown network error, please try again later.",
      };
    }
  };
  const sendEmailVerification = async (email: string) => {
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/auth/verify",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      if (request.status === 200) {
        toast.success("Verification email sent successfully.");
        return true;
      } else if (request.status === 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status === 500) {
        toast.error("An unknown server error, please try again later.");
        return false;
      }
      toast.error("An unknown error, please try again later");
      return false;
    } catch (err) {
      toast.error("There was an error sending the verification email.");
      return false;
    }
  };

  const verifyEmailFromToken = async (token: string) => {
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/auth/verify",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      if (request.status == 200) {
        toast.success('Your email is now verified, you can proceed to login.')
        return true;
      } else if (request.status == 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status === 500) {
        toast.error("Unknown server error.");
        return false;
      }
    } catch (e) {
      toast.error("An unknown server error occurred.");
      return false;
    }
    toast.error("An unknown error occurred while verifying email.");
    return false;
  };

  const resetPassword = async (email: string) => {
    if (!email) {
      toast.error("Email address is required to reset password.");
      return false;
    }
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      toast.error("Please provide a valid email address.");
      return false;
    }
    try {
      const request = await fetch(
        import.meta.env.VITE_BACKEND + "/auth/reset",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (request.status == 200) {
        toast.success(
          "Password reset email sent successfully, please check your inbox."
        );
        return true;
      } else if (request.status == 401) {
        const data = await request.json();
        toast.error(data.msg);
        return false;
      } else if (request.status === 500) {
        toast.error("An unknown server error occoured.");
        return false;
      }
      toast.error("An unknown error occoured, please try again later.");
      return false;
    } catch (err) {
      toast.error("An unknown network error occoured.");
      return false;
    }
  };
  return { signup, sendEmailVerification, verifyEmailFromToken, resetPassword };
}

export default UseBackend;
