// import { DataBlockProps } from "@/lib/userProfile/information";
// import { useFetchCounts } from "@/lib/userProfile/information";

// const DataBlock = ({ number, text, color }: DataBlockProps) => (
//     <div className="flex flex-col items-center relative">
//         <div className="font-bold text-sm font-khFont absolute text-center whitespace-nowrap">
//             {text}
//         </div>
//         <div className={`h-3 w-3 ${color} rounded-sm mt-6`}></div>
//         <div className="font-bold text-base w-4 flex justify-center">{number}</div>
//     </div>
// );

// const Dashboard = () => {
//     const { counts, loading } = useFetchCounts();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="grid grid-cols-2 gap-4">
//             <DataBlockPink number={counts.like} text="Likes" />
//             <DataBlockBlue number={counts.content} text="Content" />
//             <DataBlockGreen number={counts.forum} text="Forum" />
//             <DataBlockYellow number={counts.comment} text="Comments" />
//             <DataBlockPurple number={counts.answer} text="Answers" />
//         </div>
//     );
// };

// // Usage examples with colors already passed in the specific components
// const DataBlockPink = (props: Omit<DataBlockProps, "color">) => (
//     <DataBlock {...props} color="bg-pink-500" />
// );

// const DataBlockBlue = (props: Omit<DataBlockProps, "color">) => (
//     <DataBlock {...props} color="bg-blue-500" />
// );

// const DataBlockGreen = (props: Omit<DataBlockProps, "color">) => (
//     <DataBlock {...props} color="bg-green-600" />
// );

// const DataBlockYellow = (props: Omit<DataBlockProps, "color">) => (
//     <DataBlock {...props} color="bg-orange-400" />
// );

// const DataBlockPurple = (props: Omit<DataBlockProps, "color">) => (
//     <DataBlock {...props} color="bg-purple-600" />
// );

// export { Dashboard, DataBlockPink, DataBlockBlue, DataBlockGreen, DataBlockYellow, DataBlockPurple };
import { DataBlockProps } from "@/lib/userProfile/information";
import { useFetchCounts } from "@/lib/userProfile/information";

const DataBlock = ({ number, text, color }: DataBlockProps) => (
  <div className="flex flex-col items-center relative">
    <div className="font-bold text-sm font-khFont absolute text-center whitespace-nowrap">
      {text}
    </div>
    <div className={`h-3 w-3 ${color} rounded-sm mt-6`} />
    <div className="font-bold text-base w-4 flex justify-center">{number}</div>
  </div>
);

const Dashboard = () => {
  const { counts, loading } = useFetchCounts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!counts) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <DataBlockPink number={counts.like} text="Likes" />
      <DataBlockBlue number={counts.content} text="Content" />
      <DataBlockGreen number={counts.forum} text="Forum" />
      <DataBlockYellow number={counts.comment} text="Comments" />
      <DataBlockPurple number={counts.answer} text="Answers" />
    </div>
  );
};

// Usage examples with colors already passed in the specific components
const DataBlockPink = (props: Omit<DataBlockProps, "color">) => (
  <DataBlock {...props} color="bg-pink-500" />
);

const DataBlockBlue = (props: Omit<DataBlockProps, "color">) => (
  <DataBlock {...props} color="bg-blue-500" />
);

const DataBlockGreen = (props: Omit<DataBlockProps, "color">) => (
  <DataBlock {...props} color="bg-green-600" />
);

const DataBlockYellow = (props: Omit<DataBlockProps, "color">) => (
  <DataBlock {...props} color="bg-orange-400" />
);

const DataBlockPurple = (props: Omit<DataBlockProps, "color">) => (
  <DataBlock {...props} color="bg-purple-600" />
);

export { Dashboard, DataBlockPink, DataBlockBlue, DataBlockGreen, DataBlockYellow, DataBlockPurple };
