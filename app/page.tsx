import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({
  searchParams
}: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(!listings) {
    return <EmptyState title="No listings available right now" subtitle="Check back later!" />
  }

  // in the case where user has selected some specific criteria to meet and we don't have any listings available, then display EmptyState component
  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div
        className="
         pt-[4.5rem]
         grid
         grid-cols-1
         sm:grid-cols-2
         md:grid-cols-3
         lg:grid-cols-4
         xl:grid-cols-5
         2xl:grid-cols-6
         gap-8
      "
      >
        {listings.map((listing) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  );
}
