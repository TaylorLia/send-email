import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          subject: subject, 
          message: message,
        }),
      });

      if (response.ok) {
        console.log('Email enviado com sucesso!');
      } else {
        console.error('Falha ao enviar o email.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div className="center-container">
      <form onSubmit={handleSubmit} className="center-form">
        <div className="form-group">
          <label htmlFor="react">React + Node</label>
        </div>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            className="input-text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength="2"
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="input-text"
            name="mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength="7"
            maxLength="80"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            className="input-text"
            name="phone"
            pattern="[0-9]*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            minLength="8"
            maxLength="15"
          />
        </div>

        <div className="form-group">
          <label htmlFor="assunto">Assunto</label>
          <select
            className="input-text"
            placeholder="Selecione o assunto"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="" disabled selected>
              Selecione o assunto
            </option>
            <option value="duvidas">Dúvidas sobre Serviços</option>
            <option value="elogios">Elogios</option>
            <option value="reclamacoes">Reclamações</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            className="input-text text-description"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength="5"
            maxLength="3000"
          />
        </div>

        <input type="submit" value="Enviar" className="button" />
        {emailSent && <p className="success-message">Seu email foi enviado com sucesso!</p>}
        {emailError && (
          <p className="error-message">Ocorreu um erro ao enviar seu email. Tente novamente mais tarde.</p>
        )}
      </form>
    </div>
  );
};

export default App;
