import "@/styles/globals.css";
import ReactQueryClientProvider from "@/utils/query-client";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "@/utils/ClientProvider";
import { getServerSession } from "next-auth";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <ReactQueryClientProvider>
      <Provider session={session}>
        <html suppressHydrationWarning>
          <body
            className={`flex flex-col min-h-screen`}
          >
            <main>
              {children}
            </main>
          </body>
        </html>
      </Provider>
    </ReactQueryClientProvider>
  );
}
