import React from "react";
import '@styles/global.css'
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "PRMPTY",
    description: "Propmts for you",
};

const RootLayout = ({children}: { children: React.ReactNode }
    ) => {
        return (
            <html lang="en">
            <body>
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>
                <Nav/>
                <main className="app">{children}</main>
            </Provider>
            </body>
            </html>

        );
    }
;

export default RootLayout;
