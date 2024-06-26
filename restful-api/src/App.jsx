import InfoCard from "./InfoCard";
import { apiData } from "./lib/apiData";

const App = () => {
  return (
    <>
      {apiData.map((api, index) => (
        <InfoCard
          key={index}
          title={api.title}
          description={api.description}
          method={api.method}
          url={api.url}
          requestBody={api.requestBody}
          responseBody={api.responseBody}
        />
      ))}
    </>
  );
};

export default App;
