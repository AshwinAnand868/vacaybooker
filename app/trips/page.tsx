import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips found"
        subtitle="Looks like you haven't reserved any trip yet. You can do so in your dashboard when you feel like."
      />
    );
  }

  return (
    <TripsClient
        reservations={reservations}
        currentUser={currentUser}
    />
  )
};

export default TripsPage;