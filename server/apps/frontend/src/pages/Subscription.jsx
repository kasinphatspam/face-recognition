import React from 'react';
import Navigation from "@/components/Navigation";
import Pricing from "@/components/Pricing"


const Subscription = () => {
  const subscriptionImage = 'https://i.pinimg.com/564x/c4/84/50/c48450f31eec871227b0c45b69d58a07.jpg';

  return (
    <>
      <Navigation Active="ContactUs" />
      <div className="container mx-auto mt-8">
        <h1 className="text-6xl font-bold mb-10">Subscription</h1>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <p>
              Step into a world of seamless connections with Face-Prove, your key to unlocking personalized customer experiences. No more forms or queries; just a quick snapshot, and our innovative face recognition technology reveals valuable insights about your customers. From retail to hospitality, Face-Prove transforms the customer journey, allowing businesses to effortlessly tailor their approach. Join us in revolutionizing customer engagement. Face-Prove isn't just about recognizing faces; it's about understanding and enhancing every individual's experience.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={subscriptionImage}
              alt="Subscription"
              className="max-w-full h-auto border rounded"
              style={{ maxWidth: '300px', border: '10px solid #ccc' }}
            />
          </div>
          
          <div className="grid grid-flow-col max-sm:grid-flow-row max-sm:mt-4 gap-8 relative mt-8 mb-12 mx-auto">
            <Pricing
              session={'Startup'}
              description={'All basic for starting a business'}
              user={'24 users'}
              snapshot={true}
              server={'10GB'}
              subscription={199}
              month={month}
            />
            <Pricing
              session={'Enterprise'}
              description={'addition feature for large enterprise'}
              user={'100 users'}
              snapshot={false}
              server={'100GB'}
              subscription={699}
              month={month}
              custom={"ring-2 ring-pink-600"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
