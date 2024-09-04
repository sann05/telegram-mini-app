import { TonConnectUIProvider } from "@tonconnect/ui-react";
import EntryPoint from "./Components/EntryPoint";

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://telegram-mini-app-phi-nine.vercel.app/tonconnect-manifest.json"
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/zombietrainbot",
      }}
    >
      <EntryPoint />
    </TonConnectUIProvider>
  );
}

export default App;
