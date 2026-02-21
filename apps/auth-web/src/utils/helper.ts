export const handleGoogleLoginRedirect = () => {
  const url = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL;
  if (!url) return;
  window.location.href = url;
};