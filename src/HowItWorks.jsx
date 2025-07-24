const HowItWorks = () => (
  <section id="how-it-works" className="my-12 px-4">
    <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          id: 1,
          title: "Step 1",
          description: "Add surplus food to the platform and share with the community.",
          imgSrc: "https://i.ibb.co/9NpT5kL/step1.png", // replace with working image URL
        },
        {
          id: 2,
          title: "Step 2",
          description: "Browse available options and request food from others.",
          imgSrc: "https://i.ibb.co/GsNv2MR/step2.png", // replace with working image URL
        },
        {
          id: 3,
          title: "Step 3",
          description: "Connect and coordinate for pickup or delivery.",
          imgSrc: "https://i.ibb.co/TkXmTCn/step3.png", // replace with working image URL
        },
      ].map((step) => (
        <div
          key={step.id}
          className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-300"
        >
          <div className="mb-4">
            <img
              src={step.imgSrc}
              alt={`Illustration of ${step.title}`}
              className="w-20 h-20 mx-auto"
            />
          </div>
          <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
            {step.id}
          </div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>

    <div className="text-center mt-10">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
        Get Started
      </button>
    </div>
  </section>
);

export default HowItWorks;
