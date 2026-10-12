import "./globals.css";

// Altere aqui o título e a descrição da aba do navegador.
export const metadata = {
  title: "Analisador de Texto",
  description: "Uma página simples para analisar textos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
