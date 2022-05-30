
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL; // "http://localhost:5000/api/Documento?idFile="; // 

export default async (req: NextApiRequest, res: NextApiResponse) => {

try {

  const resp = await fetch(`${docs_URL}${req.query.idFile}`);

  if (resp.status==200) {

    const dados = await resp.blob();
  
    const buffer = await dados.arrayBuffer();
  
    const bytes = new Uint8Array(buffer);
  
    res.setHeader("Content-Length", bytes.byteLength);
    res.setHeader("Content-Type", dados.type);
    res.status(200);
  
    res.end(bytes);

  } else {

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(400);
    res.end(`Documento não encontrado: ${req.query.idFile} (${resp.status})`);

  }


} catch (error) {

  res.status(500).end(error)
  
}

}
