import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, Building2, Handshake, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const techPartners = [
  {
    name: "Dell EMC",
    category: "Storage Hardware",
    color: "#007DB8",
    abbr: "Dell\nEMC",
    svg: (
      <svg viewBox="0 0 120 40" className="w-24 h-10">
        <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="#007DB8">Dell</text>
        <text x="62" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="#007DB8">EMC</text>
      </svg>
    ),
  },
  {
    name: "NetApp",
    category: "Storage Hardware",
    color: "#0067C5",
    svg: (
      <svg viewBox="0 0 120 40" className="w-28 h-10">
        <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="#0067C5">Net</text>
        <text x="54" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="#00B0E0">App</text>
      </svg>
    ),
  },
  {
    name: "CommVault",
    category: "Data Management",
    color: "#C8102E",
    svg: (
      <svg viewBox="0 0 140 40" className="w-32 h-10">
        <rect x="0" y="8" width="10" height="24" rx="5" fill="#C8102E"/>
        <text x="18" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor" className="fill-foreground">CommVault</text>
      </svg>
    ),
  },
  {
    name: "Veritas",
    category: "Data Protection",
    color: "#E31837",
    svg: (
      <svg viewBox="0 0 120 40" className="w-28 h-10">
        <circle cx="12" cy="20" r="10" fill="#E31837"/>
        <text x="28" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" fill="currentColor" className="fill-foreground">Veritas</text>
      </svg>
    ),
  },
  {
    name: "VMware",
    category: "Virtualization",
    color: "#1D428A",
    svg: (
      <svg viewBox="0 0 120 40" className="w-28 h-10">
        <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="24" fill="#1D428A">VM</text>
        <text x="38" y="28" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="24" fill="currentColor" className="fill-foreground">ware</text>
      </svg>
    ),
  },
  {
    name: "Veeam",
    category: "Backup & Replication",
    color: "#00B336",
    svg: (
      <svg viewBox="0 0 110 40" className="w-24 h-10">
        <polygon points="0,10 16,20 0,30" fill="#00B336"/>
        <text x="22" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24" fill="currentColor" className="fill-foreground">Veeam</text>
      </svg>
    ),
  },
  {
    name: "HPE",
    category: "Infrastructure",
    color: "#01A982",
    svg: (
      <svg viewBox="0 0 80 40" className="w-20 h-10">
        <text x="0" y="30" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="32" fill="#01A982">HPE</text>
      </svg>
    ),
  },
  {
    name: "IBM",
    category: "Enterprise IT",
    color: "#054ADA",
    svg: (
      <svg viewBox="0 0 80 40" className="w-20 h-10">
        <text x="0" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="36" fill="#054ADA">IBM</text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    category: "Cloud & OS",
    color: "#0078D4",
    svg: (
      <svg viewBox="0 0 160 40" className="w-36 h-10">
        <rect x="0" y="2" width="17" height="17" fill="#F25022"/>
        <rect x="19" y="2" width="17" height="17" fill="#7FBA00"/>
        <rect x="0" y="21" width="17" height="17" fill="#00A4EF"/>
        <rect x="19" y="21" width="17" height="17" fill="#FFB900"/>
        <text x="44" y="28" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="18" fill="currentColor" className="fill-foreground">Microsoft</text>
      </svg>
    ),
  },
  {
    name: "OSNEXUS",
    category: "Software-Defined Storage",
    color: "#2E86C1",
    svg: (
      <svg viewBox="0 0 140 40" className="w-32 h-10">
        <text x="0" y="28" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="22" fill="#2E86C1">OS</text>
        <text x="34" y="28" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="22" fill="currentColor" className="fill-foreground">NEXUS</text>
      </svg>
    ),
  },
  {
    name: "Nimble Storage",
    category: "Flash Storage",
    color: "#00A1DE",
    svg: (
      <svg viewBox="0 0 150 40" className="w-36 h-10">
        <path d="M0,30 L12,5 L24,30 Z" fill="#00A1DE"/>
        <text x="30" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="currentColor" className="fill-foreground">Nimble</text>
      </svg>
    ),
  },
  {
    name: "Broadcom",
    category: "Software & Infrastructure",
    color: "#CC0000",
    svg: (
      <svg viewBox="0 0 140 40" className="w-32 h-10">
        <circle cx="14" cy="20" r="12" fill="none" stroke="#CC0000" strokeWidth="4"/>
        <text x="32" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" fill="currentColor" className="fill-foreground">Broadcom</text>
      </svg>
    ),
  },
];

const regions = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "India",
    desc: "Serving enterprise clients across India including Hyderabad, Mumbai, Delhi, Bangalore and other major cities.",
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Middle East & Africa",
    desc: "Delivering training and consultancy services to clients across the Middle East and Africa region.",
  },
];

const sectors = [
  "Banking & Financial Services",
  "Healthcare & Pharmaceuticals",
  "Manufacturing",
  "Telecommunications",
  "Government & Public Sector",
  "Information Technology",
  "Retail & E-Commerce",
  "Education & Research",
];

const stats = [
  { value: "30+", label: "Years Serving Clients" },
  { value: "20K+", label: "Students Trained" },
  { value: "600+", label: "Trainings Delivered" },
  { value: "20+", label: "Industry Certifications" },
];

export default function Clients() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Trusted By</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Our Clients</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              For over 30 years, ByteStor IT Services (BITS) has delivered enterprise-grade IT solutions, consultancy
              and training to organizations across India and the Middle East & Africa region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary/10 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} data-testid={`client-stat-${i}`}>
                <div className="text-4xl font-bold text-primary mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners Logo Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Ecosystem</p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Technology Partners & Vendors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We work with and deliver expert training and consultancy services on the world's leading enterprise
              storage, backup, virtualization, and infrastructure platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {techPartners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all group"
                data-testid={`partner-logo-${i}`}
              >
                <div className="h-12 flex items-center justify-center w-full overflow-hidden">
                  {partner.svg}
                </div>
                <p className="text-xs text-muted-foreground text-center leading-tight">{partner.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling marquee strip */}
      <section className="py-8 border-y border-border bg-secondary/30 overflow-hidden">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
          Certified & Vendor-Neutral Expertise Across Leading Platforms
        </p>
        <div className="flex gap-14 animate-marquee whitespace-nowrap px-4">
          {[...techPartners, ...techPartners].map((p, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-muted-foreground font-semibold text-sm">{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">Regions We Serve</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {regions.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8 flex gap-4 items-start"
                data-testid={`region-${i}`}
              >
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">{r.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sectors */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Industries We Serve</h2>
                <p className="text-muted-foreground">Our expertise spans a wide range of industries with mission-critical infrastructure needs.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="flex items-center gap-2 bg-secondary/50 rounded-xl px-4 py-3"
                  data-testid={`sector-${i}`}
                >
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{sector}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Handshake className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Become a Partner</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing list of enterprises that trust ByteStor IT Services for their critical infrastructure and workforce development needs.
          </p>
          <Link href="/contact">
            <button
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto"
              data-testid="btn-partner"
            >
              Work With Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
