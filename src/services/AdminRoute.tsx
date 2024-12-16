import { useEffect, useState } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  // if (user?.role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default AdminRoute;
