import React from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Hanna",
      handle: "hanna.brooks",
      text: "I absolutely love this outfit! The fabric is so comfortable, and it flows beautifully. It's my go-to outfit for any special occasion.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Sophie", 
      handle: "sophie",
      text: "This dress is absolutely stunning! The fit is perfect, and the floral print is even more beautiful in person. I received so many compliments when I wore it to a wedding.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Sophie",
      handle: "sophie_nice", 
      text: "I am in love with this midi dress! The fabric is soft and comfortable, and it flows beautifully. It's now my go-to outfit for any special occasion.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Sophie",
      handle: "sophie",
      text: "I couldn't be happier with this purchase. The quality is top-notch and this dress looks exactly like it does in the pictures.",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Sophie",
      handle: "sophie",
      text: "Top quality and perfect fit. The dress looks amazing in real life.",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Sophie",
      handle: "sophie",
      text: "Stylish, elegant, and super comfortable. I wear it all the time.",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=50&h=50&fit=crop&crop=face"
    }
    
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">What People Are Saying</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-white text-black border rounded-lg p-6 relative">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
              <div className="absolute top-4 right-4 text-gray-300 text-3xl">“</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {testimonials.slice(3, 6).map((testimonial, index) => (
            <div key={index} className="bg-white text-black border rounded-lg p-6 relative md:translate-x-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{testimonial.text}</p>
              <div className="absolute top-4 right-4 text-gray-300 text-3xl">“</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
