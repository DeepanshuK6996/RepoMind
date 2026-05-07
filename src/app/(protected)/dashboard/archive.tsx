"use client"
import { Button } from '@/components/ui/button'
import useProject from '@/hooks/use-project'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import React from 'react'
import { toast } from 'sonner'

const Archive = () => {
    const{projectId} = useProject();
    const archivedProjects = api.project.archiveProject.useMutation()
    const refetch = useRefetch();
  return (
    <Button variant={'destructive'}
      size='sm'
      className='cursor-pointer'
      disabled={archivedProjects.isPending}
      onClick={() => {
        const confirm = window.confirm(
          "Are you sure you want to archive this project? This action cannot be undone.",
        );
        if (confirm) {
          archivedProjects.mutate(
            { projectId },
            {
              onSuccess: () => {
                toast.success("Project archived successfully");
                refetch();
              },
              onError: () => {
                toast.error("Failed to archive project");
              },
            },
          );
        }
      }}
    >
      Archive Project
    </Button>
  );
}

export default Archive
