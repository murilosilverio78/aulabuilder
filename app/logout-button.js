"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function LogoutButton() {
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function sair() {
    setErro("");
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErro("Não foi possível sair da conta. Tente novamente.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="acoes-conta">
      <button className="botao-sair" type="button" onClick={sair}>Sair</button>
      {erro && <span className="erro-sair" role="alert">{erro}</span>}
    </div>
  );
}
