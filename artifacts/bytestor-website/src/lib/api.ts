/**
 * DR Copilot API configuration.
 *
 * Set VITE_API_BASE_URL in your Replit environment secrets to point to your
 * FastAPI backend, e.g. https://your-api.example.com
 *
 * The Anthropic API key is never exposed here — it lives only in your FastAPI backend.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";

// ---------- Types ----------

export interface InventoryPreview {
  total_vms?: number;
  powered_on?: number;
  powered_off?: number;
  hosts?: number;
  clusters?: number;
  health_warnings?: number;
  network_entries?: number;
  snapshot_entries?: number;
  [key: string]: unknown;
}

// ---------- Helpers ----------

function requireBaseUrl(): void {
  if (!API_BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not configured. " +
        "Add it to your Replit environment secrets and restart the dev server."
    );
  }
}

/** Sanitize a string for safe use in a filename. */
export function safeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_\- ]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 60);
}

/** Trigger a browser file download from a Blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------- API calls ----------

/**
 * POST /api/preview-inventory
 * Accepts an RVTools Excel file and returns an inventory summary.
 */
export async function previewInventory(file: File): Promise<InventoryPreview> {
  requireBaseUrl();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/preview-inventory`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Server responded with ${res.status} ${res.statusText}`);
  }

  const data: unknown = await res.json();
  if (!data || typeof data !== "object") {
    throw new Error("Invalid response from preview endpoint.");
  }
  return data as InventoryPreview;
}

/**
 * POST /api/generate-runbook-pdf
 * Accepts an RVTools Excel file and returns a PDF blob.
 */
export async function generateRunbook(file: File): Promise<Blob> {
  requireBaseUrl();
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/generate-runbook-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Server responded with ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("pdf") && !contentType.includes("octet-stream")) {
    throw new Error(
      "The server did not return a PDF file. Report generation may have failed."
    );
  }

  const blob = await res.blob();
  if (!blob || blob.size === 0) {
    throw new Error("The generated PDF is empty. Please try again.");
  }
  return blob;
}
