import { Resend } from 'resend';
import { Request, Response } from 'express';

const resend = new Resend("re_7KTHYCft_5yWqpQjkXkkpEfe3FZQFkzMu");

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  duration: string;
  address: string;
  eventType: string;
  numberOfChildren: string;
  ageRange: string;
  additionalServices: {
    deliverySetup: boolean;
    supervision: boolean;
    insurance: boolean;
    cleaning: boolean;
  };
  specialInstructions: string;
  cateringOptions: {
    jerkChicken: boolean;
    stewChicken: boolean;
    curryChicken: boolean;
    escovitchFish: boolean;
    foodDecoration: boolean;
  };
}

interface EmailRequest {
  formData: BookingFormData;
  selectedProduct: {
    name: string;
    priceDisplay: string;
    description: string;
  };
  totalPrice: number;
}

export async function POST(request: Request, response: Response) {
  try {
    const { formData, selectedProduct, totalPrice } = request.body as EmailRequest;

    // Create transporter
    const transporter = resend.emails;

    // Email to customer
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff4f01;">Booking Confirmation - MegaBounce</h2>
        <p>Dear ${formData.name},</p>
        <p>Thank you for your booking request! We have received your inquiry for our bouncy castle rental service.</p>
        
        <h3 style="color: #101010;">Booking Details:</h3>
        <ul>
          <li><strong>Product:</strong> ${selectedProduct.name}</li>
          <li><strong>Date:</strong> ${formData.date}</li>
          <li><strong>Time:</strong> ${formData.time}</li>
          <li><strong>Duration:</strong> ${formData.duration} hours</li>
          <li><strong>Event Type:</strong> ${formData.eventType}</li>
          <li><strong>Number of Children:</strong> ${formData.numberOfChildren}</li>
          <li><strong>Age Range:</strong> ${formData.ageRange}</li>
          <li><strong>Delivery Address:</strong> ${formData.address}</li>
          <li><strong>Total Price:</strong> $${totalPrice}</li>
        </ul>

        <h3 style="color: #101010;">Additional Services:</h3>
        <ul>
          ${formData.additionalServices.deliverySetup ? '<li>Delivery & Setup ($50)</li>' : ''}
          ${formData.additionalServices.supervision ? '<li>Supervision ($100)</li>' : ''}
          ${formData.additionalServices.insurance ? '<li>Insurance ($75)</li>' : ''}
          ${formData.additionalServices.cleaning ? '<li>Cleaning Service ($25)</li>' : ''}
        </ul>

        <h3 style="color: #101010;">Catering Options:</h3>
        <ul>
          ${formData.cateringOptions.jerkChicken ? '<li>Jerk Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.stewChicken ? '<li>Stew Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.curryChicken ? '<li>Curry Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.escovitchFish ? '<li>Escovitch Fish ($650)</li>' : ''}
          ${formData.cateringOptions.foodDecoration ? '<li>Food & Decoration Package ($1000)</li>' : ''}
        </ul>

        ${formData.specialInstructions ? `<h3 style="color: #101010;">Special Instructions:</h3><p>${formData.specialInstructions}</p>` : ''}

        <p>Our team will review your booking request and contact you within 24 hours to confirm availability and finalize the details.</p>
        
        <p>If you have any questions, please don't hesitate to contact us at (845) 518-8236.</p>
        
        <p>Best regards,<br>The MegaBounce Team</p>
      </div>
    `;

    // Email to business
    const businessEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff4f01;">New Booking Request - MegaBounce</h2>
        
        <h3 style="color: #101010;">Customer Information:</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
        </ul>

        <h3 style="color: #101010;">Booking Details:</h3>
        <ul>
          <li><strong>Product:</strong> ${selectedProduct.name}</li>
          <li><strong>Date:</strong> ${formData.date}</li>
          <li><strong>Time:</strong> ${formData.time}</li>
          <li><strong>Duration:</strong> ${formData.duration} hours</li>
          <li><strong>Event Type:</strong> ${formData.eventType}</li>
          <li><strong>Number of Children:</strong> ${formData.numberOfChildren}</li>
          <li><strong>Age Range:</strong> ${formData.ageRange}</li>
          <li><strong>Delivery Address:</strong> ${formData.address}</li>
          <li><strong>Total Price:</strong> $${totalPrice}</li>
        </ul>

        <h3 style="color: #101010;">Additional Services:</h3>
        <ul>
          ${formData.additionalServices.deliverySetup ? '<li>Delivery & Setup ($50)</li>' : ''}
          ${formData.additionalServices.supervision ? '<li>Supervision ($100)</li>' : ''}
          ${formData.additionalServices.insurance ? '<li>Insurance ($75)</li>' : ''}
          ${formData.additionalServices.cleaning ? '<li>Cleaning Service ($25)</li>' : ''}
        </ul>

        <h3 style="color: #101010;">Catering Options:</h3>
        <ul>
          ${formData.cateringOptions.jerkChicken ? '<li>Jerk Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.stewChicken ? '<li>Stew Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.curryChicken ? '<li>Curry Chicken ($500)</li>' : ''}
          ${formData.cateringOptions.escovitchFish ? '<li>Escovitch Fish ($650)</li>' : ''}
          ${formData.cateringOptions.foodDecoration ? '<li>Food & Decoration Package ($1000)</li>' : ''}
        </ul>

        ${formData.specialInstructions ? `<h3 style="color: #101010;">Special Instructions:</h3><p>${formData.specialInstructions}</p>` : ''}
      </div>
    `;

    // Send email to customer
    await transporter.send({
      from: 'Mega Bounce Bouncy Castle <info@mysterymobdetailing.com>',
      to: [formData.email],
      subject: 'Booking Confirmation - MegaBounce',
      html: customerEmailContent,
    });

    // Send email to business
    await transporter.send({
      from: 'Mega Bounce Bouncy Castle <info@mysterymobdetailing.com>',
      to: ['yaadiltd@gmail.com'],
      subject: 'New Booking Request - MegaBounce',
      html: businessEmailContent,
    });

    response.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    response.status(500).json({ error: 'Failed to send email' });
  }
} 