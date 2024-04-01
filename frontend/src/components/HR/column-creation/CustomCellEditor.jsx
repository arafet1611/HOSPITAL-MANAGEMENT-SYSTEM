import { useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";

const CustomCellEditor = ({ value, onChange, NumberOfValues }) => {
  const [selectedNames, setSelectedNames] = useState(
    value ? value.split(", ") : []
  );
  const dummyData = [
    { name: "arafet alaya", role: "assistant(e)" },
    { name: "meryem chabbi", role: "senior" },
    { name: "farouk ben salem", role: "interne" },
    { name: "salim dahwaz", role: "interne" },
    { name: "ghazi belhadj", role: "senior" },
  ];
  const handleSelect = (event) => {
    const selectedName = event.target.value;
    if (selectedNames.length < NumberOfValues) {
      if (
        !selectedNames.includes(selectedName) &&
        dummyData.find((data) => data.name === selectedName)
      ) {
        setSelectedNames([...selectedNames, selectedName]);
        event.target.value = "";
      }
    }
  };
  const handleDeselect = (name) => {
    setSelectedNames(selectedNames.filter((n) => n !== name));
  };
  const handleSave = () => {
    onChange(selectedNames.join(", "));
  };

  return (
    <div className="container my-3  bg-light">
      <BiSolidUpArrow
        style={{
          marginTop: "-20px",
          marginLeft: "75px",
          justifyContent: "center",
          position: "fixed",
        }}
      />

      <div className="mb-3">
        <input
          list="nameOptions"
          className="form-control form-control-sm mb-3"
          placeholder="Select Name"
          onChange={handleSelect}
        />
        <datalist id="nameOptions">
          {dummyData.map((data, index) => (
            <option key={index} value={data.name} />
          ))}
        </datalist>
      </div>
      <div>
        {selectedNames.map((name, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <div className="me-auto">
              <strong>{name}</strong>
            </div>
            <button
              className="badge text-danger "
              onClick={() => handleDeselect(name)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-outline-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CustomCellEditor;
