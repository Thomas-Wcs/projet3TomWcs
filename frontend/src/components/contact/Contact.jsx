// import React, { useState } from "react";
// import nodemailer from "nodemailer";

// function Contact() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "testwcs004@gmail.com",
//       pass: "test004wcs",
//     },
//   });

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       name,
//       email,
//       message,
//     };

//     try {
//       await transporter.sendMail({
//         from: "your-email@gmail.com",
//         to: "testwcs004@gmail.com",
//         subject: "Nouveau message de contact",
//         text: `Nom: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
//       });

//       setName("");
//       setEmail("");
//       setMessage("");
//     } catch (error) {
//       console.error("Erreur lors de l'envoi de l'e-mail:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Nom:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={handleNameChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={handleEmailChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="message">Contenu du message:</label>
//         <textarea
//           id="message"
//           value={message}
//           onChange={handleMessageChange}
//           required
//         />
//       </div>
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// }

// export default Contact;
