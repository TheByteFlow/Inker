import { useEffect } from "react";
import { Button } from "./components/ui/button";

function App() {
  useEffect(() => {
    async function DataFetcher() {
      const rawResponse = await fetch(`http://localhost:3000`);
      const jsonResponse = await rawResponse.json();
      console.log(jsonResponse);
      /*
      @muhammedsirajudeen
      Although its inside the container just call directly to localhost 
      */
    }
    DataFetcher();
  }, []);
  return (
    <>
    <div className="pl-3">

      <Button>Click me</Button>
    </div>
      INKER
    </>
  );
}

export default App;
