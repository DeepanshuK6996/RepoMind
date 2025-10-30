import {z} from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    createProject:  protectedProcedure
                        .input(z.object({
                            name: z.string(),
                            githubUrl: z.string().url(),
                            githubToken: z.string().optional(),
                        }))
                        .mutation(async ({ctx, input}) => {
                            console.log("Creating project for user -input:", input);
                            const project = await ctx.db.project.create({
                                data: {
                                    name: input.name,
                                    githubUrl: input.githubUrl, 
                                    userToProjects: {
                                        create: {
                                            userId: ctx.user.userId!,
                                        }
                                    }
                                }
                            })
                            return project;
                        })
})  