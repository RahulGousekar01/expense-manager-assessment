import "./globals.css";
import "antd/dist/reset.css";
import ReduxProvider from "../store/provider";

export const metadata = {
  title: "SpendTrack",
  description: "Multi-Currency Expense Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
