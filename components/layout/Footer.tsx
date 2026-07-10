import Link from "next/link";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const socialLinks = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Twitter", icon: TwitterIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] py-8 md:py-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[248px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-white tracking-tight mb-2">
              TJERMIN
            </h4>
            <p className="text-xs md:text-sm text-[#94A3B8]">
              &copy; 2026 AutoElite. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 flex-wrap justify-center">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs md:text-sm text-[#94A3B8] hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-3 md:gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-8 h-8 md:w-9 md:h-9 bg-[#1E293B] rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
