import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const newsItems = [
  {
    date: "October 2016",
    title: "ByteStor IT Services celebrates expansion with new office in Visakhapatnam",
    desc: "ByteStor IT Services (BITS) marks a significant milestone with the opening of its new branch office in Visakhapatnam, expanding its reach to better serve clients across South India.",
    category: "Company News",
  },
  {
    date: "March 2016",
    title: "BITS Successfully delivers its 1st Consultancy project on SDS Platform to a leading Managed Service Provider in India",
    desc: "ByteStor IT Services successfully completes its first Software-Defined Storage (SDS) consultancy project, delivering a comprehensive storage architecture solution to one of India's leading Managed Service Providers.",
    category: "Milestone",
  },
  {
    date: "November 2015",
    title: "ByteStor IT Services broadens portfolio with Veritas Technologies",
    desc: "BITS announces a strategic partnership with Veritas Technologies, expanding its service portfolio to include Veritas NetBackup, Veritas Cluster Server and related enterprise storage management solutions.",
    category: "Partnership",
  },
];

const categoryColors: Record<string, string> = {
  "Company News": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Milestone": "bg-green-500/10 text-green-400 border-green-500/20",
  "Partnership": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function News() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Latest Updates</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6">News</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay up to date with the latest milestones, partnerships, and announcements from ByteStor IT Services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {newsItems.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/40 transition-all"
                data-testid={`news-item-${i}`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-16 bg-secondary/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Stay Connected</h2>
          <p className="text-muted-foreground mb-8">
            Follow ByteStor IT Services on LinkedIn for the latest news, insights and updates from our team.
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
            data-testid="btn-linkedin"
          >
            Follow on LinkedIn <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
