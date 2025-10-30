"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { useForm} from 'react-hook-form'

type FormInputs = {        
    repoURL: string,
    projectName: string,
    githubToken?: string,
}

const CreatePage = () => {

    const{register, handleSubmit, reset} = useForm<FormInputs>();

    function onSubmit(data : FormInputs){
        window.alert(JSON.stringify(data, null, 2));
        //window.alert(data);
        reset();
        return true;
        
    };

  return (
    <div className='flex items-center justify-center gap-12 h-full -mt-25'>
        <Image src={'/support.png'} 
            alt='support'
            width={250}
            height={250}
        />
        <div>
            <div>
                <h1 className='font-semibold text-2xl'>
                    Link your GITHUB Repository
                </h1>
                <p className="text-sm text-muted-foreground ">
                    Enter the URL of your repository to link it to RepoMind
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('projectName', { required: true })} placeholder='Project Name'/>
                    <Input {...register('repoURL', { required: true })} placeholder='Repository URL' type='url' className='mt-2'/>
                    <Input {...register('githubToken')} placeholder='Github Token [Optional]' className='mt-2 mb-4'/>

                    <Button type='submit' className='cursor-pointer'>
                        Create Project
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePage
