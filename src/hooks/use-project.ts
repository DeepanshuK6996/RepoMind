import { api } from '@/trpc/react'
import React from 'react'
import {useLocalStorage} from 'usehooks-ts'

const useProject = () => {

    const {data: projects} = api.project.getProjects.useQuery();

    const [projectId, setProjectId] = useLocalStorage('RepoMind-projectID', ' ');
    const project = projects?.find((proj) => proj.id === projectId);
    
    return{
        projects,
        project,
        projectId,
        setProjectId
    }
}

export default useProject
