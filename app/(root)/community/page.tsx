import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const result = await getAllUsers({});
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-10 flex w-full flex-col gap-6">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <NoResult
            title="There’s no user to show"
            description="Be the first to break the silence! 🚀 SignUp and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/sign-up"
            linkTitle="Sign Up"
          />
        )}
      </section>
    </>
  );
};

export default Page;
