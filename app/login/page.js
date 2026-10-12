"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function entrar(event) {
    event.preventDefault();
    setErro("");
    setMensagem("");
    setCarregando(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro(traduzirErro(error.message));
      return;
    }

    const destino = searchParams.get("redirectedFrom");
    router.replace(destino && destino.startsWith("/") ? destino : "/");
    router.refresh();
  }

  async function criarConta() {
    setErro("");
    setMensagem("");

    if (!email.trim() || !senha) {
      setErro("Informe seu e-mail e uma senha para criar a conta.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setCarregando(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
    });
    setCarregando(false);

    if (error) {
      setErro(traduzirErro(error.message));
      return;
    }

    if (data.session) {
      router.replace("/");
      router.refresh();
      return;
    }

    setMensagem("Conta criada! Confira seu e-mail para confirmar o cadastro antes de entrar.");
  }

  function traduzirErro(mensagemOriginal) {
    const mensagem = mensagemOriginal.toLowerCase();
    if (mensagem.includes("invalid login credentials")) {
      return "E-mail ou senha incorretos.";
    }
    if (mensagem.includes("email not confirmed")) {
      return "Confirme seu e-mail antes de entrar.";
    }
    if (mensagem.includes("user already registered")) {
      return "Este e-mail já possui uma conta. Tente entrar.";
    }
    if (mensagem.includes("password should be at least")) {
      return "A senha precisa ter pelo menos 6 caracteres.";
    }
    if (mensagem.includes("invalid email")) {
      return "Digite um endereço de e-mail válido.";
    }
    if (mensagem.includes("rate limit")) {
      return "Muitas tentativas. Aguarde um pouco e tente novamente.";
    }
    return "Não foi possível concluir a solicitação. Confira os dados e tente novamente.";
  }

  return (
    <main className="pagina pagina-login">
      <section className="painel painel-login">
        <p className="etiqueta">ÁREA SEGURA</p>
        <h1>Detetive da Vó</h1>
        <p className="subtitulo">Entre na sua conta para continuar.</p>

        <form onSubmit={entrar} className="form-login">
          <label className="rotulo" htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@exemplo.com"
            required
          />

          <label className="rotulo" htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            autoComplete="current-password"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            placeholder="Sua senha"
            required
            minLength={6}
          />

          {erro && <p className="mensagem mensagem-erro" role="alert">{erro}</p>}
          {mensagem && <p className="mensagem mensagem-sucesso" role="status">{mensagem}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? "Aguarde..." : "Entrar"}
          </button>
          <button className="botao-secundario" type="button" onClick={criarConta} disabled={carregando}>
            Criar conta
          </button>
        </form>
      </section>
    </main>
  );
}
