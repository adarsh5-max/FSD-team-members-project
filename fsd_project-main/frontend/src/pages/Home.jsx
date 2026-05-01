import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-badge">
          <span className="home-badge-dot" />
          Student team directory
        </div>

        <h1 className="home-title">
          Meet <span>A Team</span>
        </h1>

        <p className="home-subtitle">
          A clean, simple directory to showcase our teammates, their roles, and
          how to reach them. Add new members, browse the roster, and keep
          everyone connected.
        </p>

        <div className="home-actions">
          <Link to="/add" className="btn btn-primary btn-lg">
            Add Member
          </Link>
          <Link to="/members" className="btn btn-outline btn-lg">
            View Members
          </Link>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h3>Add teammates</h3>
          <p>Capture name, role, contact info, and a profile photo in seconds.</p>
        </div>
        <div className="feature-card">
          <h3>Browse roster</h3>
          <p>View every member from one clean dashboard with card layout.</p>
        </div>
        <div className="feature-card">
          <h3>View details</h3>
          <p>Click on any member to see their full profile and contact info.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
