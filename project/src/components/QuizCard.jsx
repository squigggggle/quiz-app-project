import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const QuizCard = (props) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>Difficulty: {props.difficulty}</CardDescription>
          <CardDescription>Type: {props.type}</CardDescription>
        </CardHeader>
        <CardContent>
          {props.category}
        </CardContent>
        <CardFooter>
            <ul>
                <li>Starts: {props.startdate}</li>
                <li>Ends: {props.enddate}</li>
            </ul>
        </CardFooter>
      </Card>
    </>
  );
};

export default QuizCard;