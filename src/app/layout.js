import { Poppins} from "next/font/google";
import "./globals.css";

const inter = Poppins({ subsets: ["latin"] , weight:"400"});

export const metadata = {
  title: "Weather Update",
  description: "Take control over your movement with real time weather update",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
