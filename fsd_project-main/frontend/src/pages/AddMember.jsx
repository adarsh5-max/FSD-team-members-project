import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import MemberForm from "../components/MemberForm";

const API = "http://localhost:5000/api/members";

function AddMember() {
  const navigate = useNavigate();

  const handleSubmit = async (data, imageFile) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("email", data.email);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await axios.post(API, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/members");
  };

  return (
    <div className="page-container-sm">
      <Link to="/members" className="back-link">
        Back to members
      </Link>

      <div className="card">
        <div className="card-body">
          <h1 className="page-title" style={{ marginBottom: "4px" }}>
            Add a team member
          </h1>
          <p className="page-subtitle" style={{ marginBottom: "28px" }}>
            Fill in the details below to add someone to the roster.
          </p>

          <MemberForm onSubmit={handleSubmit} submitLabel="Add Member" />
        </div>
      </div>
    </div>
  );
}

export default AddMember;
