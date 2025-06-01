import ClassifiedCard from "./components/inventory/classified-card";
import ClassifiedList from "./components/inventory/classified-list";

const InventoryMain = ({
  count,
  classifieds,
}: {
  count: number;
  classifieds: any;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-800">Inventory Main</h2>
      <p className="text-lg font-medium text-emerald-600">
        Inventory Count: {count}
      </p>
      <div className="grid grid-cols-1">
        <ClassifiedList classifieds={classifieds} />
      </div>
    </div>
  );
};

export default InventoryMain;
