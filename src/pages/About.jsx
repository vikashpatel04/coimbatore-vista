const About = () => {
  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-3xl font-semibold">About the Author</h2>

      {/* Profile Image Placeholder */}
      <div className="mt-4 w-32 h-32 mx-auto rounded-full bg-gray-300"></div>

      <h3 className="mt-4 text-xl font-semibold">Name</h3>
      <p className="mt-2 text-gray-600">
        Passionate developer creating innovative projects. Love exploring new technologies and building cool stuff!
      </p>

      {/* LinkedIn Link */}
      <a
        href="https://www.linkedin.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Connect on LinkedIn
      </a>
    </div>
  );
};

export default About;
