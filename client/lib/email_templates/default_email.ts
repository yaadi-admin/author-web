export const defaultEmail = (name: string, email: string, message: string, title: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
  <style>
    body {
      background-color: #FFE4EE;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 50px auto;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo img {
      height: 100px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #FFE4EE;
    }
    .header h1 {
      color: #F84988;
      margin: 0;
      font-size: 24px;
    }
    .contact-info {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #FFAC24;
    }
    .contact-info h3 {
      color: #FFAC24;
      margin-top: 0;
      margin-bottom: 15px;
    }
    .contact-detail {
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .contact-detail:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #495057;
      display: inline-block;
      width: 80px;
    }
    .message-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
      margin: 20px 0;
    }
    .message-content h3 {
      color: #F84988;
      margin-top: 0;
    }
    p {
      line-height: 1.6;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      color: #6c757d;
      font-size: 12px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }
    .footer a {
      color: #F84988;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="https://firebasestorage.googleapis.com/v0/b/suelyn-e82e4.firebasestorage.app/o/c1c37cae-76b6-4394-b816-154828b2ca30_removalai_preview.png.png?alt=media&token=8ebd32b5-b1fe-4365-b66f-71e482abfbb0" alt="SueLyn Empowered Living Logo" />
    </div>
    
    <div class="header">
      <h1>${title}</h1>
    </div>

    <div class="contact-info">
      <h3>Contact Information</h3>
      <div class="contact-detail">
        <span class="label">Name:</span>
        <span>${name}</span>
      </div>
      <div class="contact-detail">
        <span class="label">Email:</span>
        <span>${email}</span>
      </div>
    </div>

    <div class="message-content">
      <h3>Message</h3>
      <p>${message}</p>
    </div>

    <p>This message was sent from the SueLyn Empowered Living Foundation contact form.</p>
    
    <div class="footer">
      <p>Visit our website: <a href="https://suelynempoweredliving.com">suelynempoweredliving.com</a></p>
      <p>&copy; 2024 SueLyn Empowered Living Foundation. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};