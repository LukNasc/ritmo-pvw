'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserProfile } from "@/context/UserProfileContext";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsernameInput] = useState("");
    const { setUsername } = useUserProfile();


    const handleSaveUsername = () => {
        const trimmedUsername = username.trim();

        if (trimmedUsername) {
            setUsername(trimmedUsername);
            redirect("/onboarding/profile_selector");
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold">
                Vamos acompanhar seu ritmo de trabalho.
            </h1>
            <span className="text-sm text-muted-foreground">
                Registre seus ganhos do dia a dia e veja em tempo real como o mês está andando.
            </span>
            <Field>
                <FieldLabel htmlFor="name">Como podemos te chamar?</FieldLabel>
                <Input
                    placeholder="Seu nome"
                    type="text"
                    id="name"
                    className="h-12.5"
                    value={username}
                    onChange={(event) => setUsernameInput(event.target.value)}
                />
            </Field>
            <Button size="lg" onClick={handleSaveUsername} disabled={!username.trim()}>
                Continuar
            </Button>
        </>
    )
}