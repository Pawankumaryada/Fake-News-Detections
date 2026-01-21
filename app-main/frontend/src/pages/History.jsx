import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";

export default function History() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`${API}/history/${user.email}`)
      .then((res) => setItems(res.data))
      .catch(() => console.error("History load failed"));
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Analysis History</h1>

      {items.length === 0 ? (
        <p>No history yet</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="border p-4 rounded cursor-pointer hover:bg-slate-50"
              onClick={() => navigate(`/analysis/${item.id}`)}
            >
              <p className="font-semibold truncate">{item.input_text}</p>
              <p className="text-sm text-slate-500">
                Verdict: {item.final_label} | {new Date(item.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
