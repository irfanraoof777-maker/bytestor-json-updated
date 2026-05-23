import { motion } from "framer-motion";
import { Link } from "wouter";
import { Server, Briefcase, BookOpen, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";

const services = [
  {
    icon: <Server className="w-12 h-12 text-primary" />,
    title: "IT Services",
    href: "/services/it-services",
    desc: "We offer a comprehensive suite of IT solutions to enhance Information Storage & Management portfolio — from Data Monitoring and Backup to High Availability Clustering and Disaster Recovery.",
    highlights: ["Storage Consolidation", "Backup & Recovery", "High Availability / Clustering", "Disaster Recovery", "HyperConverged (HCI)"],
  },
  {
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    title: "Consulting",
    href: "/services/consulting",
    desc: "Our Consultancy Services are designed based on proven best practices and industry standards to deliver expert quality. With a talent pool of highly qualified and certified consultants we deliver optimal value.",
    highlights: ["Vendor Neutral Consultancy", "Storage Assessment & Design", "Disaster Recovery Architecture", "Business Continuity Planning", "IT / Cloud Assessments"],
  },
  {
    icon: <BookOpen className="w-12 h-12 text-primary" />,
    title: "Training",
    href: "/services/training",
    desc: "100+ Corporate trainers pool available with more than 15+ years experience in the Information Technology domain, specializing in EMC, NetApp, CommVault, Veritas and more.",
    highlights: ["Instructor-Led Training (ILT)", "Online Training", "Workshop & eLearning", "Storage Technologies", "Backup / Recovery Software"],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">What We Do</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              At BITS we develop IT strategy, design and use industry best practices to ensure that your Infrastructure
              and business critical Applications/Databases run 24×7×365 without downtime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:border-primary/40 transition-all"
                data-testid={`service-card-${idx}`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <div className="p-4 bg-primary/10 rounded-xl inline-block mb-6">{service.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                    <Link href={service.href}>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all" data-testid={`btn-service-${idx}`}>
                        Learn More <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Highlights</h3>
                    <ul className="space-y-3">
                      {service.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-center gap-3 text-foreground">
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
