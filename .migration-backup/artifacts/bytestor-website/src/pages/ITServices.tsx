import { motion } from "framer-motion";
import { Link } from "wouter";
import { Database, Shield, Activity, Cpu, Server, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const offerings = [
  { icon: <Activity className="w-6 h-6 text-primary" />, title: "Data & Storage Monitoring", desc: "Proactive monitoring of your data and storage infrastructure to detect issues before they impact business operations." },
  { icon: <Shield className="w-6 h-6 text-primary" />, title: "Data Care Technology Services", desc: "Comprehensive care services ensuring the health and performance of your critical data assets." },
  { icon: <Database className="w-6 h-6 text-primary" />, title: "Backup Monitoring & Reporting", desc: "Ongoing monitoring and detailed reporting of your backup operations to guarantee data protection at all times." },
  { icon: <Server className="w-6 h-6 text-primary" />, title: "Remote Support Services", desc: "Expert remote support available around the clock, ensuring rapid resolution of infrastructure issues." },
  { icon: <Cpu className="w-6 h-6 text-primary" />, title: "Deployment Services", desc: "End-to-end deployment services for storage, backup, and high availability solutions across your environment." },
];

const solutions = [
  {
    title: "Storage Consolidation",
    desc: "Businesses today run at the speed of their information. We help unlock information from behind specific applications across the enterprise, bridging gaps between disparate platforms. Our storage solutions allow companies to manage, protect, and efficiently plan the growth of enormous amounts of information.",
  },
  {
    title: "SDS Solutions (Software-Defined Storage)",
    desc: "A software-defined data center virtualizes and federates datacenter-wide hardware resources including storage, compute, and network. We work with leading SDS vendors such as OSNEXUS, Nimble, and Veritas to deliver integrated storage services across multiple locations and technologies.",
  },
  {
    title: "Backup & Recovery",
    desc: "Every business is susceptible to an IT disaster. The only way to mitigate interruptions is to have a fast recovery due to a well-crafted backup and disaster recovery plan. We design and implement bulletproof backup and recovery strategies to protect your critical business data.",
  },
  {
    title: "High Availability / Clustering",
    desc: "Ensure your mission-critical applications remain available 24×7×365. Our high availability clustering solutions eliminate single points of failure and provide seamless failover capabilities, keeping your business running without interruption.",
  },
  {
    title: "Disaster Recovery",
    desc: "Our specialist DR team helps you build a near bulletproof Disaster Recovery Plan for your critical Applications, Databases and Systems to reduce downtime and prevent data loss. We design and test Fire Drills to improve your RTO/RPO.",
  },
  {
    title: "HyperConverged (HCI)",
    desc: "HyperConverged Infrastructure integrates compute, storage, networking and virtualization into a single, software-driven solution. We deliver HCI deployments that simplify management while dramatically reducing operational costs.",
  },
];

export default function ITServices() {
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">IT Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              We offer a full suite of services to enhance your Information Storage & Management portfolio — designed
              to keep your infrastructure running 24×7×365.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">Services We Offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all"
                data-testid={`offering-${i}`}
              >
                <div className="p-3 bg-primary/10 rounded-xl inline-block mb-4">{o.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{o.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Solutions Detail */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">IT Solutions</h2>
          <div className="space-y-6">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8"
                data-testid={`solution-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-3 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10 border-y border-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to enhance your IT infrastructure?</h2>
          <p className="text-muted-foreground mb-8">Talk to our experts and get a customized solution for your business.</p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto" data-testid="btn-contact-it">
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
