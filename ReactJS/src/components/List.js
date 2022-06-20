import Card from "./Card";

// props:
//   data: consists of data records to be rendered
const List = ({ data }) => (
  data ? (<div className="list">
    {/* Your code goes here */}
    {/* Render the Card with required props here */}
    {data.records?.map((match, index) => (
      <Card
        key={index}
        _id={match._id}
        index={index + 1}
        count={data.count}
        venue={match.venue}
        team1={match.team1}
        team2={match.team2}
        date={match.date}
      ></Card>
    ))}
  </div>) : null
);


export default List;