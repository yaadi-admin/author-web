import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend("re_7KTHYCft_5yWqpQjkXkkpEfe3FZQFkzMu");

interface EmailRequest {
  formData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    address: string;
    vehicleType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    additionalServices: {
      petHairRemoval: boolean;
      headlightCleaning: boolean;
      engineDetail: boolean;
      ceramicCoating: boolean;
    };
    specialInstructions: string;
    productId: string;
  };
  selectedProduct: {
    name: string;
    priceDisplay: string;
    description: string;
  };
  totalPrice: number;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as EmailRequest;
    const { formData, selectedProduct, totalPrice } = body;

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const formatTime = (timeString: string) => {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    };

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">New Booking Request</h1>
        
        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Customer Information</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
        </div>

        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Vehicle Information</h2>
          <p><strong>Type:</strong> ${formData.vehicleType}</p>
          <p><strong>Make:</strong> ${formData.vehicleMake}</p>
          <p><strong>Model:</strong> ${formData.vehicleModel}</p>
          <p><strong>Year:</strong> ${formData.vehicleYear}</p>
        </div>

        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Service Details</h2>
          <p><strong>Selected Service:</strong> ${selectedProduct.name}</p>
          <p><strong>Description:</strong> ${selectedProduct.description}</p>
          <p><strong>Base Price:</strong> ${selectedProduct.priceDisplay}</p>
        </div>

        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Additional Services</h2>
          ${formData.additionalServices.petHairRemoval ? '<p>• Pet Hair Removal (+$50)</p>' : ''}
          ${formData.additionalServices.headlightCleaning ? '<p>• Headlight Cleaning (+$50)</p>' : ''}
          ${formData.additionalServices.engineDetail ? '<p>• Engine Detail (+$45)</p>' : ''}
          ${formData.additionalServices.ceramicCoating ? '<p>• Ceramic Coating (+$275)</p>' : ''}
        </div>

        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Appointment Details</h2>
          <p><strong>Date:</strong> ${formatDate(formData.date)}</p>
          <p><strong>Time:</strong> ${formatTime(formData.time)}</p>
        </div>

        ${formData.specialInstructions ? `
          <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Special Instructions</h2>
            <p>${formData.specialInstructions}</p>
          </div>
        ` : ''}

        <div style="background-color: #f6f9fc; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Total Price</h2>
          <p style="font-size: 24px; font-weight: 600;">$${totalPrice.toFixed(2)}</p>
        </div>

        <hr style="border-color: #e6ebf1; margin: 20px 0;" />
        
        <p style="color: #8898aa; font-size: 12px;">
          This is an automated message from Mystery Mobile Detailing. Please do not reply to this email.
        </p>
      </div>
    `;

    const response = await resend.emails.send({
      from: 'Mystery Mobile Detailing <info@mysterymobdetailing.com>',
      to: ['mysterymobiledetailing@yahoo.com'],
      subject: `New Booking Request - ${selectedProduct.name}`,
      html,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 