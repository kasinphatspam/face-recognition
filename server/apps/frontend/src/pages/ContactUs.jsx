import React from 'react';
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button, Input } from "@nextui-org/react";
import { useState, useRef } from "react";
import FooterBar from '@/components/Footersection';
import emailjs from '@emailjs/browser';
import { Transition } from '@/hooks/Transition';

const ContactUsPage = () => {
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cutuw4q', 'template_54v60tf', form.current, 'Kr0pl6y_pLYkdkM99')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

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
        className="container mx-auto mt-16 m-auto ml-20 mr-8"
      >
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <form ref={form} onSubmit={sendEmail}> 
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                  Your Name
                </label>
                <Input
                  isRequired
                  isClearable
                  type="text"
                  label="Name"
                  name="user_name"
                  variant="bordered"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                  Your Email
                </label>
                <Input
                  isRequired
                  isClearable
                  name="user_email"
                  type="text"
                  label="Email"
                  variant="bordered"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Subject
                </label>
                <Input
                  isRequired
                  isClearable
                  name='user_subject'
                  type="text"
                  label="Make the subject short and clearly"
                  variant="bordered"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Details
                </label>
                <Input
                  isRequired
                  isClearable
                  name='user_detail'
                  type="text"
                  label="Explain details"
                  variant="bordered"
                />
              </div>
              <Button type='submit' className="font-bold mt-6 bg-gradient-to-tr from-green-500 to-green-500 text-white shadow-lg">
                  Send
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> faceprove.gurateam@gmail.com
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

export default Transition(ContactUsPage);
