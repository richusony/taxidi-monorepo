export const handleGoogleLoginRedirect = () => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL) return;

  const url = `${process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL}?state=taxidi-web`;
  window.location.href = url;
};
