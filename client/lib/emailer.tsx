import { Resend } from 'resend';
import { defaultEmail } from './email_templates/default_email';

const resend = new Resend('re_dQxvfbJu_EFjpfkRB6v4JvBSRw75ehRbL');

export const sendEmail = async (to: string, subject: string, name: string, email: string, message: string) => {
  try {
    const html = defaultEmail(name, email, message, subject);
    const { data, error } = await resend.emails.send({
      from: 'SueLyn Foundation <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};