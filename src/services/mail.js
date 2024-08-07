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

export const sendNotificationEmail = async (email, vaccineName, endDate) => {
  const mailOptions = {
    from: "sipavadm@gmail.com",
    to: email,
    subject: "Notificação de Expiração de Vacina",
    html: `<p>Olá,</p>
           <p>A vacina <strong>${vaccineName}</strong> está prestes a expirar em <strong>${new Date(endDate).toLocaleDateString()}</strong>.</p>
           <p>Por favor, verifique seu calendário de vacinação.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail de notificação enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail de notificação:", error);
  }
};