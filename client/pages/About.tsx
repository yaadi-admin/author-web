import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-suelyn-light-pink to-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-8">About Page</h1>
          <p className="text-lg mb-8">This page is under construction. Please continue prompting to add content here.</p>
          <div className="max-w-2xl mx-auto bg-white/50 rounded-lg p-8">
            <p className="text-gray-600">
              This placeholder page maintains the site's navigation and branding while indicating 
              that content is coming soon. The overall design aesthetic is preserved with the 
              brand colors and typography.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
