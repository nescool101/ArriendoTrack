const nodemailer = require('nodemailer');

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name = '', email = '', message = '', website = '' } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot
  if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || message.trim().length < 5 || message.length > 2000 || name.length > 100) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER_NESCAO, pass: process.env.GMAIL_APP_PASSWORD_NESCAO },
  });
  try {
    await transporter.sendMail({
      from: `ArriendoTrack <${process.env.GMAIL_USER_NESCAO}>`,
      to: process.env.GMAIL_USER_NESCAO,
      replyTo: email,
      subject: `ArriendoTrack: mensaje de ${name.slice(0, 60)}`,
      html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Send failed' });
  }
};
