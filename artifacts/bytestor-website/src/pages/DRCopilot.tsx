import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Server,
  ShieldAlert,
  ListOrdered,
  ClipboardCheck,
  FileText,
  Users,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Replace this with your actual sample PDF URL when ready.
 * e.g. "https://cdn.bytestor.in/samples/dr-copilot-sample-runbook.pdf"
 */
const SAMPLE_REPORT_URL = "";

const FEATURES = [
  {
    icon: <Server className="w-8 h-8 text-primary" />,
    title: "VMware Inventory Analysis",
    desc: "Automatically parses your RVTools export to catalogue every VM, host, cluster, datastore, and network segment — giving you a complete picture of your VMware environment in seconds.",
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-primary" />,
    title: "Infrastructure Risk Detection",
    desc: "Identifies configuration gaps, single points of failure, unsupported VM versions, snapshot accumulation, and other risks that could compromise your ability to recover.",
  },
  {
    icon: <ListOrdered className="w-8 h-8 text-primary" />,
    title: "Recovery Tier Generation",
    desc: "Automatically assigns each workload to a recovery tier — Critical, High, Medium, or Low — based on dependencies, resource profiles, and business context you provide.",
  },
  {
    icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    title: "Disaster Recovery Checklist",
    desc: "Produces an actionable DR readiness checklist aligned to your environment, covering pre-failover validation, failover sequencing, and post-recovery verification steps.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Audit-Friendly PDF Report",
    desc: "Generates a structured, professionally formatted runbook PDF you can share with infrastructure teams, management, and auditors — ready for review and sign-off.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Optional ByteStor Expert Review",
    desc: "Request a hands-on review from ByteStor's DR specialists to validate findings, refine recovery priorities, and build a tailored DR strategy for your business.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Export from RVTools",
    desc: "Run RVTools against your vCenter and export the default Excel workbook. No additional configuration needed.",
  },
  {
    step: "02",
    title: "Upload and Preview",
    desc: "Upload the Excel file to DR Copilot. The tool instantly parses your VMware inventory and surfaces a summary of VMs, hosts, clusters, and health indicators.",
  },
  {
    step: "03",
    title: "Generate Your Runbook",
    desc: "Confirm your organisation details and let the AI generate a tiered recovery runbook, risk analysis, and DR checklist — delivered as a downloadable PDF.",
  },
  {
    step: "04",
    title: "Review and Refine",
    desc: "Share the draft with your team. Optionally request a ByteStor expert review to validate and refine the recommendations before production use.",
  },
];

export default function DRCopilot() {
  const handleSampleReport = () => {
    if (SAMPLE_REPORT_URL) {
      window.open(SAMPLE_REPORT_URL, "_blank", "noopener,noreferrer");
    } else {
      alert("Sample report coming soon. Check back shortly.");
    }
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="relative py-28 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary opacity-15 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <ShieldAlert className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wide">DR Copilot by ByteStor</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
              Know your recovery gaps{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                before an outage.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
              Upload an RVTools export to receive an AI-assisted disaster recovery readiness
              assessment, infrastructure risk analysis, tiered recovery sequence, and recovery runbook.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dr-copilot/assessment">
                <button
                  className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                  data-testid="btn-start-assessment"
                >
                  Start Assessment <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button
                onClick={handleSampleReport}
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                data-testid="btn-view-sample"
              >
                View Sample Report <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              What DR Copilot Does
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              A complete DR readiness picture, automatically
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              DR Copilot analyses your VMware inventory and turns it into actionable recovery intelligence —
              without requiring manual spreadsheet work or consulting engagement to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-card border border-border p-7 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/40 transition-all group"
              >
                <div className="mb-5 p-3 bg-primary/10 rounded-xl inline-block group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              From RVTools export to DR runbook in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="text-5xl font-black text-primary/10 mb-4 leading-none">{step.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 text-border">
                    <ArrowRight className="w-6 h-6 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases / audience ── */}
      <section className="py-20 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                Who Is It For
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight">
                Built for VMware environments that can't afford downtime
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                DR Copilot is designed for infrastructure teams, storage and backup administrators,
                and IT managers who are responsible for disaster recovery planning in VMware environments.
              </p>
              <ul className="space-y-4">
                {[
                  "Infrastructure and storage teams running vSphere / vCenter",
                  "Organisations preparing for DR audits or compliance reviews",
                  "IT managers who need board-ready DR documentation quickly",
                  "Backup administrators validating recovery tier assignments",
                  "ByteStor clients seeking a first-pass DR readiness baseline",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">What's in your runbook</h3>
              <div className="space-y-5">
                {[
                  { label: "Executive Summary", desc: "High-level DR posture and key risk indicators for leadership review." },
                  { label: "VM Inventory Table", desc: "Full catalogued list of VMs with host, cluster, power state, and tier assignment." },
                  { label: "Risk Register", desc: "Identified configuration gaps and vulnerabilities with severity ratings." },
                  { label: "Tiered Recovery Sequence", desc: "Ordered failover sequence by tier — Critical first, then High, Medium, Low." },
                  { label: "DR Checklist", desc: "Pre-failover, failover, and post-recovery checklists ready for operational use." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 pb-5 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-1">{item.label}</div>
                      <div className="text-muted-foreground text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sample report section ── */}
      <section className="py-20 bg-background" id="sample-report">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Sample DR Runbook</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              See what a DR Copilot report looks like before running your own assessment.
              {SAMPLE_REPORT_URL
                ? " Download the sample PDF to review structure, content, and format."
                : " A sample report will be available here shortly. Check back soon."}
            </p>
            <button
              onClick={handleSampleReport}
              className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all inline-flex items-center gap-2"
              data-testid="btn-sample-report-section"
            >
              {SAMPLE_REPORT_URL ? (
                <>View Sample Report <ExternalLink className="w-4 h-4" /></>
              ) : (
                <>Coming Soon</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary/5 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Ready to assess your DR readiness?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your RVTools export and receive an AI-assisted DR runbook in minutes.
              No account required.
            </p>
            <Link href="/dr-copilot/assessment">
              <button
                className="px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-lg shadow-primary/25 text-lg"
                data-testid="btn-cta-start"
              >
                Start Your Assessment <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="py-10 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 items-start bg-secondary/60 border border-border rounded-xl p-5 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Disclaimer: </span>
              DR Copilot generates an AI-assisted draft based on supplied infrastructure data. All findings,
              recovery priorities, RPO values, RTO values, and recommendations must be reviewed and approved
              by qualified infrastructure and business stakeholders before production use. This tool does not
              perform actual recovery, failover, backup, or compliance certification.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
