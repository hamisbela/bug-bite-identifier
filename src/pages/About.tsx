import React from 'react';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
          <p>
            Welcome to Free Bug Bite Identifier, your trusted resource for AI-powered insect bite and sting identification.
            We're dedicated to helping people understand and properly respond to insect bites by providing quick, accurate
            identification and valuable treatment information, all completely free of charge.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to help people make informed decisions about bug bites and stings by providing quick, reliable
            identification and treatment information. We believe that immediate access to accurate bite identification can
            help reduce anxiety and guide appropriate treatment decisions. By making this technology freely available,
            we aim to help anyone who's concerned about an insect bite or sting get the information they need quickly.
          </p>

          <h2>Why Choose Our Tool?</h2>
          <ul>
            <li>Advanced AI bite recognition technology</li>
            <li>Detailed bite analysis and characteristics</li>
            <li>Risk assessment information</li>
            <li>Treatment recommendations</li>
            <li>Prevention tips</li>
            <li>Completely free to use</li>
            <li>No registration required</li>
            <li>Privacy-focused approach</li>
            <li>Regular updates to improve accuracy</li>
          </ul>

          <div className="bg-yellow-50 p-6 rounded-lg my-8">
            <h2 className="text-yellow-800 mt-0">Important Medical Disclaimer</h2>
            <p className="mb-0">
              While our bug bite identifier tool provides helpful information, it is not a substitute for professional
              medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified
              health provider with any questions you may have regarding a medical condition. If you experience severe
              symptoms, allergic reactions, or are concerned about a bite, seek immediate medical attention.
            </p>
          </div>

          <h2>Support Our Project</h2>
          <p>
            We're committed to keeping this bug bite identification tool free and accessible to everyone. If you find
            our tool useful, consider supporting us by buying us a coffee. Your support helps us maintain and improve
            the service, ensuring it remains available to all users who need it.
          </p>

          <div className="mt-8 text-center">
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=bug-bite-identifier"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
            >
              Support Our Work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}