import { motion } from "framer-motion";
import { Link } from "wouter";
import { Target, Eye, Compass, Mail, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const pillars = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Our Values",
    desc: "Committed to our clients, providing quality yet cost-effective service. We value our team and pride ourselves in working with integrity and ethics.",
  },
  {
    icon: <Eye className="w-8 h-8 text-primary" />,
    title: "Our Vision",
    desc: "To establish a footprint as the most esteemed entity and deliver services to achieve utmost customer satisfaction.",
  },
  {
    icon: <Compass className="w-8 h-8 text-primary" />,
    title: "Our Mission",
    desc: "To deliver proficient and valuable services to our clients by utilizing industry best standards and create long-term and sustainable shareholder value.",
  },
];

export default function KnowUs() {
  return (
    <Layout>
      {/* Page Hero */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Who We Are</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">Know Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              ByteStor Information Technology Services LLP (BITS) is an IT Consultancy and Services company based in Hyderabad, India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Body */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Our Team = Our Strength
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With a team of dedicated, passionate and experienced professionals from various IT Domain proficiency and
                diversified backgrounds, we enable delivery of quality services in line with industry standards.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our values are deeply ingrained in being committed to our clients, providing quality yet cost-effective
                service. We value our team and pride ourselves in working with integrity and ethics.
              </p>
              <Link href="/services">
                <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2" data-testid="btn-explore-services">
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-1 gap-4">
              {pillars.map((p, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start" data-testid={`pillar-${i}`}>
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">{p.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employment */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Employment Opportunities</h2>
            <blockquote className="text-muted-foreground italic text-lg mb-8 border-l-4 border-primary pl-4 text-left max-w-2xl mx-auto">
              "When you eat fruit, think of the person who planted the tree."
            </blockquote>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              BITS is an equal opportunity believing organization and committed to provide a platform to talented, focused
              and hard working individuals irrespective of their cultural, educational and gender background.
            </p>
            <a
              href="mailto:info@bytestor.in"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              data-testid="btn-send-resume"
            >
              <Mail className="w-5 h-5" /> Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
