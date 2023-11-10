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
  return { signup };
}

export default UseBackend;
