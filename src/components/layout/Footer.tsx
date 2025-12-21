'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-bg-primary border-t border-border-default mt-auto">
      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* Logo */}
        <div className="mb-16">
          <Link href="/" className="inline-block transition-opacity duration-normal hover:opacity-80">
            <Image
              src="/logo_theantiques.svg"
              alt="The Antiques"
              width={180}
              height={32}
              className="h-8 w-auto invert"
            />
          </Link>
        </div>

        {/* Main Grid - Links + Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10">
          {/* Menu */}
          <div>
            <h4 className="text-caption text-text-tertiary mb-5">Menu</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Shop
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

          {/* Legal */}
          <div>
            <h4 className="text-caption text-text-tertiary mb-5">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Cookie Policy
              </Link>
              <Link
                href="/terms"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/shipping"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Delivery and Return
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption text-text-tertiary mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+390000000000"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                +39 000 000 0000
              </a>
              <a
                href="mailto:hello@theantiques.com"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                hello@theantiques.com
              </a>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-caption text-text-tertiary mb-5">Follow us</h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                Twitter
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                TikTok
              </a>
            </nav>
          </div>

          {/* Newsletter - spans 2 columns */}
          <div className="col-span-2">
            <h4 className="text-caption text-text-tertiary mb-5">Newsletter</h4>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 max-w-[240px] h-11 px-4 bg-transparent border border-border-subtle rounded-lg text-caption text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors duration-normal"
              />
              <button
                type="submit"
                className="flex items-center justify-center h-11 w-11 rounded-full border border-text-primary text-text-primary transition-all duration-normal hover:bg-text-primary hover:text-bg-primary flex-shrink-0"
                aria-label="Subscribe to newsletter"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 py-8 border-t border-border-default">
          <p className="text-small text-text-tertiary text-center">
            &copy; {new Date().getFullYear()} - The Antiques. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large Gradient Watermark Logo */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden h-[30vh] md:h-[40vh]"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <span
            className="text-[18vw] md:text-[15vw] lg:text-[12vw] font-bold tracking-tighter whitespace-nowrap uppercase"
            style={{
              background: 'linear-gradient(to top, rgba(39, 39, 42, 0.5) 0%, rgba(30, 30, 34, 0.25) 40%, transparent 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '0.8',
              transform: 'translateY(25%)',
            }}
          >
            THE ANTIQUES
          </span>
        </div>
      </div>
    </footer>
  )
}
