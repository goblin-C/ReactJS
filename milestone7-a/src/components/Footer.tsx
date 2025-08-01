export const Footer = () => {
  const footerSections = [
    {
      title: "COMPANY",
      links: ["About", "Features", "Works", "Career"],
    },
    {
      title: "HELP",
      links: [
        "Customer Support",
        "Delivery Details",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
    {
      title: "FAQ",
      links: ["Account", "Manage Deliveries", "Orders", "Payments"],
    },
    {
      title: "RESOURCES",
      links: [
        "Free eBooks",
        "Development Tutorial",
        "How to - Blog",
        "Youtube Playlist",
      ],
    },
  ];
  const paymentMethods = ["visa", "mastercard", "paypal", "apple", "google"];

  return (
    <footer className="bg-[#F0F0F0] py-8 md:py-12 lg:py-16">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl md:text-2xl lg:text-navbar-h1 font-alfa mb-4 md:mb-6">FAKESTORE</h3>
            <p className="text-[#00000099] text-sm md:text-footer-description-text mb-6 md:mb-8 leading-relaxed">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <img key={i} src={`/${i+1}.png`} className="w-6 h-6 md:w-8 md:h-8" alt={`Social ${i+1}`} />
                ))}
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="">
              <h4 className="text-sm md:text-footer-menu-title text-[#111111] mb-4 md:mb-6 font-medium">
                {section.title}
              </h4>
              <ul className="space-y-3 md:space-y-4 text-[#00000099] text-sm md:text-footer-menu-text">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 mt-8 lg:mt-12 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#00000099] text-sm text-center md:text-left">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-2">
            {paymentMethods.map((method, i) => (
              <div key={i}>
                <img
                  className="w-8 h-6 md:w-10 md:h-8 object-contain"
                  src={`/${method}.png`}
                  alt={method}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
