import { useState, useRef, useEffect } from "react";

function MemberForm({ onSubmit, submitLabel, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [role, setRole] = useState(initial?.role || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(initial?.imageUrl || null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!role.trim()) errs.role = "Role is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Invalid email format";
    return errs;
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setBusy(true);
    try {
      await onSubmit({ name: name.trim(), role: role.trim(), email: email.trim() }, imageFile);
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const initials = name
    .trim()
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "?";

  return (
    <form onSubmit={handleSubmit}>
      <div className="image-upload">
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <div className="image-preview-placeholder">{initials}</div>
        )}
        <div className="upload-controls">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="file-input-hidden"
            onChange={handleFile}
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => fileRef.current?.click()}
            style={{ fontSize: "0.82rem", padding: "8px 16px" }}
          >
            {preview ? "Change image" : "Upload image"}
          </button>
          {imageFile && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setImageFile(null);
                setPreview(initial?.imageUrl || null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              style={{ fontSize: "0.8rem", marginTop: "4px" }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name</label>
        <input
          id="name"
          className="form-input"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
        {errors.name && <small style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.name}</small>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="role">Role</label>
        <input
          id="role"
          className="form-input"
          type="text"
          placeholder="Frontend Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          maxLength={100}
          required
        />
        {errors.role && <small style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.role}</small>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email / Contact</label>
        <input
          id="email"
          className="form-input"
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          required
        />
        {errors.email && <small style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{errors.email}</small>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={busy} style={{ width: "100%" }}>
        {busy ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default MemberForm;
