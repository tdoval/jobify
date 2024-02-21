"use client";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";

function SearchForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get("search") as string;
        const jobStatus = formData.get("jobStatus") as string;
        console.log("Values: ", search, " + ", jobStatus);
    };

    return (
        <form
            className="bg-muted mb-16 p-8 grid sm:grid-col-2 md:grid-cols-3 gap-4 rounded-lg"
            onSubmit={handleSubmit}
        >
            <Input type="text" placeholder="Search Jobs" name="search" />
            <Select name="jobStatus">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {["all", ...Object.values(JobStatus)].map((jobStatus) => {
                        return (
                            <SelectItem key={jobStatus} value={jobStatus}>
                                {jobStatus}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            <Button type="submit">Search</Button>
        </form>
    );
}

export default SearchForm;
