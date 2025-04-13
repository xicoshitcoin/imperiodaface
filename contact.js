const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuração do transporter do nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com', // Substitua pelo seu email
        pass: 'sua-senha' // Substitua pela sua senha
    }
});

// Rota para processar o formulário
router.post('/enviar', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: 'seu-email@gmail.com', // Email para onde as mensagens serão enviadas
        subject: 'Nova mensagem do site Império da Face',
        text: `
            Nome: ${nome}
            Email: ${email}
            Telefone: ${telefone}
            Mensagem: ${mensagem}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Erro ao enviar mensagem' });
        } else {
            console.log('Email enviado: ' + info.response);
            res.json({ success: true, message: 'Mensagem enviada com sucesso' });
        }
    });
});

module.exports = router; 