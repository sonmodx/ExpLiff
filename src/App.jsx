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
    liff.logout();
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>create-liff-app</h1>

      <img src={user.pictureUrl} alt="profile" height="200px" width="200px" />
      <h2>Name : {user.displayName}</h2>
      <h4>UserId: {user.userId}</h4>
      <p>Status: {user.statusMessage}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
