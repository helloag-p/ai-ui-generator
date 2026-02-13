import Button from "./ui/Button";
import Card from "./ui/Card";
import Navbar from "./ui/Navbar";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Table from "./ui/Table";
import Sidebar from "./ui/Sidebar";
import Chart from "./ui/Chart";

const COMPONENT_WHITELIST = [
  "Button",
  "Card",
  "Navbar",
  "Modal",
  "Input",
  "Table",
  "Sidebar",
  "Chart"
];

const componentMap = {
  Button,
  Card,
  Navbar,
  Modal,
  Input,
  Table,
  Sidebar,
  Chart
};

export default function Renderer({ layout }) {
  if (!Array.isArray(layout)) {
    console.warn("Invalid layout format");
    return null;
  }

 return (
  <div className="flex flex-col gap-6 w-full animate-fadeIn">
    {layout.map((item, index) => {
      if (!COMPONENT_WHITELIST.includes(item.type)) {
        console.warn("Blocked unknown component:", item.type);
        return null;
      }

      const Component = componentMap[item.type];

      if (!Component) {
        console.warn("Component not found in map:", item.type);
        return null;
      }

      return (
        <div key={index} className="w-full">
          <Component {...item.props} />
        </div>
      );
    })}
  </div>
);

}

