"use client";

import { useState } from "react";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [resposta, setResposta] = useState("");

  function analisarTexto(event) {
    event.preventDefault();
    setResposta(texto);
  }

  return (
    <main className="pagina">
      <section className="painel">
        {/* Edite os textos principais nesta área. */}
        <h1>Detetive da Vó</h1>
        <p className="subtitulo">
          Digite ou cole seu texto abaixo e clique em analisar.
        </p>

        <form onSubmit={analisarTexto}>
          <label className="rotulo" htmlFor="texto">
            Seu texto
          </label>
          <textarea
            id="texto"
            value={texto}
            onChange={(event) => setTexto(event.target.value)}
            placeholder="Escreva ou cole seu texto aqui..."
            rows={7}
          />
          <button type="submit">Analisar</button>
        </form>

        <section className="area-resposta" aria-live="polite">
          <h2>Resposta</h2>
          {resposta ? (
            <p className="texto-resposta">{resposta}</p>
          ) : (
            <p className="vazio">A resposta aparecerá aqui.</p>
          )}
        </section>
      </section>
    </main>
  );
}
