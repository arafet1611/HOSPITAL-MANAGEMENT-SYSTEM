import { useState } from "react";
import { BiSolidUpArrow } from "react-icons/bi";
import { useQuery } from '@apollo/client';
import { GET_DOCTORS_BY_SERVICE } from '../../../graphQl/queries/doctorQuery';

const CustomCellEditor = ({ value, onChange, NumberOfValues, service, role }) => {
  const [selectedNames, setSelectedNames] = useState(
    value ? value.split(", ") : []
  );

  const { loading, error, data } = useQuery(GET_DOCTORS_BY_SERVICE, {
    variables: { ServiceId: service },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelect = (event) => {
    const selectedName = event.target.value;
    if (selectedNames.length < NumberOfValues) {
      if (
        !selectedNames.includes(selectedName) &&
        data.doctorsByService.find(
          (doc) => doc.employee.firstname + " " + doc.employee.lastname === selectedName
        )
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
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  return (
    <div className="container my-3 bg-light">
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
          {data.doctorsByService
            .filter((doc) => capitalizeFirstLetter(doc.Type) === capitalizeFirstLetter(role))
            .map((doc, index) => (
              <option
                key={index}
                value={doc.employee.firstname + " " + doc.employee.lastname}
              />
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
              className="bg-danger text-white small p-1 border-0 rounded"
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
