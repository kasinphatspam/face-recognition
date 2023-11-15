import React from 'react';
import Navigation from "@/components/Navigation";

const ContactUsPage = () => {
  return (
    <>
      <Navigation
        Active="Contactus"
      />
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="john@example.com"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> info@example.com
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> +1 (123) 456-7890
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span> 123 Main St, Cityville, Country
            </p>

            {/* Map (Replace the src attribute with your own map URL) */}
            <div className="mt-4">
              <iframe
                title="Google Map"
                width="100%"
                height="300"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.279060030492!2d-122.4194152847838!3d37.77492977976158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2406533d97%3A0x1a3e4c3ee9d68b4!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1637787088758!5m2!1sen!2sus"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
