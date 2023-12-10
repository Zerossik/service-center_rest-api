const resetPassEmail = (token = '') => {
  const { BASE_URL } = process.env;
  console.log(token);
  return `<p class="reset_password">
  Вітаю! З вашої email адреси надійшов запит на зміну паролю в додатку TService,
  якщо це були не ви, то будь ласка проігноруйте даний лист. <br /> Якщо ви дійсно
  забуль пароль, то перейдіть за посиланням
  <a href="${BASE_URL}/api/auth/resetPassword/${token}" target="_blank" style="text-decoration: none;">Змінити пароль</a>
</p>
`;
};

module.exports = resetPassEmail;
