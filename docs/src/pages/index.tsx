import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import CandlWrapper from "../components/CandlBackground/CandlBackground";

import { useColorMode } from "@docusaurus/theme-common";

function HomepageHeader() {
  const { colorMode } = useColorMode();

  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 5,
          backgroundColor: colorMode === "dark" ? "#00000090" : "#ffffff90",
        }}
      />
      <CandlWrapper />
      <div
        className="container"
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          height: "fit-content",
          padding: "20px 20px 20px 20px",
          borderRadius: "10px",
        }}
      >
        <img
          src="img/candl_logo.png"
          width={"100%"}
          alt="Candl"
          style={{ marginBottom: "4rem", opacity: 0.75 }}
        />
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Quick Start - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Documentation of Candl"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
