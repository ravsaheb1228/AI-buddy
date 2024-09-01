"use client";


import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MusicIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";



export default function MusicPage() {
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });


    const isLoading = form.formState.isSubmitting;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post("/api/music",values);
            setMusic(response.data.audio);

            form.reset();
        }catch (error:any) {
            console.log(error);
        }finally{
            router.refresh();
        }
    };
   
    return(
        <div>
            <Heading
            title={"Music generator"}
            description={"Our most advanced conversation model."}
            icon={MusicIcon}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2" >
                        <FormField name="prompt" render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="send Message" {...field}/>


                                </FormControl>
                            </FormItem>
                        )} />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-8">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {!music && !isLoading && 
                    (<Empty label="No image generated" />
                )}
                {music && (
                    <audio controls className="w-full mt-8">
                        <source src={music}/>
                    </audio>
                )}
            </div>
        </div>
    );
};
