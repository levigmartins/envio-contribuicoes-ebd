import { connectToDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(request) {
    await connectToDatabase();
    const answersSent = [];
    const answersError = [];

    const { members, answer } = await request.json();

    /* TODO: 1 -- BUSCAR O ID DA EBD ATUAL */

    const ebdId = searchEBDId();

    members.forEach(async (member) => {
        try {
            const memberData = await fetch(
                `https://intregracao-site.presbiterio.org.br/api-ebd/consultacpf/${member.cpf}`
            );

            if (memberData.status !== 200) throw new Error("Error returning member CPF.");

            const payload = mountAnswerPayload(member, memberData, answer, ebdId);

            const responseAnswer = await fetch(
                'https://intregracao-site.presbiterio.org.br/api-ebd/cadastro-contribuicao',
                {
                    /* TODO: 2 -- ENVIAR HEADERS E PAYLOAD PARA REQUISIÇÃO */
                }
            );

            if (responseAnswer.status !== 200 ) throw new Error("Error sending answer.");

            answersSent.push({
                cpf: member.cpf,
                name: memberData.name
            })

        } catch(err) {
            answersError.push({
                cpf: member.cpf,
                name: member.name
            })
        }
    });

    return Response.json({ answersSent, answersError }, { status: 200 });

}

async function searchEBDId() {

}

async function mountAnswerPayload(member, memberData, answer, ebdId) {
    const { cpf, trabalho_id, funcao_id } = member;
    const { nome, cidade, uf, email, celular } = memberData;
    return {
        "nome": nome,
        "cpf": cpf,
        "denominacao_id": 21,
        "denominacao_outras": "",
        "celular": celular,
        "email": email,
        "cidade": cidade,
        "uf": uf,
        "funcao": "",
        "funcao_id": funcao_id,
        "trabalho_id": trabalho_id,
        "ebd_id": ebdId,
        "categoria_id": "2",
        "contribuicao": answer,
        "aceite_termo": true
    } 
}