import React from 'react';

const UserTestimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      image: "https://i.ibb.co/4gSkc5D/user1.png", // Replace with working image
      feedback: "This platform has helped me share surplus food and reduce waste!",
    },
    {
      name: "Jane Smith",
      image: "https://i.ibb.co/NxQ8VGC/user2.png", // Replace with working image
      feedback: "I love how easy it is to find and request food in my area.",
    },
    {
      name: "Michael Brown",
      image: "https://i.ibb.co/TLP1rGM/user3.png", // Replace with working image
      feedback: "A fantastic initiative for building a stronger community!",
    },
  ];

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <div className="flex gap-1 text-yellow-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTestimonials;
