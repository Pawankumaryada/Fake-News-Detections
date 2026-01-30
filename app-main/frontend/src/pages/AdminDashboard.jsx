import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not logged in");
      return;
    }

    fetch("https://fake-news-backend-xom8.onrender.com/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(data => setStats(data.data))
      .catch(() => setError("Access denied"));
  }, []);

  if (error) {
    return <div className="text-red-500 p-10">{error}</div>;
  }

  if (!stats) {
    return <div className="p-10 text-white">Loading admin data...</div>;
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Users" value={stats.total_users} />
        <Card title="Analyses" value={stats.total_analyses} />
        <Card title="AI Requests" value={stats.ai_requests} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white/10 p-6 rounded-lg">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
