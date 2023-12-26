import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import HomeFilters from "@/components/home/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";


// const questions= [
//   {
//     _id: "1",
//     title: "cascading Deletes in SQLAlchemy?",
//     questionToTags: [
//       { questionId: "1", tagId: "1", tag: { id: "1", name: "python" } },
//       { questionId: "1", tagId: "2", tag: { id: "2", name: "sql" } },
//     ],
//     author: {
//       id: "author1",
//       name: "John Doe",
//       avatar: "john-doe.jpg",
//     },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2021-09-01T12:00:00.000Z"),
//   },
//   {
//     _id: "2",
//     title: "How to center a div?",
//     questionToTags: [
//       { questionId: "2", tagId: "3", tag: { id: "3", name: "javascript" } },
//       { questionId: "2", tagId: "4", tag: { id: "4", name: "css" } },
//     ],
//     author: {
//       id: "author2",
//       name: "Rajeev Singh",
//       avatar: "rajeev-singh.jpg",
//     },
//     upvotes: 17,
//     views: 349,
//     answers: [],
//     createdAt: new Date("2022-07-01T12:00:00.000Z"),
//   },
// ];



export default async function Home() {

  const result = await getQuestions({});
  
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
