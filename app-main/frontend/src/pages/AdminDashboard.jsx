export default function AdminDashboard() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">Total Users: 124</div>
        <div className="card">Total Analyses: 892</div>
        <div className="card">AI Requests: 3,214</div>
      </div>
    </div>
  );
}
