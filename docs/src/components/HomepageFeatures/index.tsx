import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  emoji: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    emoji: "🤙",
    description: (
      <>
        A Plug & Play solution that lets you get started quickly and
        effortlessly.
      </>
    ),
  },
  {
    title: "Fully Customizable",
    emoji: "🛠️",
    description: (
      <>
        Every visible component is fully customizable. You can also hide
        elements for complete flexibility.
      </>
    ),
  },
  {
    title: "Multi-Layered Canvas",
    emoji: "⚡",
    description: (
      <>
        Rendering is optimized through a multi-layered canvas structure,
        ensuring smooth performance.
      </>
    ),
  },
];

function Feature({ title, emoji, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <p style={{ fontSize: "50px" }}>{emoji}</p>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
