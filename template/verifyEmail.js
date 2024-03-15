const verifyEmail = verifyToken => {
  const { BASE_URL } = process.env;
  return `<p>
  Вітаю! Ви зареєструвалися в додатку TService.
  Щоб продовжити використання, вам необхідно підтвердити ваш email, для цього перейдіть за посиланням 
  <a href="${BASE_URL}/api/auth/verify/${verifyToken}" target="_blank" style="text-decoration: none;">Підтвердити email</a>
</p>
`;
};

module.exports = verifyEmail;
