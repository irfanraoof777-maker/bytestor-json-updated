import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Server,
  Zap,
  Activity,
  Network,
  Camera,
  AlertCircle,
  Users,
  Phone,
  Mail,
  Building2,
  CalendarDays,
} from "lucide-react";
import Layout from "@/components/Layout";
import {
  previewInventory,
  generateRunbook,
  downloadBlob,
  safeFilename,
  type InventoryPreview,
} from "@/lib/api";

// ---------- Constants ----------

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".xlsx", ".xls"];

const STEPS = [
  { id: 1, label: "Details" },
  { id: 2, label: "Upload" },
  { id: 3, label: "Preview" },
  { id: 4, label: "Generate" },
];

// ---------- Types ----------

interface OrgDetails {
  orgName: string;
  contactName: string;
  email: string;
  industry: string;
  locations: string;
  backupPlatform: string;
  storagePlatform: string;
  expectedRPO: string;
  expectedRTO: string;
  criticalApps: string;
}

interface ExpertForm {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  meetingDate: string;
  consent: boolean;
}

// ---------- Input class ----------

const inputCls =
  "w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";

const labelCls = "block text-sm font-medium text-foreground mb-1.5";

// ---------- Helpers ----------

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFile(file: File): string | null {
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return `Invalid file type. Please upload an Excel file (.xlsx or .xls).`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`;
  }
  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---------- Progress stepper ----------

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step.id < current
                  ? "bg-primary text-primary-foreground"
                  : step.id === current
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {step.id < current ? <CheckCircle2 className="w-4 h-4" /> : step.id}
            </div>
            <span
              className={`mt-2 text-xs font-medium hidden sm:block ${
                step.id === current ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-2 transition-colors ${
                step.id < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- Preview stat cards ----------

function PreviewCards({ data }: { data: InventoryPreview }) {
  const cards = [
    { label: "Total VMs", value: data.total_vms, icon: <Server className="w-5 h-5 text-primary" /> },
    { label: "Powered On", value: data.powered_on, icon: <Zap className="w-5 h-5 text-green-500" /> },
    { label: "Powered Off", value: data.powered_off, icon: <Activity className="w-5 h-5 text-muted-foreground" /> },
    { label: "Hosts", value: data.hosts, icon: <Building2 className="w-5 h-5 text-primary" /> },
    { label: "Clusters", value: data.clusters, icon: <Users className="w-5 h-5 text-primary" /> },
    { label: "Health Warnings", value: data.health_warnings, icon: <AlertTriangle className="w-5 h-5 text-amber-500" /> },
    { label: "Network Entries", value: data.network_entries, icon: <Network className="w-5 h-5 text-primary" /> },
    { label: "Snapshot Entries", value: data.snapshot_entries, icon: <Camera className="w-5 h-5 text-purple-500" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            {c.icon}
            <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {c.value !== undefined ? c.value : "—"}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Expert Review Modal ----------

function ExpertReviewModal({
  prefill,
  onClose,
}: {
  prefill: Pick<OrgDetails, "orgName" | "contactName" | "email">;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ExpertForm>({
    orgName: prefill.orgName,
    contactName: prefill.contactName,
    email: prefill.email,
    phone: "",
    notes: "",
    meetingDate: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<ExpertForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ExpertForm, string>> = {};
    if (!form.orgName.trim()) errs.orgName = "Required";
    if (!form.contactName.trim()) errs.contactName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!validateEmail(form.email)) errs.email = "Enter a valid email address";
    if (!form.consent) errs.consent = "You must agree before submitting";
    setErrors(errs as Partial<ExpertForm>);
    return Object.keys(errs).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-5" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Request Received</h3>
            <p className="text-muted-foreground mb-6">
              Thank you, {form.contactName}. A ByteStor specialist will be in touch within 1–2 business days.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">Request Expert Review</h2>
              <p className="text-sm text-muted-foreground">
                A ByteStor DR specialist will review your runbook and follow up with recommendations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="er-orgName">
                  Organisation Name *
                </label>
                <input
                  id="er-orgName"
                  name="orgName"
                  type="text"
                  value={form.orgName}
                  onChange={change}
                  className={inputCls}
                  placeholder="Your organisation"
                />
                {errors.orgName && <p className="text-red-500 text-xs mt-1">{errors.orgName}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="er-contactName">
                  Contact Name *
                </label>
                <input
                  id="er-contactName"
                  name="contactName"
                  type="text"
                  value={form.contactName}
                  onChange={change}
                  className={inputCls}
                  placeholder="Your name"
                />
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="er-email">
                  <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email *</span>
                </label>
                <input
                  id="er-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  className={inputCls}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="er-phone">
                  <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />Phone</span>
                </label>
                <input
                  id="er-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  className={inputCls}
                  placeholder="+91 ..."
                />
              </div>
            </div>

            <div>
              <label className={labelCls} htmlFor="er-meetingDate">
                <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />Preferred Meeting Date</span>
              </label>
              <input
                id="er-meetingDate"
                name="meetingDate"
                type="date"
                value={form.meetingDate}
                onChange={change}
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls} htmlFor="er-notes">Notes</label>
              <textarea
                id="er-notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={change}
                className={`${inputCls} resize-none`}
                placeholder="Any specific concerns, environments, or requirements..."
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={change}
                  className="mt-1 accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  I consent to ByteStor contacting me regarding this DR review request. *
                </span>
              </label>
              {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              Submit Request
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

// ---------- Main assessment page ----------

export default function DRCopilotAssessment() {
  const [step, setStep] = useState(1);

  // Step 1 – org details
  const [org, setOrg] = useState<OrgDetails>({
    orgName: "",
    contactName: "",
    email: "",
    industry: "",
    locations: "",
    backupPlatform: "",
    storagePlatform: "",
    expectedRPO: "",
    expectedRTO: "",
    criticalApps: "",
  });
  const [orgErrors, setOrgErrors] = useState<Partial<OrgDetails>>({});

  // Step 2 – file upload
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 – preview
  const [preview, setPreview] = useState<InventoryPreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [previewLoadingMsg, setPreviewLoadingMsg] = useState("");

  // Step 4 – generate
  const [agreed, setAgreed] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [generatedFilename, setGeneratedFilename] = useState("");

  // Expert review modal
  const [showExpert, setShowExpert] = useState(false);

  // ── Org form validation ──
  const validateOrg = (): boolean => {
    const errs: Partial<OrgDetails> = {};
    if (!org.orgName.trim()) errs.orgName = "Organisation name is required";
    if (!org.contactName.trim()) errs.contactName = "Contact name is required";
    if (!org.email.trim()) errs.email = "Business email is required";
    else if (!validateEmail(org.email)) errs.email = "Enter a valid email address";
    setOrgErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const changeOrg = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrg((prev) => ({ ...prev, [name]: value }));
    setOrgErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── File handling ──
  const handleFileSelect = useCallback((selected: File) => {
    setFileError("");
    const err = validateFile(selected);
    if (err) {
      setFileError(err);
      return;
    }
    setFile(selected);
    setPreview(null);
    setPreviewError("");
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFileSelect(dropped);
    },
    [handleFileSelect]
  );

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  // ── Preview Environment ──
  const handlePreview = async () => {
    if (!file) return;
    setPreviewError("");
    setPreviewLoading(true);

    const msgs = ["Reading RVTools inventory...", "Analyzing infrastructure..."];
    let msgIdx = 0;
    setPreviewLoadingMsg(msgs[0]);
    const msgInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % msgs.length;
      setPreviewLoadingMsg(msgs[msgIdx]);
    }, 2000);

    try {
      const data = await previewInventory(file);
      setPreview(data);
      setStep(3);
    } catch (err) {
      setPreviewError(err instanceof Error ? err.message : "Preview failed. Please try again.");
    } finally {
      clearInterval(msgInterval);
      setPreviewLoading(false);
      setPreviewLoadingMsg("");
    }
  };

  // ── Generate runbook ──
  const handleGenerate = async () => {
    if (!file || !agreed || generating) return;
    setGenerateError("");
    setGenerating(true);

    const genMsgs = [
      "Generating disaster recovery runbook...",
      "Analyzing infrastructure...",
      "Preparing PDF...",
    ];
    let genIdx = 0;
    const genInterval = setInterval(() => {
      genIdx = (genIdx + 1) % genMsgs.length;
    }, 3000);

    try {
      const blob = await generateRunbook(file);
      const filename = `${safeFilename(org.orgName || "Organisation")}_DR_Runbook.pdf`;
      setPdfBlob(blob);
      setGeneratedFilename(filename);
      downloadBlob(blob, filename);
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      clearInterval(genInterval);
      setGenerating(false);
    }
  };

  const handleDownloadAgain = () => {
    if (pdfBlob && generatedFilename) {
      downloadBlob(pdfBlob, generatedFilename);
    }
  };

  const handleStartNew = () => {
    setStep(1);
    setOrg({ orgName: "", contactName: "", email: "", industry: "", locations: "", backupPlatform: "", storagePlatform: "", expectedRPO: "", expectedRTO: "", criticalApps: "" });
    setOrgErrors({});
    setFile(null);
    setFileError("");
    setPreview(null);
    setPreviewError("");
    setAgreed(false);
    setGenerateError("");
    setPdfBlob(null);
    setGeneratedFilename("");
  };

  // ── Render ──
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-primary opacity-10 blur-[80px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
            DR Copilot by ByteStor
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            DR Readiness Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete the form below to generate your AI-assisted disaster recovery runbook.
          </p>
        </div>
      </section>

      {/* Form area */}
      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepIndicator current={step} />

          <AnimatePresence mode="wait">
            {/* ── STEP 1: Org details ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-foreground mb-6">Organisation Details</h2>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} htmlFor="orgName">Organisation Name *</label>
                        <input
                          id="orgName" name="orgName" type="text"
                          value={org.orgName} onChange={changeOrg}
                          className={inputCls} placeholder="Acme Corporation"
                          data-testid="input-orgName"
                        />
                        {orgErrors.orgName && <p className="text-red-500 text-xs mt-1">{orgErrors.orgName}</p>}
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="contactName">Contact Name *</label>
                        <input
                          id="contactName" name="contactName" type="text"
                          value={org.contactName} onChange={changeOrg}
                          className={inputCls} placeholder="Jane Smith"
                          data-testid="input-contactName"
                        />
                        {orgErrors.contactName && <p className="text-red-500 text-xs mt-1">{orgErrors.contactName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="email">Business Email *</label>
                      <input
                        id="email" name="email" type="email"
                        value={org.email} onChange={changeOrg}
                        className={inputCls} placeholder="jane@company.com"
                        data-testid="input-email"
                      />
                      {orgErrors.email && <p className="text-red-500 text-xs mt-1">{orgErrors.email}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} htmlFor="industry">Industry</label>
                        <select
                          id="industry" name="industry"
                          value={org.industry} onChange={changeOrg}
                          className={inputCls}
                          data-testid="select-industry"
                        >
                          <option value="">Select industry</option>
                          <option>Banking & Finance</option>
                          <option>Healthcare</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                          <option>Government</option>
                          <option>Technology</option>
                          <option>Logistics</option>
                          <option>Education</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="locations">Number of Locations</label>
                        <input
                          id="locations" name="locations" type="number" min="1"
                          value={org.locations} onChange={changeOrg}
                          className={inputCls} placeholder="e.g. 3"
                          data-testid="input-locations"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} htmlFor="backupPlatform">Backup Platform</label>
                        <input
                          id="backupPlatform" name="backupPlatform" type="text"
                          value={org.backupPlatform} onChange={changeOrg}
                          className={inputCls} placeholder="e.g. Veeam, Commvault"
                          data-testid="input-backupPlatform"
                        />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="storagePlatform">Storage Platform</label>
                        <input
                          id="storagePlatform" name="storagePlatform" type="text"
                          value={org.storagePlatform} onChange={changeOrg}
                          className={inputCls} placeholder="e.g. NetApp, Pure Storage"
                          data-testid="input-storagePlatform"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} htmlFor="expectedRPO">Expected RPO</label>
                        <input
                          id="expectedRPO" name="expectedRPO" type="text"
                          value={org.expectedRPO} onChange={changeOrg}
                          className={inputCls} placeholder="e.g. 4 hours"
                          data-testid="input-rpo"
                        />
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="expectedRTO">Expected RTO</label>
                        <input
                          id="expectedRTO" name="expectedRTO" type="text"
                          value={org.expectedRTO} onChange={changeOrg}
                          className={inputCls} placeholder="e.g. 8 hours"
                          data-testid="input-rto"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls} htmlFor="criticalApps">Critical Applications</label>
                      <textarea
                        id="criticalApps" name="criticalApps"
                        rows={3}
                        value={org.criticalApps} onChange={changeOrg}
                        className={`${inputCls} resize-none`}
                        placeholder="List your most critical workloads, e.g. ERP, core banking, patient management..."
                        data-testid="textarea-criticalApps"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => { if (validateOrg()) setStep(2); }}
                      className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                      data-testid="btn-next-step1"
                    >
                      Continue to Upload <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Upload ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-foreground mb-2">Upload RVTools Export</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Export your VMware inventory from RVTools as an Excel file (.xlsx or .xls, max {MAX_FILE_SIZE_MB} MB) and upload it below.
                  </p>

                  {/* Drop zone */}
                  <div
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : file
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    data-testid="drop-zone"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={onFileInput}
                      className="hidden"
                      data-testid="input-file"
                    />
                    {file ? (
                      <div className="flex flex-col items-center gap-3">
                        <FileSpreadsheet className="w-12 h-12 text-primary" />
                        <div>
                          <p className="font-semibold text-foreground">{file.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{formatBytes(file.size)}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); setPreviewError(""); }}
                          className="text-xs text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
                          data-testid="btn-remove-file"
                        >
                          <X className="w-3.5 h-3.5" /> Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-12 h-12 text-muted-foreground" />
                        <div>
                          <p className="font-semibold text-foreground">
                            {dragActive ? "Drop your file here" : "Drag & drop your RVTools export"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            or click to browse — .xlsx / .xls, up to {MAX_FILE_SIZE_MB} MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {fileError && (
                    <div className="flex items-start gap-2 mt-3 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {fileError}
                    </div>
                  )}

                  {previewError && (
                    <div className="flex items-start gap-2 mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Preview failed</p>
                        <p className="mt-0.5">{previewError}</p>
                      </div>
                    </div>
                  )}

                  {previewLoading && (
                    <div className="flex items-center gap-3 mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary text-sm">
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      <span>{previewLoadingMsg}</span>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                      data-testid="btn-back-step2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={handlePreview}
                      disabled={!file || previewLoading}
                      className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="btn-preview"
                    >
                      {previewLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                      ) : (
                        <>Preview Environment <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Preview ── */}
            {step === 3 && preview && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-card border border-border rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Environment Preview</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {file?.name} — parsed successfully
                      </p>
                    </div>
                  </div>

                  <PreviewCards data={preview} />

                  <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      This preview is an automated parse of your RVTools export. Values are subject to
                      change in the full report based on AI-assisted analysis.
                    </p>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                      data-testid="btn-back-step3"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                      data-testid="btn-continue-step3"
                    >
                      Continue to Generate <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Generate ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {pdfBlob ? (
                  // Success state
                  <div className="bg-card border border-border rounded-2xl p-10 text-center">
                    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-5" />
                    <h2 className="text-2xl font-bold text-foreground mb-3">Report Generated Successfully</h2>
                    <p className="text-muted-foreground mb-2">
                      Your DR runbook has been downloaded as:
                    </p>
                    <p className="font-semibold text-foreground mb-8 text-sm bg-secondary rounded-lg px-4 py-2 inline-block">
                      {generatedFilename}
                    </p>

                    <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3 mb-8 text-left">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        <span className="font-semibold">Important: </span>
                        This report is an AI-assisted draft. All findings, recovery priorities, RPO/RTO values,
                        and recommendations must be reviewed and approved by qualified infrastructure and
                        business stakeholders before production use.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={handleDownloadAgain}
                        className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
                        data-testid="btn-download-again"
                      >
                        <Download className="w-4 h-4" /> Download PDF Again
                      </button>
                      <button
                        onClick={() => setShowExpert(true)}
                        className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                        data-testid="btn-request-review"
                      >
                        <Users className="w-4 h-4" /> Request Expert Review
                      </button>
                      <button
                        onClick={handleStartNew}
                        className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all"
                        data-testid="btn-start-new"
                      >
                        Start New Assessment
                      </button>
                    </div>
                  </div>
                ) : (
                  // Confirmation state
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">Confirm & Generate</h2>

                    {/* Org summary */}
                    <div className="bg-secondary/50 rounded-xl p-5 mb-6">
                      <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                        Organisation Summary
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        {[
                          { label: "Organisation", value: org.orgName },
                          { label: "Contact", value: org.contactName },
                          { label: "Email", value: org.email },
                          org.industry && { label: "Industry", value: org.industry },
                          org.expectedRPO && { label: "Expected RPO", value: org.expectedRPO },
                          org.expectedRTO && { label: "Expected RTO", value: org.expectedRTO },
                        ]
                          .filter(
                            (row): row is { label: string; value: string } =>
                              typeof row === "object" && row !== null
                          )
                          .map((row, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-muted-foreground min-w-[90px]">{row.label}:</span>
                              <span className="text-foreground font-medium">{row.value}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Inventory summary */}
                    {preview && (
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                          Inventory Summary
                        </h3>
                        <PreviewCards data={preview} />
                      </div>
                    )}

                    {/* File info */}
                    {file && (
                      <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl mb-6">
                        <FileSpreadsheet className="w-5 h-5 text-primary shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-foreground">{file.name}</p>
                          <p className="text-muted-foreground">{formatBytes(file.size)}</p>
                        </div>
                      </div>
                    )}

                    {/* Disclaimer + checkbox */}
                    <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl mb-6">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                          DR Copilot generates an AI-assisted draft based on supplied infrastructure data. All findings,
                          recovery priorities, RPO values, RTO values, and recommendations must be reviewed and approved
                          by qualified infrastructure and business stakeholders before production use.
                        </p>
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 accent-primary"
                          data-testid="checkbox-agree"
                        />
                        <span className="text-sm text-foreground font-medium">
                          I understand this report is an AI-assisted draft and requires administrator review.
                        </span>
                      </label>
                    </div>

                    {generateError && (
                      <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-sm mb-6">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Generation failed</p>
                          <p className="mt-0.5">{generateError}</p>
                        </div>
                      </div>
                    )}

                    {generating && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary text-sm mb-6">
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        <span>Generating disaster recovery runbook...</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        onClick={() => setStep(3)}
                        disabled={generating}
                        className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-all flex items-center gap-2 disabled:opacity-50"
                        data-testid="btn-back-step4"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={!agreed || generating}
                        className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="btn-generate"
                      >
                        {generating ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                        ) : (
                          <><Download className="w-4 h-4" /> Generate DR Assessment</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Expert review modal */}
      <AnimatePresence>
        {showExpert && (
          <ExpertReviewModal
            prefill={{ orgName: org.orgName, contactName: org.contactName, email: org.email }}
            onClose={() => setShowExpert(false)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
