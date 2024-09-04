import styles from "../App.module.scss";
import { TonConnectButton } from "@tonconnect/ui-react";

export const Header = () => {
  return (
    <header>
      <TonConnectButton className={styles.tonButton} />
    </header>
  );
};
