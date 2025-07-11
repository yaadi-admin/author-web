import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface BookingEmailProps {
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

export const BookingConfirmationEmail = ({
  formData,
  selectedProduct,
  totalPrice,
}: BookingEmailProps) => {
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

  return (
    <Html>
      <Head />
      <Preview>New Booking Request from {formData.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Booking Request</Heading>
          
          <Section style={section}>
            <Text style={text}>A new booking request has been submitted:</Text>
            
            <Section style={box}>
              <Heading as="h2" style={h2}>Customer Information</Heading>
              <Row>
                <Column>
                  <Text style={label}>Name:</Text>
                  <Text style={value}>{formData.name}</Text>
                </Column>
                <Column>
                  <Text style={label}>Email:</Text>
                  <Text style={value}>{formData.email}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={label}>Phone:</Text>
                  <Text style={value}>{formData.phone}</Text>
                </Column>
                <Column>
                  <Text style={label}>Address:</Text>
                  <Text style={value}>{formData.address}</Text>
                </Column>
              </Row>
            </Section>

            <Section style={box}>
              <Heading as="h2" style={h2}>Vehicle Information</Heading>
              <Row>
                <Column>
                  <Text style={label}>Type:</Text>
                  <Text style={value}>{formData.vehicleType}</Text>
                </Column>
                <Column>
                  <Text style={label}>Make:</Text>
                  <Text style={value}>{formData.vehicleMake}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={label}>Model:</Text>
                  <Text style={value}>{formData.vehicleModel}</Text>
                </Column>
                <Column>
                  <Text style={label}>Year:</Text>
                  <Text style={value}>{formData.vehicleYear}</Text>
                </Column>
              </Row>
            </Section>

            <Section style={box}>
              <Heading as="h2" style={h2}>Service Details</Heading>
              <Text style={label}>Selected Service:</Text>
              <Text style={value}>{selectedProduct.name}</Text>
              <Text style={label}>Service Description:</Text>
              <Text style={value}>{selectedProduct.description}</Text>
              <Text style={label}>Base Price:</Text>
              <Text style={value}>{selectedProduct.priceDisplay}</Text>
            </Section>

            <Section style={box}>
              <Heading as="h2" style={h2}>Additional Services</Heading>
              {formData.additionalServices.petHairRemoval && (
                <Text style={value}>• Pet Hair Removal (+$50)</Text>
              )}
              {formData.additionalServices.headlightCleaning && (
                <Text style={value}>• Headlight Cleaning (+$50)</Text>
              )}
              {formData.additionalServices.engineDetail && (
                <Text style={value}>• Engine Detail (+$45)</Text>
              )}
              {formData.additionalServices.ceramicCoating && (
                <Text style={value}>• Ceramic Coating (+$275)</Text>
              )}
            </Section>

            <Section style={box}>
              <Heading as="h2" style={h2}>Appointment Details</Heading>
              <Text style={label}>Date:</Text>
              <Text style={value}>{formatDate(formData.date)}</Text>
              <Text style={label}>Time:</Text>
              <Text style={value}>{formatTime(formData.time)}</Text>
            </Section>

            {formData.specialInstructions && (
              <Section style={box}>
                <Heading as="h2" style={h2}>Special Instructions</Heading>
                <Text style={value}>{formData.specialInstructions}</Text>
              </Section>
            )}

            <Section style={box}>
              <Heading as="h2" style={h2}>Total Price</Heading>
              <Text style={value}>{`$${totalPrice.toFixed(2)}`}</Text>
            </Section>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            This is an automated message from Mystery Mobile Detailing. Please do not reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '24px',
  backgroundColor: '#f6f9fc',
  borderRadius: '5px',
  marginBottom: '20px',
};

const section = {
  padding: '0 48px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '0 0 10px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
};

const label = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 4px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const totalPrice = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

export default BookingConfirmationEmail; 