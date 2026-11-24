import { Head, Link } from '@inertiajs/react';
import { Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { JobApplicationListItem, Paginated } from '@/types';

type Props = {
    applications: Paginated<JobApplicationListItem>;
};

export default function ApplicationsIndex({ applications }: Props) {
    return (
        <>
            <Head title="Job applications" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Job applications
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Review the CVs and motivational letters submitted by
                        candidates.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Candidate
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        CV
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Submitted
                                    </th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {applications.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-12 text-center text-muted-foreground"
                                        >
                                            No applications yet.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.data.map((application) => (
                                        <tr
                                            key={application.id}
                                            className="border-t border-sidebar-border/70"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {application.name}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {application.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-2 text-muted-foreground">
                                                    <FileText
                                                        className="size-4"
                                                        aria-hidden
                                                    />
                                                    {
                                                        application.cv_original_name
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {application.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={`/admin/applications/${application.id}`}
                                                    >
                                                        <Eye
                                                            className="size-4"
                                                            aria-hidden
                                                        />
                                                        View
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {applications.links.length > 3 ? (
                    <div className="flex flex-wrap items-center gap-1">
                        {applications.links.map((link) =>
                            link.url ? (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    className={`rounded-md border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'border-transparent bg-primary text-primary-foreground'
                                            : 'border-sidebar-border/70 hover:bg-accent'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ) : (
                                <span
                                    key={link.label}
                                    className="rounded-md border border-sidebar-border/70 px-3 py-1.5 text-sm opacity-50"
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ),
                        )}
                    </div>
                ) : null}
            </div>
        </>
    );
}

ApplicationsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Job applications',
            href: '/admin/applications',
        },
    ],
};
