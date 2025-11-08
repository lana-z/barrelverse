import { Wine, Instagram, Facebook, Mail, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="h-5 w-5 text-primary" />
              <span className="font-serif text-xl font-light">Barrel + Verse</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              Wine is story, place, and memory
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors" data-testid="footer-link-about">
                  About
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-foreground transition-colors" data-testid="footer-link-courses">
                  Courses
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-foreground transition-colors" data-testid="footer-link-experiences">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors" data-testid="footer-link-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/mitchellrobertson"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md"
                aria-label="LinkedIn"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="#"
                className="hover-elevate active-elevate-2 p-2 rounded-md"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="#"
                className="hover-elevate active-elevate-2 p-2 rounded-md"
                aria-label="Facebook"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a
                href="mailto:hello@barrelandverse.com"
                className="hover-elevate active-elevate-2 p-2 rounded-md"
                aria-label="Email"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Barrel + Verse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
