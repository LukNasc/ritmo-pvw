'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserProfile } from "@/context/UserProfileContext";
import { profileOptions } from "@/types/profiles";
import { EditIcon, ImportIcon, LayerArrowUp } from "lucide-react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { username, profile, logout } = useUserProfile();

    const handleLogout = () => {
        logout();
        redirect('/onboarding/register')
    }

    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-1'>
                <p className='text-sm text-muted-foreground'>
                    Configurações
                </p>
                <h1 className="text-xl font-bold">Seu Perfil</h1>
            </div>
            <Card>
                <CardContent className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel>Nome</FieldLabel>
                        <Input placeholder="Seu nome" defaultValue={username!} className="h-12.5" />
                    </Field>
                    <Button size={"lg"} className={"w-full"}>Salvar alterações</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-sm">Perfil</p>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="uppercase font-bold">{profileOptions.find(p => p.key === profile)?.label}</p>
                        <Button size="icon-lg" variant={"outline"}>
                            <EditIcon />
                        </Button>
                    </div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-sm">Backup (JSON)</p>
                    <span className="text-xs text-muted-foreground">
                        Guarde seu histórico ou leve para outro aparelho
                    </span>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button size={"lg"} className={"w-full"} variant={"outline"}>
                        <LayerArrowUp />
                        Exportar dados (JSON)
                    </Button>
                    <Button size={"lg"} className={"w-full"} variant={"outline"}>
                        <ImportIcon />
                        Importar dados (JSON)
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <p className="text-sm">Dados salvo neste dispositivo</p>
                    <span className="text-xs text-muted-foreground">
                        0 registro(s) · 0 meta(s) · 2 dia(s) de uso
                    </span>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger render={<Button size={"lg"} variant={"destructive"} className={"w-full"} />}>
                            Apagar todos os dados
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Isso vai apagar seu perfil, metas e histórico deste dispositivo. Não é possível desfazer. Continuar?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout} variant={"destructive"}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}