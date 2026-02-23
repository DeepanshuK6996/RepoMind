"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm} from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type FormInputs = {        
    repoURL: string,
    projectName: string,
    githubToken?: string,
}

const CreatePage = () => {

    const{register, handleSubmit, reset} = useForm<FormInputs>();

    const createProject = api.project.createProject.useMutation();

    const refetch = useRefetch();
    const router = useRouter();

    function onSubmit(data : FormInputs){
        //window.alert(JSON.stringify(data, null, 2));
        //window.alert(data);
        createProject.mutate({
            name: data.projectName,
            githubUrl: data.repoURL,
            githubToken: data.githubToken,
        }, {
            onSuccess :() => {
                toast.success("Project added successfully!");
                refetch();
                reset();
                router.push('/dashboard');
            },
            onError: (error) => {
                toast.error(`Error adding project: ${error.message}`);
            }
        }); 
        return true;
    };

  return (
    <div className="-mt-25 flex h-full items-center justify-center gap-12">
      <Image src={"/support.png"} alt="support" width={250} height={250} />
      <div>
        <div>
          <h1 className="text-2xl font-semibold">
            Link your GITHUB Repository
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter the URL of your repository to link it to RepoMind
          </p>
        </div>
        {/* Loading state banner */}
        {createProject.isPending && (
          <div className="my-4 flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <Loader2 className="size-4 shrink-0 animate-spin" />
            <span>
              Fetching and summarising commits with AI — this may take up to a
              minute. Please don't close this tab...
            </span>
          </div>
        )}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("projectName", { required: true })}
              placeholder="Project Name"
              disabled={createProject.isPending}
            />
            <Input
              {...register("repoURL", { required: true })}
              placeholder="Repository URL"
              type="url"
              className="mt-2"
              disabled={createProject.isPending}
            />
            <Input
              {...register("githubToken")}
              placeholder="Github Token [Optional]"
              className="mt-2 mb-4"
              disabled={createProject.isPending}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={createProject.isPending}
            >
              {createProject.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Summarising commits...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage
