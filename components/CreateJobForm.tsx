'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    JobStatus,
    JobMode,
    createAndEditJobSchema,
    CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from './FormComponents';

import React from 'react'

function CreateJobForm() {
    const form = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        },
    });

    const onSubmit = (values: CreateAndEditJobType) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='bg-muted p-8 rounded'>
                <h2 className='capitalize font-semibold text-4xl mb-6'>
                    Add Job
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {/* Position */}
                    <CustomFormField name='position' control={form.control} />
                    {/* company */}
                    <CustomFormField name='company' control={form.control} />
                    {/* location */}
                    <CustomFormField name='location' control={form.control} />
                    {/* job status */}
                    <CustomFormSelect
                        name='status'
                        control={form.control}
                        labelText='job status'
                        items={Object.values(JobStatus)}
                    />

                    {/* job mode */}
                    <CustomFormSelect
                        name='mode'
                        control={form.control}
                        labelText='job mode'
                        items={Object.values(JobStatus)}
                    />

                    <Button type='submit' className='self-end capitalize'>
                        Create Job
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CreateJobForm