'use client';
import { useEffect, useState } from 'react';
import MembroModal from '@/components/MembroModal';

const labelTrabalho = {
    '1': 'Tesoureiro',
    '2': 'Secretário',
    // ...adicione mais
};

const labelFuncao = {
    '1': 'Professor',
    '2': 'Auxiliar',
    // ...adicione mais
};

export default function Membros() {
    const [membros, setMembros] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [ordem, setOrdem] = useState('nome');
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState({ cpf: '', nome: '', trabalho_id: '', funcao_id: '' });

    useEffect(() => {
        fetch('/api/membros')
            .then((res) => res.json())
            .then(setMembros);
    }, []);

    const membrosFiltrados = membros
        .filter((m) => m.nome.toLowerCase().includes(filtro.toLowerCase()))
        .sort((a, b) => a[ordem].localeCompare(b[ordem]));

    const handleDelete = async (id) => {
        const res = await fetch(`/api/membros/${id}`, { method: 'DELETE' });
        
        if (!res.ok) alert(`Erro ao remover membro.`);

        await fetch('/api/membros')
            .then((res) => res.json())
            .then(setMembros);
        
        setForm({ cpf: '', nome: '', trabalho_id: '', funcao_id: '' });
        setEditando(null);
        setShowModal(false);
    };

    const handleEdit = (membro) => {
        setForm(membro);
        setEditando(membro._id);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.cpf.length !== 11) {
            alert('O CPF deve conter exatamente 11 dígitos.');
            return;
        }

        const metodo = editando ? 'PUT' : 'POST';
        const url = editando ? `/api/membros/${editando}` : '/api/membros';

        const res = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (!res.ok) alert(`Erro ao ${editando ? 'editar' : 'cadastrar'} membro.`);

        await fetch('/api/membros')
            .then((res) => res.json())
            .then(setMembros);
        
        setForm({ cpf: '', nome: '', trabalho_id: '', funcao_id: '' });
        setEditando(null);
        setShowModal(false);
    };

    return (
        <main className="flex flex-col h-[calc(100vh-128px)] px-6 py-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nome"
                    className="border p-2 rounded w-1/3"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <button
                    onClick={() => {
                        setForm({ cpf: '', nome: '', trabalho_id: '', funcao_id: '' });
                        setEditando(null);
                        setShowModal(true);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Novo Membro
                </button>
            </div>

            <div className="overflow-auto border rounded shadow h-full">
                <table className="min-w-full text-sm">
                    <thead className="sticky top-0 bg-gray-200 z-10">
                        <tr>
                            {['CPF', 'Nome', 'Trabalho', 'Função'].map((col, i) => (
                                <th
                                    key={col}
                                    onClick={() => setOrdem(['cpf', 'nome', 'trabalho_id', 'funcao_id'][i])}
                                    className="text-left px-4 py-2 cursor-pointer hover:underline capitalize"
                                >
                                    {col}
                                </th>
                            ))}
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membrosFiltrados.map((membro) => (
                            <tr key={membro._id} className="border-t">
                                <td className="px-4 py-2">{membro.cpf}</td>
                                <td className="px-4 py-2">{membro.nome}</td>
                                <td className="px-4 py-2">{labelTrabalho[membro.trabalho_id]}</td>
                                <td className="px-4 py-2">{labelFuncao[membro.funcao_id]}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(membro)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(membro._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <MembroModal
                    form={form}
                    setForm={setForm}
                    onSubmit={handleSubmit}
                    onClose={() => { setShowModal(false); setEditando(null); }}
                    editando={editando}
                />
            )}
        </main>
    );
}
