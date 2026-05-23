import { motion } from "framer-motion";
import { Link } from "wouter";
import { Monitor, Users, Laptop, Presentation, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const methods = [
  {
    icon: <Presentation className="w-8 h-8 text-primary" />,
    title: "Instructor-Led Training (ILT)",
    desc: "Classroom-style training led by certified instructors with hands-on labs and real-world scenario exercises.",
  },
  {
    icon: <Monitor className="w-8 h-8 text-primary" />,
    title: "Online Training",
    desc: "Flexible online sessions that allow your team to learn at their own pace from anywhere in the world.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Workshops",
    desc: "Intensive, focused workshops on specific technologies or challenges, designed for rapid skill development.",
  },
  {
    icon: <Laptop className="w-8 h-8 text-primary" />,
    title: "eLearning",
    desc: "Self-paced digital learning modules with interactive content, assessments and certifications.",
  },
];

const technologies = [
  "Operating Systems — All Platforms",
  "Networking Technologies — Basic to Advanced",
  "Storage Technologies",
  "Backup / Recovery Software",
  "High Availability / Disaster Recovery",
  "Information & Storage Management",
  "EMC Technologies",
  "NetApp Technologies",
  "CommVault",
  "Veritas NetBackup",
  "Veritas Cluster Server",
];

export default function Training() {
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
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Training</h1>
            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              100+ Corporate trainers pool available with more than 15+ years experience in the Information Technology
              domain. Training sessions delivered to clients in India and across the Middle East & Africa region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-primary/10 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "100+", label: "Corporate Trainers" },
              { value: "15+", label: "Years Avg. Experience" },
              { value: "600+", label: "Trainings Delivered" },
              { value: "20K+", label: "Students Trained" },
            ].map((s, i) => (
              <div key={i} data-testid={`training-stat-${i}`}>
                <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">Training Methods</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {methods.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all"
                data-testid={`method-${i}`}
              >
                <div className="p-3 bg-primary/10 rounded-xl inline-block mb-4">{m.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">Technologies We Cover</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="bg-card border border-border rounded-xl px-5 py-4 flex items-center gap-3"
                data-testid={`tech-${i}`}
              >
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-foreground text-sm font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/10 border-y border-primary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to upskill your team?</h2>
          <p className="text-muted-foreground mb-8">Contact us to schedule a training session tailored to your organization's needs.</p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 mx-auto" data-testid="btn-contact-training">
              Enquire Now <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
