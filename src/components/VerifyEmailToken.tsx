import { useEffect } from "react";
import LoadingDialog from "./LoadingDialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UseBackend from "../hooks/UseBackend";

function VerifyEmailToken() {
  const urlSearch = new URLSearchParams(document.location.search);
  const token = urlSearch.get("token" || "");
  const navigate = useNavigate();
  const { verifyEmailFromToken } = UseBackend();
  const verifyEmail = async () => {
    if (!token) {
      toast.error("Can not verify email, token is missing.");
      return navigate("/auth/login");
    } else {
      await verifyEmailFromToken(token);
      return navigate("/auth/login");
    }
  };
  useEffect(() => {
    verifyEmail();
  });
  return (
    <>
      <LoadingDialog />
    </>
  );
}

export default VerifyEmailToken;
