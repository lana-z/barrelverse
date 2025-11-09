import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onNavigate?: (section: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Experiences", href: "#experiences" },
    { label: "Contact", href: "#contact" },
  ];

  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
    if (onNavigate) {
      onNavigate(href.slice(1));
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleClick("#home")}
              className="font-serif text-2xl font-light tracking-wide text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md"
              data-testid="link-home"
            >
              Barrel + Verse
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-sm tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors hover-elevate active-elevate-2 px-3 py-2 rounded-md"
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-20">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-lg tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
                data-testid={`mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
