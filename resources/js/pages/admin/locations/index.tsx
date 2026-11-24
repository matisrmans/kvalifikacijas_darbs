import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AdminLocation } from '@/types';

type Props = {
    locations: AdminLocation[];
};

export default function LocationsIndex({ locations }: Props) {
    const { flash } = usePage().props;

    const remove = (location: AdminLocation) => {
        if (
            !window.confirm(
                `Delete the ${location.name} location? This cannot be undone.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/locations/${location.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Locations" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Map locations
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage the offices and production sites shown on the
                            homepage map.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/locations/create">
                            <Plus className="size-4" aria-hidden />
                            Add location
                        </Link>
                    </Button>
                </div>

                {flash.success ? (
                    <div className="flex items-center gap-3 rounded-lg border border-emerald-600/20 bg-emerald-50 px-4 py-3 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                        <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                        <p className="text-sm font-medium">{flash.success}</p>
                    </div>
                ) : null}

                <div className="overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-left">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Location
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Country
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Coordinates
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Description
                                    </th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {locations.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-12 text-center text-muted-foreground"
                                        >
                                            No locations yet. Add your first
                                            one.
                                        </td>
                                    </tr>
                                ) : (
                                    locations.map((location) => (
                                        <tr
                                            key={location.id}
                                            className="border-t border-sidebar-border/70"
                                        >
                                            <td className="px-4 py-3">
                                                <span className="inline-flex items-center gap-2 font-medium">
                                                    <MapPin
                                                        className="size-4 text-muted-foreground"
                                                        aria-hidden
                                                    />
                                                    {location.name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge variant="secondary">
                                                    {location.country}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                                                {location.lat.toFixed(4)},{' '}
                                                {location.lng.toFixed(4)}
                                            </td>
                                            <td className="max-w-md px-4 py-3 text-muted-foreground">
                                                {location.description}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Link
                                                            href={`/admin/locations/${location.id}/edit`}
                                                        >
                                                            <Pencil
                                                                className="size-4"
                                                                aria-hidden
                                                            />
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            remove(location)
                                                        }
                                                    >
                                                        <Trash2
                                                            className="size-4"
                                                            aria-hidden
                                                        />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

LocationsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Locations',
            href: '/admin/locations',
        },
    ],
};
