import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api/members";
const UPLOADS = "http://localhost:5000/uploads";

function ViewMembers() {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(API);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load members. Make sure the backend is running.");
      setMembers([]);
    }
  };

  if (members === null) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">Loading...</p>
        </div>
        <div className="members-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="skeleton-card" key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                <div className="skeleton skeleton-circle" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-line skeleton-line-medium" style={{ marginBottom: "8px" }} />
                  <div className="skeleton skeleton-line skeleton-line-short" />
                </div>
              </div>
              <div className="skeleton skeleton-btn" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">
            {members.length} member{members.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to="/add" className="btn btn-primary">
          Add Member
        </Link>
      </div>

      {error && (
        <div style={{ padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", color: "#991b1b", fontSize: "0.88rem", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {members.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-state-icon">AT</div>
          <h3>No members yet</h3>
          <p>Add your first teammate to get started.</p>
          <Link to="/add" className="btn btn-primary">
            Add Member
          </Link>
        </div>
      ) : (
        <div className="members-grid">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

function MemberCard({ member }) {
  const initials = member.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const imageUrl = member.image ? `${UPLOADS}/${member.image}` : null;

  return (
    <div className="member-card">
      <div className="member-card-top">
        {imageUrl ? (
          <img src={imageUrl} alt={member.name} className="member-avatar" />
        ) : (
          <div className="member-avatar-fallback">{initials}</div>
        )}
        <div className="member-info">
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      </div>

      <div className="member-email">{member.email}</div>

      <Link to={`/members/${member._id}`} className="btn btn-outline">
        View Details
      </Link>
    </div>
  );
}

export default ViewMembers;
