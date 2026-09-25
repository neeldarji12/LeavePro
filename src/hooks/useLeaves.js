import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export default function useLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/leave-requests");
      setLeaves(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeaves();
  }, [loadLeaves]);

  return { leaves, loading, reload: loadLeaves };
}