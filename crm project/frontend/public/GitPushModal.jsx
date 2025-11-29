import React, { useState } from "react";
import API from "../services/api";

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modal = { background: "#fff", padding: 16, borderRadius: 8, minWidth: 420, boxSizing: "border-box" };
const input = { width: "100%", padding: 8, margin: "8px 0", borderRadius: 6, border: "1px solid #e6e9ef" };

export default function GitPushModal({ onClose }) {
  const [owner, setOwner] = useState("your-gh-username");
  const [repo, setRepo] = useState("repo");
  const [path, setPath] = useState("acore-file.txt");
  const [content, setContent] = useState("Hello from Acore CRM");
  const [token, setToken] = useState("");
  const [resp, setResp] = useState(null);

  async function push() {
    const base64 = btoa(content);
    try {
      const r = await API.post("/github/push-file", { owner, repo, path, message: "Add via Acore CRM", contentBase64: base64, token });
      setResp(r.data);
    } catch (e) {
      setResp(e?.response?.data || { error: "Failed" });
    }
  }

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h4 style={{ marginTop: 0 }}>Push file to GitHub</h4>
        <input style={input} value={owner} onChange={(e) => setOwner(e.target.value)} />
        <input style={input} value={repo} onChange={(e) => setRepo(e.target.value)} />
        <input style={input} value={path} onChange={(e) => setPath(e.target.value)} />
        <textarea style={{ ...input, height: 120 }} value={content} onChange={(e) => setContent(e.target.value)} />
        <input style={input} placeholder="Personal access token (optional)" value={token} onChange={(e) => setToken(e.target.value)} />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button style={{ padding: "8px 12px", borderRadius: 8 }} onClick={push}>
            Push
          </button>
          <button style={{ padding: "8px 12px", borderRadius: 8 }} onClick={onClose}>
            Close
          </button>
        </div>
        {resp && <pre style={{ marginTop: 8, background: "#0f172a", color: "white", padding: 8, borderRadius: 6 }}>{JSON.stringify(resp, null, 2)}</pre>}
      </div>
    </div>
  );
}