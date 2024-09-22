import "./App.css";
import CandlWrapper from "./components/CandleWrapper";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <CandlWrapper />
      </div>
    </div>
  );
};
export default App;
