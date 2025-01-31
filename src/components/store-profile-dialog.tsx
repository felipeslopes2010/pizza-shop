import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import * as z from 'zod';
import {zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
    const { data: managedRestaurant } = useQuery({
        queryKey: ['/managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,
    });

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name?? '',
            description: managedRestaurant?.description?? '',
        },
    });

    const { mutateAsync: updateProfileFn  } = useMutation({
        mutationFn: updateProfile,
    });

    async function handleUpdateProfile(data: StoreProfileSchema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            });

            toast.success("Perfil atualizado com sucesso!");
        } catch {
            toast.error("Falha ao atualizar o perfil, tente novamente!");
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input id="name" className="col-span-3" {...register("name")} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">
                            Descrição
                        </Label>
                        <Textarea id="description" className="col-span-3 h-24" {...register("description")}/>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="submit" variant="sucess" disabled={isSubmitting}>
                        Salvar
                    </Button>
                </DialogFooter>
            </form>

        </DialogContent>
    )
}