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
    <footer className="bg-[#F0F0F0] py-16">
      <div className="px-8 lg:px-[100px]">
        <div className="flex flex-col md:flex-row gap-[106px] 2xl:justify-between">
          <div className="w-fit max-w-xs">
            <h3 className="text-navbar-h1 font-alfa mb-[25px]">FAKESTORE</h3>
            <p className="text-[#00000099] text-footer-description-text mb-[35px]">
              We have clothes that suits your style<br/>and which you're proud to
              wear.<br/>From women to men.
            </p>
            <div className="flex gap-3">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <img key={i} src={`/${i+1}.png`}></img>
                ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-footer-menu-title text-[#111111] mb-6">
                {section.title}
              </h4>
              <ul className="space-y-6 text-[#00000099] text-footer-menu-text">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-black">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-8 lg:mt-12 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-0">
          <p className="text-[#00000099]">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex">
            {paymentMethods.map((method, i) => (
              <div key={i}>
                <img
                  className="object-cover block"
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
