import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "next-themes";
import {
  Sun, Moon, Menu, X, ChevronDown,
  Linkedin, Facebook, Twitter, Youtube, Instagram
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Know Us", href: "/know-us" },
  {
    label: "Services", href: "/services", children: [
      { label: "IT Services", href: "/services/it-services" },
      { label: "Consulting", href: "/services/consulting" },
      { label: "Training", href: "/services/training" },
    ]
  },
  { label: "Clients", href: "/clients" },
  { label: "News", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => setMounted(true), []);
  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 cursor-pointer" data-testid="nav-logo">
            <span className="text-2xl font-bold tracking-tighter">
              <span className="text-foreground">Byte</span>
              <span className="text-primary">Stor</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="nav-services"
                  >
                    {link.label} <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                        data-testid={`nav-${child.label.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors"
                  aria-label="Toggle theme"
                  data-testid="btn-theme-toggle"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-secondary text-secondary-foreground"
                data-testid="btn-theme-toggle-mobile"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground" data-testid="btn-mobile-menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-base font-semibold text-muted-foreground">Services</div>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block pl-6 pr-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-secondary ${location === link.href ? "text-primary" : "text-foreground"}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              <span className="text-foreground">Byte</span>
              <span className="text-primary">Stor</span>
            </span>
            <p className="text-muted-foreground max-w-sm mb-6">
              Seasoned IT consultancy and services company trusted by enterprises for infrastructure stability and workforce training.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="YouTube"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/know-us" className="text-muted-foreground hover:text-primary transition-colors">Know Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">More</h4>
            <ul className="space-y-3">
              <li><Link href="/clients" className="text-muted-foreground hover:text-primary transition-colors">Clients</Link></li>
              <li><Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">News</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">Copyright © 2023 ByteStor IT Services</p>
          <p className="text-muted-foreground text-sm">Hyderabad, India</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
