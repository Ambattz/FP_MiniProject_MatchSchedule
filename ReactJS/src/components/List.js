import Card from "./Card";

// props:
//   data: consists of data records to be rendered
const List = ({ data, onEditHandler, onDeleteHandler }) => (
  data ? (<div className="list">
    {/* Your code goes here */}
    {/* Render the Card with required props here */}
    {data.records?.map((match, index) => (
      <Card key={index} index={index + 1} count={data.count} {...match} onEditHandler={(id) => onEditHandler(id)} onDeleteHandler={(id) => onDeleteHandler(id)}></Card>
    ))}
  </div>) : null
);


export default List;