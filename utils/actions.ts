"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

export const authenticateAndRedirect = (): string => {
    const { userId } = auth();
    if (!userId) redirect("/");
    return userId;
};

export const createJobAction = async (
    values: CreateAndEditJobType
): Promise<JobType | null> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 3000));

    const userId = authenticateAndRedirect();

    try {
        createAndEditJobSchema.parse(values);
        const job: JobType = await prisma.job.create({
            data: {
                ...values,
                clerkId: userId,
            },
        });
        return job;
    } catch (error) {
        console.error(error);
        return null;
    }
};

type GetAllJobsActionTypes = {
    search?: string;
    jobStatus?: string;
    page?: number;
    limit?: number;
};

export const getAllJobsAction = async ({
    search,
    jobStatus,
    page = 1,
    limit = 10,
}: GetAllJobsActionTypes): Promise<{
    jobs: JobType[];
    count: number;
    page: number;
    totalPages: number;
}> => {
    const userId = authenticateAndRedirect();

    try {
        let whereClause: Prisma.JobWhereInput = {
            clerkId: userId,
        };
        if (search) {
            whereClause = {
                ...whereClause,
                OR: [
                    {
                        position: {
                            contains: search,
                        },
                    },
                    {
                        company: {
                            contains: search,
                        },
                    },
                ],
            };
        }
        if (jobStatus && jobStatus !== "all") {
            whereClause = {
                ...whereClause,
                status: jobStatus,
            };
        }

        const jobs: JobType[] = await prisma.job.findMany({
            where: whereClause,
            orderBy: {
                createdAt: "desc",
            },
        });

        return { jobs, count: 0, page: 1, totalPages: 0 };
    } catch (error) {
        console.error(error);
        return { jobs: [], count: 0, page: 1, totalPages: 0 };
    }
};

export async function deleteJobAction(id: string): Promise<JobType | null> {
    const userId = authenticateAndRedirect();

    try {
        const job: JobType = await prisma.job.delete({
            where: {
                id,
                clerkId: userId,
            },
        });
        return job;
    } catch (error) {
        return null;
    }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
    let job: JobType | null = null;
    const userId = authenticateAndRedirect();

    try {
        job = await prisma.job.findUnique({
            where: {
                id,
                clerkId: userId,
            },
        });
    } catch (error) {
        job = null;
    }
    if (!job) {
        redirect("/jobs");
    }
    return job;
}
