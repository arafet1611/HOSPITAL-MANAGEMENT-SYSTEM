import axios from 'axios';
import { toast } from 'react-hot-toast';

const StatusDropdown = ({ request, onChange }) => {
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      if (newStatus === "Appliqué") {
        await axios.post(`http://localhost:5000/api/demandeLeave/mark-as-applied/${request._id}`);
        toast.success("Statut mis à jour avec succès");
      }
      onChange(request._id, newStatus === "Appliqué");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut:", error.message);
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };

  return (
    <select
      value={request.isApplied ? "Appliqué" : "En attente"}
      onChange={handleStatusChange}
      disabled={request.isApplied}
    >
      <option value="En attente">En attente</option>
      <option value="Appliqué">Appliqué</option>
    </select>
  );
};

export default StatusDropdown;