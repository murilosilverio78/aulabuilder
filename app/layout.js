import "./globals.css";

// Altere aqui o título e a descrição da aba do navegador.
export const metadata = {
  title: "Detetive da Vó",
  description: "Ferramenta protegida com login por e-mail e senha.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
