import mongoose from "mongoose";

const MembroSchema = new mongoose.Schema({
        cpf: { type: String, required: true },
        nome: { type: String, required: true },
        funcao_id: { type: String, required: true },
        trabalho_id: { type: String, required: true },
        user_id: { type: String, required: true }
    }, {
        timestamps: true
    }
);

export default mongoose.models.Membro || mongoose.model('Membro', MembroSchema);