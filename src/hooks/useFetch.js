import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const result = await response.json();
        setEmployees(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchData();
  }, [url]);

  return { employees, loading, error };
};

export default useFetch;
