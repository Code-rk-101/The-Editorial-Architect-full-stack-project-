import { UseInterview } from "../../interview/hooks/useInterview";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Procted = ({ children, Skeleton }) => {
  const { loading, user } = useAuth();
  // const interview = UseInterview();

  if (loading ) {
    return (
      <main>
        {Skeleton }
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/auth"} />;
  }

  return children
};

export default Procted;
