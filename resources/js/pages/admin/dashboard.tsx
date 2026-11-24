import { Head, Link } from '@inertiajs/react';
import { ArrowRight, FileText, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { AdminStats, RecentApplication } from '@/types';

type Props = {
    stats: AdminStats;
    recentApplications: RecentApplication[];
};

export default function AdminDashboard({ stats, recentApplications }: Props) {
    const cards = [
        {
            title: 'Applications',
            value: stats.applications,
            description: 'Job applications received',
            icon: FileText,
            href: '/admin/applications',
        },
        {
            title: 'Locations',
            value: stats.locations,
            description: 'Pins shown on the map',
            icon: MapPin,
            href: '/admin/locations',
        },
        {
            title: 'Users',
            value: stats.users,
            description: 'Registered accounts',
            icon: Users,
            href: '/admin/users',
        },
        {
            title: 'Admins',
            value: stats.admins,
            description: 'Accounts with admin access',
            icon: ShieldCheck,
            href: '/admin/users',
        },
    ];

    return (
        <>
            <Head title="Admin overview" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Admin overview
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage applications, map locations and user access from
                        one place.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {cards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-start justify-between gap-4">
                                <div>
                                    <CardDescription>
                                        {card.title}
                                    </CardDescription>
                                    <CardTitle className="mt-2 text-3xl">
                                        {card.value}
                                    </CardTitle>
                                </div>
                                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                    <card.icon className="size-5" aria-hidden />
                                </span>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {card.description}
                                </p>
                                <Button
                                    asChild
                                    variant="link"
                                    className="mt-2 h-auto px-0"
                                >
                                    <Link href={card.href}>
                                        Manage
                                        <ArrowRight
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <CardTitle>Recent applications</CardTitle>
                            <CardDescription>
                                The latest candidates who applied through the
                                careers page.
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/applications">
                                View all
                                <ArrowRight className="size-4" aria-hidden />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {recentApplications.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No applications yet.
                            </p>
                        ) : (
                            <div className="divide-y">
                                {recentApplications.map((application) => (
                                    <Link
                                        key={application.id}
                                        href={`/admin/applications/${application.id}`}
                                        className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-primary"
                                    >
                                        <div className="min-w-0">
                                            <p className="font-medium">
                                                {application.name}
                                            </p>
                                            <p className="truncate text-muted-foreground">
                                                {application.email}
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-muted-foreground">
                                            {application.created_at}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin overview',
            href: '/admin',
        },
    ],
};
