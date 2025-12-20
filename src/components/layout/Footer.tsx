import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-title-3 text-text-primary mb-4">The Antiques</h3>
            <p className="text-caption text-text-secondary max-w-md">
              Curating timeless pieces with history and character. Each item tells a story waiting to continue in your home.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-body-medium text-text-primary mb-4">Explore</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/categories"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Categories
              </Link>
              <Link
                href="/search"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Search
              </Link>
              <Link
                href="/about"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-body-medium text-text-primary mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-caption text-text-secondary">
              <p>info@theantiques.com</p>
              <p>+39 000 000 0000</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-small text-text-tertiary">
            © {new Date().getFullYear()} The Antiques. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
