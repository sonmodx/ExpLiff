import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const initialLiff = async () => {
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID,
      });
      /*
      NOTE:
      You can't use liff.login() in a LIFF browser, as it's automatically executed when liff.init() is executed.
      */

      // login call, only when external browser or LINE's in-app browser is used
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }

      const profile = await liff.getProfile();
      setUser({
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      });
    };
    initialLiff();
  }, []);

  const handleLogout = () => {
    // logout call only when external browse or LINE's in-app browser is used
    liff.logout();
    liff.closeWindow();
  };

  const openExternal = () => {
    liff.openWindow({
      url: "https://line.me",
      external: true,
    });
  };

  const openExternalInLine = () => {
    liff.openWindow({
      url: "https://line.me",
      external: false,
    });
  };

  const sendMassiveMsg = async () => {
    const flushMessage = () => {
      const tenMessage = Array.from({ length: 2 }).fill({
        type: "text",
        text: "I LOVE U",
      });
      return tenMessage;
    };
    try {
      const res = await liff.sendMessages(flushMessage);
    } catch (err) {
      console.log("error :", err);
    }
  };

  return (
    <div className="App">
      <h1>create-liff-app</h1>

      <img src={user.pictureUrl} alt="profile" height="200px" width="200px" />
      <h2>Name : {user.displayName}</h2>
      <h4>UserId: {user.userId}</h4>
      <p>Status: {user.statusMessage}</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <button onClick={openExternalInLine}></button>
      <br />
      <button onClick={openExternal}></button>
      <br />
      <a href="https://github.com/vitejs/vite/issues/15010">github</a>

      <button onClick={sendMassiveMsg}>Send massive msg</button>
    </div>
  );
}

export default App;
