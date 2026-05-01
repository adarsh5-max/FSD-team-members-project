import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import MemberForm from "../components/MemberForm";

const API = "http://localhost:5000/api/members";
const UPLOADS = "http://localhost:5000/uploads";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const res = await axios.get(`${API}/${id}`);
      setMember(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load member");
      setMember(null);
    }
  };

  const handleSubmit = async (data, imageFile) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("email", data.email);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await axios.put(`${API}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate(`/members/${id}`);
  };

  if (member === undefined) {
    return (
      <div className="page-container-sm">
        <div className="back-link">Back to details</div>
        <div className="card">
          <div className="card-body">
            <div className="skeleton" style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "20px" }} />
            <div className="skeleton skeleton-line" style={{ marginBottom: "12px" }} />
            <div className="skeleton skeleton-line" style={{ marginBottom: "12px" }} />
            <div className="skeleton skeleton-line" />
          </div>
        </div>
      </div>
    );
  }

  if (member === null) {
    return (
      <div className="page-container-sm">
        <Link to="/members" className="back-link">Back to members</Link>
        <div className="empty-state">
          <div className="empty-state-icon">?</div>
          <h3>Member not found</h3>
          <p>{error || "This member may have been removed."}</p>
          <Link to="/members" className="btn btn-primary">
            Browse Members
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = member.image ? `${UPLOADS}/${member.image}` : null;

  return (
    <div className="page-container-sm">
      <Link to={`/members/${id}`} className="back-link">
        Back to details
      </Link>

      <div className="card">
        <div className="card-body">
          <h1 className="page-title" style={{ marginBottom: "4px" }}>
            Edit member
          </h1>
          <p className="page-subtitle" style={{ marginBottom: "28px" }}>
            Update the details below.
          </p>

          <MemberForm
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            initial={{
              name: member.name,
              role: member.role,
              email: member.email,
              imageUrl: imageUrl,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditMember;
