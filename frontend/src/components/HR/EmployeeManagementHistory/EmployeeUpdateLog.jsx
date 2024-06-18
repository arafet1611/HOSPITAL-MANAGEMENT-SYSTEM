import React, { useEffect, useState } from "react";
import EmployeeModification from "./EmployeeModification";
import axios from "axios";

function EmployeeUpdateLog({ filters }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [Modifications, setModifications] = useState([]);
  const [serviceTitles, setServiceTitles] = useState({});
  const { employeeName, startDate, endDate } = filters;

  // Fetching modification history
  useEffect(() => {
    const fetchModificationHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/modifications"
        );
        console.log("modification", response.data);
        setModifications(response.data);
      } catch (err) {
        console.error("Error fetching requestHistory:", err);
      }
    };
    fetchModificationHistory();
  }, []);

  useEffect(() => {
    let filtered = Modifications;

    if (employeeName) {
      filtered = filtered.filter((data) =>
        data.employeeName.toLowerCase().includes(employeeName.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((data) => {
        const changeDate = new Date(data.changeDate);
        return changeDate >= startDate && changeDate <= endDate;
      });
    }

    setFilteredData(filtered);
  }, [employeeName, startDate, endDate, Modifications]);

  // Fetching service titles
  useEffect(() => {
    const fetchAllTitles = async () => {
      const titlePromises = filteredData.map(async (data) => {
        const titles = await fetchTitles(
          data.valueBeforeModification,
          data.valueAfterModification
        );
        return { id: data.id, ...titles };
      });

      const titles = await Promise.all(titlePromises);
      const titlesMap = {};
      titles.forEach(({ id, beforeTitle, afterTitle }) => {
        titlesMap[id] = { beforeTitle, afterTitle };
      });

      setServiceTitles(titlesMap);
    };

    if (filteredData.length > 0) {
      fetchAllTitles();
    }
  }, [filteredData]);

  const fetchTitles = async (beforeId, afterId) => {
    try {
      const responseBefore = await axios.get(
        `http://localhost:5000/api/services/${beforeId}`
      );

      const responseAfter = await axios.get(
        `http://localhost:5000/api/services/${afterId}`
      );
      console.log("before", responseBefore.data, "after", responseAfter.data);
      return {
        beforeTitle: responseBefore.data.title,
        afterTitle: responseAfter.data.title,
      };
    } catch (err) {
      console.error("Error fetching title service:", err);
      return {
        beforeTitle: beforeId,
        afterTitle: afterId,
      };
    }
  };

  const handleShowModal = (modification) => {
    const { before, after } = modification;

    if (!showModal) {
      setSelectedDetails({ before, after });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <>
      {showModal && selectedDetails && (
        <EmployeeModification
          beforeDetails={selectedDetails.before}
          afterDetails={selectedDetails.after}
          onClose={handleCloseModal}
        />
      )}

      <div className="container my-5 p-3 bg-white shadow" lang="fr">
        <p className="h3 p-3">
          <strong>Historique des Modifications</strong>
          <hr className="hr" />
          <small className="text-muted h5">Dernières 4 modifications</small>
        </p>
        <div className="list-group">
          {filteredData.map((data) => (
            <a
              className="list-group-item list-group-item-action flex-column align-items-start"
              key={data.id}
              onClick={() =>
                handleShowModal({ before: data.oldValue, after: data.newValue })
              }
            >
              <div className="d-flex w-100 justify-content-between">
                 <h5 className="mb-1">{data.modificationType}</h5> 
                <small>{formatDateTime(data.changeDate)}</small>
              </div>
              <p className="mb-1">
                L'employé <strong>{data.employeeName}</strong> a modifié de{" "}
                <strong>
                  {typeof serviceTitles[data.id]?.beforeTitle === "object"
                    ? data.valueBeforeModification
                    : serviceTitles[data.id]?.beforeTitle ||
                      data.valueBeforeModification}
                </strong>{" "}
                à{" "}
                <strong>
                  {typeof serviceTitles[data.id]?.afterTitle === "object"
                    ? data.valueAfterModification
                    : serviceTitles[data.id]?.afterTitle ||
                      data.valueAfterModification}
                </strong>
              </p>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmployeeUpdateLog;
