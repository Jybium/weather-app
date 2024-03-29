import Image from "next/image";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <main className=" justify-between">
      
      <Weather/>
    </main>
  );
}
