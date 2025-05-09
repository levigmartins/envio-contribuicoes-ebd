export default function MembroModal({ form, setForm, onClose, onSubmit, editando, labelTrabalho, labelFuncao }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-6 w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {editando ? 'Editar Membro' : 'Novo Membro'}
                </h2>
                <form onSubmit={onSubmit} className="space-y-3">
                    <div>
                        <label className="block font-medium">CPF</label>
                        <input
                            type="text"
                            required
                            maxLength={11}
                            value={form.cpf}
                            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Nome</label>
                        <input
                            type="text"
                            required
                            value={form.nome}
                            onChange={(e) => setForm({ ...form, nome: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Trabalho</label>
                        <select
                            required
                            value={form.trabalho_id}
                            onChange={(e) => setForm({ ...form, trabalho_id: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Selecione...</option>
                            {Object.entries(labelTrabalho).map(([value, label]) => (
                                <option key={value} value={value}>
                                {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Função</label>
                        <select
                            required
                            value={form.funcao_id}
                            onChange={(e) => setForm({ ...form, funcao_id: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Selecione...</option>
                            {Object.entries(labelFuncao).map(([value, label]) => (
                                <option key={value} value={value}>
                                {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}