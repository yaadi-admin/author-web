import { Request, Response } from 'express';
import { Resend } from 'resend';

const resend = new Resend("re_7KTHYCft_5yWqpQjkXkkpEfe3FZQFkzMu");

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function handleContactForm(request: Request, response: Response) {
  try {
    const { name, email, message } = request.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !message) {
      return response.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Create transporter
    const transporter = resend.emails;

    // Email content for the business
    const businessEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F84988;">New Contact Message - SueLyn Foundation</h2>
        
        <h3 style="color: #FFAC24;">Contact Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>

        <h3 style="color: #FFAC24;">Message:</h3>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FFAC24;">
          <p style="margin: 0; line-height: 1.6;">${message}</p>
        </div>

        <p style="margin-top: 20px; color: #6c757d; font-size: 14px;">
          This message was sent from the SueLyn Empowered Living Foundation contact form.
        </p>
      </div>
    `;

    // Send email to business
    await transporter.send({
      from: 'SueLyn Foundation <info@suelynempoweredliving.com>',
      to: ['info@suelynempoweredliving.com'],
      subject: 'New Contact Message from Foundation',
      html: businessEmailContent,
    });

    // Send confirmation email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #F84988;">Thank You for Contacting Us</h2>
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to the SueLyn Empowered Living Foundation. We have received your message and will get back to you within 24-48 hours.</p>
        
        <h3 style="color: #FFAC24;">Your Message:</h3>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FFAC24;">
          <p style="margin: 0; line-height: 1.6;">${message}</p>
        </div>

        <p>If you have any urgent inquiries, please don't hesitate to contact us directly.</p>
        
        <p>Best regards,<br>The SueLyn Foundation Team</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 12px;">
            Visit our website: <a href="https://suelynempoweredliving.com" style="color: #F84988;">suelynempoweredliving.com</a>
          </p>
        </div>
      </div>
    `;

    await transporter.send({
      from: 'SueLyn Foundation <info@mysterymobdetailing.com>',
      to: [email],
      subject: 'Thank You for Contacting SueLyn Foundation',
      html: customerEmailContent,
    });

    response.json({ 
      success: true, 
      message: 'Contact form submitted successfully. We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    response.status(500).json({ 
      error: 'Failed to submit contact form. Please try again later.' 
    });
  }
}
