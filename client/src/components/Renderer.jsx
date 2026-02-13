import Button from "./ui/Button";
import Card from "./ui/Card";
import Navbar from "./ui/Navbar";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Table from "./ui/Table";
import Sidebar from "./ui/Sidebar";
import Chart from "./ui/Chart";

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
  if (!Array.isArray(layout)) return null;

  const navItems = layout.filter(item => item.type === "Navbar");
  const cardItems = layout.filter(item => item.type === "Card");
  const otherItems = layout.filter(
    item => item.type !== "Navbar" && item.type !== "Card"
  );

  return (
    <div className="space-y-8">

      {/* Navbar Section */}
      {navItems.map((item, i) => {
        const Component = componentMap[item.type];
        return <Component key={`nav-${i}`} {...item.props} />;
      })}

      {/* Cards in Grid */}
      {cardItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cardItems.map((item, i) => {
            const Component = componentMap[item.type];
            return <Component key={`card-${i}`} {...item.props} />;
          })}
        </div>
      )}

      {/* Other Components */}
      {otherItems.map((item, i) => {
        const Component = componentMap[item.type];
        if (!Component) return null;
        return <Component key={`other-${i}`} {...item.props} />;
      })}

    </div>
  );
}
