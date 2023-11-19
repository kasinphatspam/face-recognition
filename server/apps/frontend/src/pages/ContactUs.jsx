import React from 'react';
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button, Input, Link as Nextlink } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Eye, EyeOff } from "react-feather";
import FooterBar from '@/components/Footersection';


const ContactUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);


  return (
    <>
      <Navigation
        Active="Contactus"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto mt-16 m-auto ml-8 mr-8"
      >
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                  Your Name
                </label>
                <Input
                  isRequired
                  isClearable
                  type="email"
                  label="Name"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                  Your Email
                </label>
                <Input
                  isRequired
                  isClearable
                  type="email"
                  label="Email"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Your Message
                </label>
                <Input
                  isRequired
                  isClearable
                  type="email"
                  label="Type your message here"
                  variant="bordered"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="font-bold mt-6 bg-gradient-to-tr from-green-500 to-green-500 text-white shadow-lg">
                  Send Message
              </Button>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{duration:2}}>
              <div className="mt-4">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="300"
                  className='border-full'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.279060030492!2d-122.4194152847838!3d37.77492977976158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e2406533d97%3A0x1a3e4c3ee9d68b4!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1637787088758!5m2!1sen!2sus"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="flex justify-center mt-20 bg-gradient-to-r from-blue-50/50 to-blue-200/10 dark:from-zinc-900 dark:to-neutral-800">
        <FooterBar className="mt-10" />
      </div>
    </>
  );
};

export default ContactUsPage;
