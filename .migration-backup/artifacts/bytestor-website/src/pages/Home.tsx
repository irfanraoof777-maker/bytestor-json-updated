import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Server, BookOpen, Briefcase, ChevronRight, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <>{count}</>;
};

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section id="home" className="relative min-h-[calc(100dvh-80px)] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              We build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                digital experiences.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              We collaborate with smart and creative people to build global talent on emerging technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/know-us">
                <button
                  className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                  data-testid="btn-get-started"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/services">
                <button
                  className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all"
                  data-testid="btn-our-services"
                >
                  Our Services
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 30, suffix: "+", label: "Years Of Experience" },
              { value: 20, suffix: "+", label: "Certifications" },
              { value: 600, suffix: "+", label: "Trainings Delivered" },
              { value: 20, suffix: "K+", label: "Students" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center"
                data-testid={`stat-${idx}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <CountUp end={stat.value} />{stat.suffix}
                </div>
                <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">What We Do</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              We Solve Creative Delusions Efficiently
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At BITS we develop IT strategy, design and use industry best practices to ensure that your Infrastructure
              and business critical Applications/Databases run 24×7×365 without downtime. Our strategies are focused
              to address your business growth and future roadmap which will achieve Lower Total Cost of Ownership and
              meet SLAs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Server className="w-10 h-10 text-primary" />,
                title: "IT Services",
                href: "/services/it-services",
                desc: "Storage Consolidation, Backup & Recovery, High Availability/Clustering, Disaster Recovery, and HyperConverged (HCI) solutions.",
              },
              {
                icon: <Briefcase className="w-10 h-10 text-primary" />,
                title: "Consulting",
                href: "/services/consulting",
                desc: "Consultancy Services designed based on proven best practices and industry standards to deliver expert quality to clients.",
              },
              {
                icon: <BookOpen className="w-10 h-10 text-primary" />,
                title: "Training",
                href: "/services/training",
                desc: "100+ corporate trainers with 15+ years experience. ILT, Online Training, Workshop & eLearning across IT domains.",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/50 transition-all group"
                data-testid={`card-service-${idx}`}
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-xl inline-block group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">{service.desc}</p>
                <Link href={service.href} className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors">
                  View More <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8">Ready to work together?</h2>
          <p className="text-primary-foreground/80 text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss how ByteStor can help stabilize and scale your enterprise infrastructure.
          </p>
          <Link href="/contact">
            <button
              className="px-10 py-5 bg-background text-foreground font-bold text-lg rounded-xl hover:scale-105 transition-transform shadow-xl"
              data-testid="btn-contact-cta"
            >
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
