import { motion } from "framer-motion";
import { Link } from "wouter";
import { Cloud, FileCheck, AlertTriangle, BarChart3, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const specializations = [
  "Vendor Neutral Consultancy services to meet client business requirements",
  "Storage Assessment & Design — Unified Storage Architecture",
  "Disaster Recovery Architecture and Fire Drill",
  "Business Continuity Planning",
  "IT / Cloud Assessments",
];

const portfolio = [
  "Reducing cost",
  "Technology Management",
  "Connectivity and Infrastructure requirements",
  "Security and Compliance",
  "Disaster Recovery & Business Continuity in the cloud",
  "Knowledge Transfer and Documentation",
];

const highlights = [
  {
    icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    title: "Disaster Recovery",
    desc: "Our specialist DR team helps you build a near bulletproof Disaster Recovery Plan for critical Applications, Databases and Systems to reduce downtime and prevent data loss — with Fire Drill design and testing to improve RTO/RPO.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-primary" />,
    title: "Cloud Migration",
    desc: "Moving to Cloud requires comprehensive planning and evaluation. Our consultants gather detailed information of your applications and databases and build a clear roadmap in line with your business needs for a smooth migration with minimum downtime.",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-primary" />,
    title: "Business Continuity",
    desc: "We develop robust Business Continuity Plans that ensure your organization can maintain essential functions during and after a disaster, minimizing operational disruption.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "IT/Cloud Assessments",
    desc: "In-depth assessments of your existing IT environment, identifying gaps and opportunities to optimize performance, reduce costs, and align with your business strategy.",
  },
];

export default function Consulting() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/services" className="inline-flex items-center gap-1 text-primary text-sm font-medium mb-6 hover:underline" data-testid="breadcrumb-services">
              ← Back to Services
            </Link>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Our Services</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Consulting</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              Our Consultancy Services are designed based on proven best practices and industry standards to deliver
              expert quality. With a talent pool of highly qualified and certified consultants, we deliver optimal
              value to businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">We Specialize In</h2>
              <ul className="space-y-4">
                {specializations.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 text-foreground"
                    data-testid={`spec-${i}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Service Portfolio Covers</h2>
              <ul className="space-y-4">
                {portfolio.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 text-foreground"
                    data-testid={`portfolio-${i}`}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">How We Help</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all"
                data-testid={`highlight-${i}`}
              >
                <div className="p-3 bg-primary/10 rounded-xl inline-block mb-4">{h.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{h.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10 border-y border-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to optimize your IT strategy?</h2>
          <p className="text-muted-foreground mb-8">Our certified consultants are ready to assess your environment and build a clear roadmap for growth.</p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto" data-testid="btn-contact-consulting">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
