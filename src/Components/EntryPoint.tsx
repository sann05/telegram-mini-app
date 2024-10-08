import { useState, useEffect } from "react";
import styles from "../App.module.scss";
import { updateUserCoins, getUser, clearDB } from "../Database/db";
import Leaderboard from "./Leaderboard/Leaderboard";
import {
  UserOutlined,
  TrophyOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import buttonSvg from "../assets/button.png";
import moneySvg from "../assets/money.png";
import { useIsConnectionRestored } from "@tonconnect/ui-react";
import { Address } from "./Address";
import { Header } from "./Header";
import Loader from 'react-ts-loaders'




function App() {
  const [coinCount, setCoinCount] = useState<number>(0);
  const selectedCountry = "Poland";
  const [userId, setUserId] = useState<string>("");
  const [currentView, setCurrentView] = useState<string>("coin");
  const connectionRestored = useIsConnectionRestored();

  useEffect(() => {
    const initializeApp = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        const user = await getUser(storedUserId);
        if (user) {
          setCoinCount(user.coins);
        }
      } else {
        const newUserId = "You";
        localStorage.setItem("userId", newUserId);
        setUserId(newUserId);
      }
    };

    initializeApp();
  }, []);

  const handleButtonClick = async () => {
    const newCoinCount = coinCount + 1;
    setCoinCount(newCoinCount);
    if (userId && selectedCountry) {
      await updateUserCoins(userId, newCoinCount);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("userId");
    await clearDB(); // Clear the IndexedDB database
    setCoinCount(0);
    setUserId("");
    setCurrentView("coin");
  };

  const renderContent = () => {
    if (currentView === "coin") {
      return (
        <div>
          <div className={styles.score}>
            <img src={moneySvg} alt="money" className={styles.scoreImg} />
            <h1>{coinCount}</h1>
          </div>
          <img
            src={buttonSvg}
            alt="Click to earn coins"
            className={styles.clickButton}
            onClick={handleButtonClick}
          />
        </div>
      );
    }

    if (currentView === "leaderboard") {
      return <Leaderboard />;
    }

    return null;
  };
  if (!connectionRestored) {
    console.log("Connection is not restored");
    return (
      <Loader/>
    );
  }

  return (
    <div className={styles.app}>
      <Header />
      <Address />
      <div>{renderContent()}</div>
      <div className={styles.menu}>
        <Button
          ghost
          className={styles.btn}
          onClick={() => setCurrentView("coin")}
          shape="circle"
          icon={<UserOutlined className={styles.icon} />}
        />
        <Button
          ghost
          className={`${styles.btn} ${styles.invisible}`}
          onClick={handleLogout}
          shape="circle"
          icon={<LogoutOutlined className={styles.icon} />}
        />
        <Button
          ghost
          className={styles.btn}
          onClick={() => setCurrentView("leaderboard")}
          shape="circle"
          icon={<TrophyOutlined className={styles.icon} />}
        />
      </div>
    </div>
  );
}

export default App;
