import {z} from "zod";
import { createTRPCRouter, protectedProcedure,} from "../trpc";
import { pullCommits } from "@/lib/github";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string().url(),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Creating project for user -input:", input);
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          userToProjects: {
            create: {
              userId: ctx.user.userId!,
            },
          },
        },
      });
      await pullCommits(project.id);
      return project;
    }),
    getProjects: protectedProcedure
        .query(async({ctx}) => {
            return await ctx.db.project.findMany({
                where: {
                    userToProjects: {
                        some: {
                            userId: ctx.user.userId!
                        }
                    },
                    deletedAt: null,
                }
            })
    }),
    getCommits: protectedProcedure
      .input(
        z.object({ 
          projectId: z.string(),
        })
      )
      .query(async({ctx, input}) => {
        await pullCommits(input.projectId).then().catch(console.error);
        return await ctx.db.commit.findMany({
          where: {
            projectId: input.projectId,
          },
        });
      })
});   