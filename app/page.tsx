import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const listings = await getListings();

  // in the case where user has selected some specific criteria to meet and we don't have any listings available, then display EmptyState component
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="
         pt-24
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
            listing.title
            // <ListingCard
            //   key={listing.id}
            //   data={listing}
            // />
          )
        })}
      </div>
    </Container>
  );
}
