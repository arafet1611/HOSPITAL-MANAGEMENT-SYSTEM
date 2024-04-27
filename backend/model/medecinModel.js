import  mongoose from "mongoose" ;
const medecinSchema = new mongoose.Schema({
    employee : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        
    }, 
    Type : {
     type : String,
     
    },
    categorie : {
        type : String,
        
    },
    responsabilite : {
        type :String,
       
    }

});
export const Medecin = mongoose.model("Medecin",medecinSchema);