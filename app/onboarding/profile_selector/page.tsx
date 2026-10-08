'use client'

import { useState } from "react";
import { redirect } from "next/navigation";

import { Profile, PROFILE, profileOptions } from "@/types/profiles";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useUserProfile } from "@/context/UserProfileContext";



export default function Home() {
  const { setProfile: setUserProfile } = useUserProfile();
  const [profile, setProfile] = useState<Profile>();

  const handleProfileChange = (value: Profile) => {
    setProfile(value);
  }

  const redirectToDashboard = () => {
    if (!profile) {
      return;
    }
    setUserProfile(profile)
    redirect("/panel/dashboard");
  }


  return (
    <>
      <h1 className="text-2xl font-bold">
        Como você trabalha hoje?
      </h1>
      <RadioGroup onValueChange={handleProfileChange}>
        {
          profileOptions.map((profile) => (
            <FieldLabel htmlFor={profile.key} key={profile.key} >
              <Field orientation={"horizontal"}>
                <FieldContent>
                  <FieldTitle>{profile.label}</FieldTitle>
                  <FieldDescription>{profile.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={profile.key} id={profile.key} />
              </Field>
            </FieldLabel>
          ))
        }
      </RadioGroup>

      <Button size="lg" disabled={!profile} onClick={redirectToDashboard}>
        Continuar
      </Button>

      <Link href={"/onboarding/register"} className="flex gap-2 items-center justify-center w-full">
        <ChevronLeft />
        Voltar
      </Link>

    </>
  );
}
