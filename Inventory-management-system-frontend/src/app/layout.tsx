// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { CurrencyProvider } from "../contexts/CurrencyContext";
// import { ThemeProvider } from '../contexts/ThemeContext';
// import AnimatedBackground from '../components/AnimatedBackground';
// import AnimatedBackgroundLight from '../components/AnimatedBackgroundLight';
// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Web Your Vyavsay - Inventory Management System",
//   description: "Modern inventory management system for your business",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider>
//           <CurrencyProvider>
//             <AnimatedBackground />
//             <AnimatedBackgroundLight />
//             <div className="relative z-10">
//               {children}
//             </div>
//           </CurrencyProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "../contexts/CurrencyContext";
import { ThemeProvider } from '../contexts/ThemeContext';
// import AnimatedBackground from '../components/AnimatedBackground';
// import AnimatedBackgroundLight from '../components/AnimatedBackgroundLight';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Your Vyavsay - Inventory Management System",
  description: "Modern inventory management system for your business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
