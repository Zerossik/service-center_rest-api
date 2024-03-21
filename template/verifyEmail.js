const verifyEmail = verifyToken => {
  const { FRONTEND_URL } = process.env;
  return `<p>
  Вітаю! Ви зареєструвалися в додатку TService.
  Щоб продовжити використання, вам необхідно підтвердити ваш email, для цього перейдіть за посиланням 
  <a href="${FRONTEND_URL}/verified/${verifyToken}" target="_blank" style="text-decoration: none;">Підтвердити email</a>
</p>
`;
};

module.exports = verifyEmail;
