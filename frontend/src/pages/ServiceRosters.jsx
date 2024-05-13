import ServerSelector from "../components/HR/serviceRoster/ServerSelector";
import ServiceRoster from "../components/HR/serviceRoster/ServiceRoster";
import { useState } from "react";
function ServiceRosters() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [searchTerm, setSearchTerm] = useState({
    service: "",
  });
  const handleFiltrer = (values) => {
    setSearchTerm(values);
  };
  return (
    <div className="container py-5">
      <ServerSelector
        selectedService={selectedService}
        setSelectedService={handleServiceChange}
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
        onFilter = {handleFiltrer}
      />
      <ServiceRoster
        filters={searchTerm}
        selectedService={selectedService}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default ServiceRosters;