import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login before accessing your properties" />
    }

    const properties = await getListings({userId: currentUser.id});

    if(!properties) {
        return <EmptyState title="You don't have any listed properties yet" subtitle="Put one on rent today" />
      }

    if(properties.length === 0) {
        return <EmptyState title="No properties found" subtitle="Put one on rent today." />
    }

    return (
        <PropertiesClient properties={properties} currentUser={currentUser} />
     );
}
 
export default PropertiesPage;