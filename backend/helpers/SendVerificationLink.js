export default async function sendVerificationLink(email, token, type) {
  if ((type = "password")) {
    const isSent = await passwordResetEmail();
    return isSent;
  } else if ((type = "email")) {
    const isSent = await verifyEmail();
    return isSent;
  }
  return false;
}

async function passwordResetEmail() {}

async function verifyEmail() {}
