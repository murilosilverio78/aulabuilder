import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import LogoutButton from "./logout-button";
import AnalisarTexto from "./analisar-texto";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <>
      <header className="topo-conta">
        <span>Conectada como <strong>{user.email}</strong></span>
        <LogoutButton />
      </header>
      <AnalisarTexto />
    </>
  );
}
