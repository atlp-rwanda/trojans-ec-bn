const emailContent = {
  reset(token) {
    return (
      `<p style='font-size:16px;font-weight:600;color:black;'>Click this button to reset your password</p>&nbsp;` +
      `<button style='background-color:#008CCF;width:200px;height:30px;border-radius:3px;border-color:#008CCF;font-size:20px;'><a style='text-decoration:none;color:white;font-weight:bold;' href='${process.env.UI_URL}/users/password-reset/${token}'>RESET PASSWORD</a></button>`
    );
  },
};

export default emailContent;
