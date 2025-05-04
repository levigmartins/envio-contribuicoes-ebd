'use client';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Enviar() {
  const [membros, setMembros] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('/api/membros')
      .then((res) => res.json())
      .then(setMembros);
  }, []);

  const membrosFiltrados = membros.filter((m) =>
    m.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const toggleSelecionado = (id) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleTodos = () => {
    if (selecionados.length === membrosFiltrados.length) {
      setSelecionados([]);
    } else {
      setSelecionados(membrosFiltrados.map((m) => m._id));
    }
  };

  const handleEnviar = async () => {
    if (!mensagem || selecionados.length === 0) {
      alert('Selecione membros e preencha a mensagem.');
      return;
    }

    // Placeholder de envio
    console.log({ mensagem, membros: selecionados });
    alert('Enviado!');
  };

  return (
    <main className="flex flex-col px-6 py-4 gap-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
        <button
          onClick={toggleTodos}
          className="text-sm text-blue-600 underline"
        >
          {selecionados.length === membrosFiltrados.length
            ? 'Desmarcar todos'
            : 'Selecionar todos'}
        </button>
      </div>

      <div className="overflow-auto border rounded shadow max-h-[300px]">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="px-4 py-2">Selecionar</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Trabalho</th>
              <th className="px-4 py-2">Função</th>
            </tr>
          </thead>
          <tbody>
            {membrosFiltrados.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selecionados.includes(m._id)}
                    onChange={() => toggleSelecionado(m._id)}
                  />
                </td>
                <td className="px-4 py-2">{m.cpf}</td>
                <td className="px-4 py-2">{m.nome}</td>
                <td className="px-4 py-2">{m.trabalho_id}</td>
                <td className="px-4 py-2">{m.funcao_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border rounded shadow p-4">
        <h2 className="font-semibold mb-2">Mensagem</h2>
        <ReactQuill value={mensagem} onChange={setMensagem} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleEnviar}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Enviar
        </button>
      </div>
    </main>
  );
}
