import { auth } from "../firebase/firebase";

export default function Home() {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}
