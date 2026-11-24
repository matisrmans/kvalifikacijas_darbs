import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, FileText, Mail, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { JobApplicationDetail } from '@/types';

type Props = {
    application: JobApplicationDetail;
};

export default function ApplicationShow({ application }: Props) {
    const remove = () => {
        if (
            !window.confirm(
                `Delete the application from ${application.name}? This cannot be undone.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/applications/${application.id}`);
    };

    return (
        <>
            <Head title={`Application – ${application.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <Button asChild variant="ghost" size="sm" className="-ml-2">
                        <Link href="/admin/applications">
                            <ArrowLeft className="size-4" aria-hidden />
                            Back to applications
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                    <aside className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 p-5">
                        <div>
                            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                Candidate
                            </p>
                            <p className="mt-1 text-lg font-semibold">
                                {application.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="size-4 shrink-0" aria-hidden />
                            {application.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="size-4 shrink-0" aria-hidden />
                            {application.cv_original_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Submitted {application.created_at}
                        </div>

                        <Button asChild className="mt-2">
                            <a href={application.download_url}>
                                <Download className="size-4" aria-hidden />
                                Download CV
                            </a>
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={remove}
                        >
                            <Trash2 className="size-4" aria-hidden />
                            Delete application
                        </Button>
                    </aside>

                    <section className="rounded-xl border border-sidebar-border/70 p-6">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Motivational letter
                        </h2>
                        <p className="mt-4 leading-relaxed whitespace-pre-line text-muted-foreground">
                            {application.motivation}
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}

ApplicationShow.layout = {
    breadcrumbs: [
        {
            title: 'Job applications',
            href: '/admin/applications',
        },
    ],
};
