import transporter from "../transporter.js";

export const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: "sipavadm@gmail.com",
    to: email,
    subject: "Confirmação de Cadastro",
    html:
      '<p>Seu cadastro no SIPAV foi realizado com sucesso!</p>'
      // '<a href="http://localhost:3000/verify/' +
      // token +
      // '">http://localhost:3000/verify/' +
      // token +
      // '</a>',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de confirmação enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail de confirmação:", error);
  }
};