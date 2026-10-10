import PublicRoute from './components/router/publicRoute'
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
    <>
    <NextUIProvider>
      <PublicRoute />
    </NextUIProvider>
    </>
  );
}

export default App;
