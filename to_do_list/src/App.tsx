import Header from "./components/Header";
import Content from "./components/Content";
import "./index.css";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main className="w-screen h-screen flex flex-col gap-2 sm:w-3/4 sm:m-auto ">
      <Header />
      <Content />
      <Footer />
    </main>
  );
};

export default App;
