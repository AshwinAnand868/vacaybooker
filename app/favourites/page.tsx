import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import EmptyState from "../components/EmptyState";
import FavouritesClient from "./FavouritesClient";

const FavouritesPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState title="Unauthorized" subtitle="Please login before accessing your favorite listings" />
    }

    if(currentUser.favouriteIds.length === 0) {
        return <EmptyState title="No favourites found" subtitle="Save some listings that you really like and don't want to miss!!!" />
    }

    const userFavListings = await getFavouriteListings();

  return (
    <FavouritesClient listings={userFavListings} currentUser={currentUser} />
  )
}

export default FavouritesPage;