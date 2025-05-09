import puppeteer from 'puppeteer';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
    await connectToDatabase();
    const answersSent = [];
    const answersError = [];

    const { members, answer } = await request.json();

    const ebdId = await searchEBDId();

    if (!ebdId) Response.json({ message: "Erro ao buscar ID da EBD da semana!" }, { status: 404 });

    members.forEach(async (member) => {
        try {
            let memberData = await fetch(
                `https://intregracao-site.presbiterio.org.br/api-ebd/consultacpf/${member.cpf}`,
                {
                    method: 'GET',
                    headers: {
                        'Host': 'intregracao-site.presbiterio.org.br',
                        'Cache-Control': 'no-cache',
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0',
                    }

                }
            );

            if (memberData.status !== 200) throw new Error("Error returning member CPF.");

            memberData = await memberData.json();

            const payload = mountAnswerPayload(member, memberData, answer, ebdId);

            const responseAnswer = await fetch(
                'https://intregracao-site.presbiterio.org.br/api-ebd/cadastro-contribuicao',
                {
                    method: 'POST',
                    headers: {
                        'Host': 'intregracao-site.presbiterio.org.br',
                        'Cache-Control': 'no-cache',
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0', // às vezes necessário para evitar bloqueio
                    },
                    body: payload

                }
            );

            if (responseAnswer.status !== 200) throw new Error("Error sending answer.");

            answersSent.push({
                cpf: member.cpf,
                name: memberData.name
            })

        } catch (err) {
            answersError.push({
                cpf: member.cpf,
                name: member.name
            })
        }
    });

    return Response.json({ answersSent, answersError }, { status: 200 });

}

async function searchEBDId() {
    const browser = await puppeteer.launch({
        headless: 'new', // ou false para debug com navegador visível
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // útil em alguns ambientes
    });

    const page = await browser.newPage();

    try {
        await page.goto('https://www.igrejacristamaranata.org.br/ebd/participacoes/', {
            waitUntil: 'networkidle2' // aguarda carregamento "estável"
        });

        await page.waitForSelector('input[name="icm_member_ebd"]');

        const sessionId = await page.$eval('input[name="icm_member_ebd"]', el => el.value);

        return sessionId;
    } catch (err) {
        console.error('Erro no Puppeteer:', err);
        return null;
    } finally {
        await browser.close();
    }
}

async function mountAnswerPayload(member, memberData, answer, ebdId) {
    const { cpf, trabalho_id, funcao_id } = member;
    const { nome, cidade, uf, email, celular } = memberData;
    const payload = {
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
    };

    return JSON.stringify(payload);
}