import { Github, Twitter, DiscIcon as Discord } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">About</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              A decentralized lending protocol built on the XION network,
              enabling users to borrow and lend assets efficiently and securely.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Community</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Discord className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} XION Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
