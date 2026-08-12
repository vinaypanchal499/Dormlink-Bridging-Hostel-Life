import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      'service_0efzx8m',
      'template_3ref3vd',
      { email, subject, message },
      'Tew9A-B-c5W2S7CYH'
    )
      .then(() => {
        setIsSending(false);
        setIsSent(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setIsSending(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'subject') setSubject(value);
    else if (name === 'message') setMessage(value);
  };

  return (
    <section className="bg-gray-900 dark:bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white dark:text-gray-900">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-300 dark:text-gray-600 sm:text-xl">
          If you are facing any problem or if you have any querie, Let us know.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-700">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg 
                focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={handleInputChange}
              className="block p-3 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-600 
                focus:ring-primary-500 focus:border-primary-500"
              placeholder="Let us know how we can help you"
              required
            />
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-white dark:text-gray-700">
              Your message
            </label>
            <textarea
              name="message"
              rows="6"
              value={message}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-sm 
                text-white bg-gray-800 border border-gray-600 
                rounded-lg shadow-sm 
                focus:ring-primary-500 focus:border-primary-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>

          {/* BLUE BUTTON */}
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center 
              text-white rounded-lg 
              bg-blue-600 hover:bg-blue-700 
              focus:ring-4 focus:outline-none focus:ring-blue-300"
            disabled={isSending || isSent}
          >
            {isSending ? 'Sending...' : isSent ? 'Sent!' : 'Send message'}
          </button>

        </form>
      </div>
    </section>
  );
}

export { Contact };
